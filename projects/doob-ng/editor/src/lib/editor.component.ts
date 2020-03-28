/// <reference path="../../../../../node_modules/monaco-editor/monaco.d.ts" />

import { Component, OnDestroy, ChangeDetectionStrategy, Input, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { MonacoLoaderService } from './services/monaco-loader.service';
import { takeUntil, debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject, BehaviorSubject, combineLatest, of, ReplaySubject } from 'rxjs';
import { DoobEditorFile, DoobEditorOptions } from './models';
import { DoobEditorStateService } from './services/editor-state.service';
import { DoobEditorExtraLibsManager } from './services/editor-extra-libs-service';
import { TypescriptOptions } from './models/typescript-options';
import { GetFileExtension, GetDefaultExtensionForLanguage } from './file-extension-mapper';

@Component({
    selector: 'db-editor, [dbEditor]',
    template: '',
    styleUrls: ['./editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DoobEditorStateService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DoobEditorComponent,
            multi: true
        }
    ]
})
export class DoobEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {


    private _onChangeDisposable: monaco.IDisposable;
    private _editor: monaco.editor.IStandaloneCodeEditor;
    private extraLibs: monaco.IDisposable;

    private _language: string;
    private language$ = new BehaviorSubject<string>(null);
    @Input()
    set language(value: string) {
        if (value) {
            this._language = value.toLowerCase();
            this.language$.next(this._language);
        }
    }
    get language() {
        return this._language;
    }


    private files$: ReplaySubject<DoobEditorFile[]> = new ReplaySubject<DoobEditorFile[]>();
    private oldFiles: Array<DoobEditorFile>;
    @Input()
    set files(value: DoobEditorFile[]) {
        value = value || [];
        this.files$.next(value);
    }

    private typings$: ReplaySubject<DoobEditorFile[]> = new ReplaySubject<DoobEditorFile[]>();
    @Input()
    set typings(value: DoobEditorFile[]) {
        value = value || [];
        this.typings$.next(value);
    }

    private value$: BehaviorSubject<string> = new BehaviorSubject<string>("");
    @Input()
    set value(value: string) {
        this.value$.next(value || '');
    }


    @Input() fileName: string;

    private selectedFile$: ReplaySubject<string> = new ReplaySubject<string>();
    @Input()
    set selectFile(file: string) {
        this.selectedFile$.next(file);
    }

    @Input()
    editorOptions: DoobEditorOptions = null;

    @Input()
    tsOptions: TypescriptOptions;


    @Output() valueChanged = new EventEmitter<string>();
    @Output() activeFile = new EventEmitter<string>();



    private initialized$: Subject<boolean> = new Subject<boolean>();
    private destroy$: Subject<any> = new Subject<any>();

    constructor(private elementRef: ElementRef, private monacoLoader: MonacoLoaderService, private editorState: DoobEditorStateService) {

    }

    ngOnInit() {

        if (!this.fileName) {
            this.fileName = "code"
        }
        this.SubscribeAll();
        this.monacoLoader.isMonacoLoaded$.pipe(
            takeUntil(this.destroy$),
            distinctUntilChanged()
        ).subscribe((loaded) => {
            if (loaded) {
                this._editor = this.CreateMonacoEditor();
                this.initialized$.next(true);
            }
        });
    }

    private SubscribeAll() {


        combineLatest(this.initialized$, this.files$).pipe(
            takeUntil(this.destroy$),
            debounceTime(100)
        ).subscribe(([initialized, files]) => {

            if (!initialized) {
                return;
            }
            this.BuildEditorModels(files);
        });

        combineLatest(this.initialized$, this.value$).pipe(
            takeUntil(this.destroy$),
            debounceTime(100)
        ).subscribe(([initialized, code]) => {
            if (!initialized) {
                return;
            }
            this.SetCode(code);
        });

        combineLatest(this.initialized$, this.typings$).pipe(
            takeUntil(this.destroy$),
            debounceTime(100)
        ).subscribe(([initialized, typings]) => {
            if (!initialized) {
                return;
            }
            this.AddExtraLibs(typings);
        });

        combineLatest(this.initialized$, this.selectedFile$).pipe(
            takeUntil(this.destroy$)
        ).subscribe(([initialized, selectedFile]) => {
            if (!initialized) {
                return;
            }
            this.SelectFile(selectedFile);
        });

        combineLatest(this.initialized$, this.language$).pipe(
            takeUntil(this.destroy$),
            debounceTime(100)
        ).subscribe(([initialized, language]) => {
            if (!initialized) {
                return;
            }
            if (!language) {
                return;
            }

            if (this.codeModel) {
                var langId = monaco.languages.getEncodedLanguageId(language);
                const currLang = (<any>this.codeModel).getLanguageIdentifier().language;

                if (langId === 0) {
                    language = "plaintext";
                }

                if (language !== currLang) {
                    this.UpdateCodeLanguage(language)
                }

            }

        });
    }

    private BuildEditorModels(files: DoobEditorFile[]) {

        if (!files || files.length === 0) {
            monaco.editor.getModels().forEach(model => model.dispose());
            return;
        }

        let models = monaco.editor.getModels();



        files.forEach(model => {

            const uri = monaco.Uri.file(model.Path);
            let codeModel = models.find(m => m.uri.path === uri.path);

            let newModel = false;

            const lang = GetFileExtension(model.Path) ? null : this.language;


            if (!codeModel) {
                codeModel = monaco.editor.createModel(model.Value, lang, uri);

                newModel = true;
            } else {

                let modelChanged = false;

                if (this.oldFiles && this.editorOptions && this.editorOptions.CheckFileChanged) {
                    const oldFile = this.oldFiles.find(f => f.Path === model.Path);
                    modelChanged = this.editorOptions.CheckFileChanged(oldFile, model);
                }

                if (modelChanged) {
                    codeModel.dispose();
                    codeModel = monaco.editor.createModel(model.Value, lang, uri);

                    newModel = true;
                }
            }

            if (newModel) {
                this.editorState.SetLastSavedVersion(codeModel.uri.path, codeModel.getAlternativeVersionId());
                if (Object.keys(model).includes('IsDirty')) {
                    model['IsDirty'] = false;
                }

                codeModel.onDidChangeContent(e => {
                    if (Object.keys(model).includes('IsDirty')) {
                        const lastIsDirty = model['IsDirty'] || false;
                        const currentIsDirty = this.editorState.IsDirty(codeModel.uri.path, codeModel.getAlternativeVersionId());
                        if (lastIsDirty !== currentIsDirty) {
                            model['IsDirty'] = currentIsDirty;
                            this.propagateRefreshFiles();
                        }
                    }
                });
            }


            models = models.filter(m => m !== codeModel);

        });
        this.oldFiles = files;
        if (this.codeModel) {
            models = models.filter(m => m !== this.codeModel);
        }

        models.forEach(m => m.dispose());
        this.propagateRefreshFiles();
    }

    private ExtraLibs = new DoobEditorExtraLibsManager();
    private AddExtraLibs(value: DoobEditorFile[]) {


        if (!value) {
            this.ExtraLibs.DisposeAll();
        }

        value.forEach((val) => {
            this.ExtraLibs.AddExtraLibDisposable(val, () => monaco.languages.typescript.typescriptDefaults.addExtraLib(val.Value, `file:///node_modules/@types/${val.Path}`));
        });


    }

    public SelectFile(path: string) {

        const lastModel = this._editor.getModel();
        if (lastModel && lastModel.uri) {

            this.editorState.SetViewState(lastModel.uri.path, this._editor.saveViewState());
        }

        if (!path) {
            this._editor.setModel(null);
            return;
        }

        const uri = monaco.Uri.file(path);
        const codeModel = monaco.editor.getModel(uri);

        if (!codeModel) {
            return;
        }

        this._editor.setModel(codeModel);
        this.editorState.RestoreViewState(this._editor, codeModel.uri.path);
        this.propagateModelChange(codeModel);

    }

    private codeModel: monaco.editor.ITextModel;
    private SetCode(code: string, language?: string) {

        if (this._onChangeDisposable) {
            this._onChangeDisposable.dispose();
        }

        if (code === null || code === undefined) {
            this._editor.setModel(null);
            return;
        }

        if (!language) {
            language = this.language;
        }

        let fName = this.fileName;
        if (language) {
            var ext = GetDefaultExtensionForLanguage(language);
            if (ext) {
                fName = `${fName}.${ext}`;
            }
        }

        const uri = monaco.Uri.file(fName);


        this.codeModel = monaco.editor.getModel(uri);

        const lang = GetFileExtension(this.fileName) ? null : language;


        if (this.codeModel) {
            const modelChanged = code !== this.codeModel.getValue();

            if (modelChanged) {
                this.codeModel.dispose();
                this.codeModel = monaco.editor.createModel(code, lang, uri);
            }

        } else {
            this.codeModel = monaco.editor.createModel(code, lang, uri);

        }

        this._editor.setModel(this.codeModel);

        this._onChangeDisposable = monaco.editor.getModel(uri).onDidChangeContent(e => {
            const val = monaco.editor.getModel(uri);
            this.propagateChange(val.getValue());
        });


    }

    private UpdateCodeLanguage(language: string) {

        if (!this.codeModel) {
            return;
        }

        if (this._onChangeDisposable) {
            this._onChangeDisposable.dispose();
        }

        let fName = this.fileName;
        var ext = GetDefaultExtensionForLanguage(language);
        if (ext) {
            fName = `${fName}.${ext}`;
        }


        const uri = monaco.Uri.file(fName);

        const currentCode = this.codeModel.getValue();
        this.codeModel.dispose();
        this.codeModel = monaco.editor.createModel(currentCode, language, uri);

        this._editor.setModel(this.codeModel);

        this._onChangeDisposable = monaco.editor.getModel(uri).onDidChangeContent(e => {
            const val = monaco.editor.getModel(uri);
            this.propagateChange(val.getValue());
        });


    }

    public SetFocus() {

        setTimeout(() => this._editor.focus(), 0);

    }

    CreateMonacoEditor() {

        const compilerOptions: monaco.languages.typescript.CompilerOptions = {
            target: monaco.languages.typescript.ScriptTarget.ES5,
            module: monaco.languages.typescript.ModuleKind.System,
            noLib: true,
            allowNonTsExtensions: true,
            allowJs: true,
            allowSyntheticDefaultImports: true,
            alwaysStrict: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            typeRoots: ['node_modules/@types'],
            downlevelIteration: true,
            noUnusedLocals: true,
            noUnusedParameters: true,
            baseUrl: 'file:///',
        };

        if (this.tsOptions) {
            Object.assign(compilerOptions, this.tsOptions);
        }


        monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
            compilerOptions
        );
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
            compilerOptions
        );

        monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
        monaco.languages.typescript.typescriptDefaults.setMaximumWorkerIdleTime(1000);
        monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
        monaco.languages.typescript.javascriptDefaults.setMaximumWorkerIdleTime(1000);

        const editor = monaco.editor.create(this.elementRef.nativeElement, {
            value: "test",
            lineNumbers: 'on',
            theme: 'vs-dark',
            automaticLayout: true,
            folding: true,
            fixedOverflowWidgets: true,
            mouseWheelZoom: true,
            model: null
        });



        editor.onDidChangeModel((e: monaco.editor.IModelChangedEvent) => {
            if (e && e.newModelUrl) {
                const fullPath = e.newModelUrl.path.substring(1);
                this.activeFile.next(fullPath);
            } else {
                this.activeFile.next(null);
            }
        });

        if (this.editorOptions && this.editorOptions.OnSave) {
            editor.addAction({
                id: 'save-current-model',
                label: `Save File`,
                run: (_editor: monaco.editor.ICodeEditor) => {

                    const model = _editor && _editor.getModel();
                    if (!model) {
                        return;
                    }
                    const path = model.uri.path.substring(1);
                    this.SaveModel(path);
                }
            });
        }

        return editor;
    }

    public SaveModel(path?: string) {

        if (this.editorOptions && this.editorOptions.OnSave) {
            let codeModel: monaco.editor.ITextModel;
            if (path) {
                const uri = monaco.Uri.file(path);
                codeModel = monaco.editor.getModel(uri);
            } else {
                codeModel = this._editor.getModel();
            }

            let result = this.editorOptions.OnSave(codeModel.uri.path.substring(1), codeModel.getValue());

            if (typeof result === 'boolean') {
                result = of(result);
            }

            result.pipe(
                take(1)
            ).subscribe(_result => {
                if (!!_result) {
                    this.editorState.SetLastSavedVersion(codeModel.uri.path, codeModel.getAlternativeVersionId());
                }
            });

        }

    }

    ngOnDestroy() {

        this.destroy$.next();


        if (this._onChangeDisposable) {
            this._onChangeDisposable.dispose();
        }

        if (this._editor) {
            this._editor.dispose();
        }

        if (this.extraLibs) {
            this.extraLibs.dispose();
        }

        monaco.editor.getModels().forEach(m => m.dispose());

    }



    removeDuplicates(myArr, prop) {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }

    registeredRefreshFiles: Array<() => void> = [];
    registerOnRefreshFiles(fn: () => void): void {

        if (this.registeredRefreshFiles.indexOf(fn) === -1) {
            this.registeredRefreshFiles.push(fn);
        }
    }
    propagateRefreshFiles() {
        this.registeredRefreshFiles.forEach(fn => {
            fn();
        });
    }

    registeredOnModelChange: Array<(model: monaco.editor.ITextModel) => void> = [];
    registerOnModelChange(fn: (model: monaco.editor.ITextModel) => void): void {

        if (this.registeredOnModelChange.indexOf(fn) === -1) {
            this.registeredOnModelChange.push(fn);
        }
    }
    propagateModelChange(model: monaco.editor.ITextModel) {
        this.registeredOnModelChange.forEach(fn => {
            fn(model);
        });
    }


    propagateChange(value: string) {
        this.valueChanged.emit(value);
        this.registered.forEach(fn => {
            fn(value);
        });
    }
    onTouched = () => { };

    writeValue(value: string): void {
        this.value = value;
    }

    registered = [];
    registerOnChange(fn: any): void {

        if (this.registered.indexOf(fn) === -1) {
            this.registered.push(fn);
        }
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }

    InvokeAction(id: string) {
        const action = this._editor.getAction(id);
        if (action) {
            action.run();
        }
    }

}

