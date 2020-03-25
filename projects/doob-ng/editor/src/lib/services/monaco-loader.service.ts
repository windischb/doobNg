/// <reference path="../../../../../../node_modules/monaco-editor/monaco.d.ts" />

import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class MonacoLoaderService {

    public isMonacoLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isMonacoLoaded = false;
    public monacoPathVal = 'assets/monaco-editor/vs';

    set monacoPath(value: any) {
        if (value) {
            this.monacoPathVal = value;
        }
    }


    constructor(ngZone: NgZone) {

        if (this.isMonacoLoaded) {
            return;
        }

        const onGotAmdLoader = () => {
            // Load monaco
            (window as any).require.config({ paths: { vs: this.monacoPathVal } });
            (window as any).require(['vs/editor/editor.main'], () => {
                ngZone.run(() => {
                    this.isMonacoLoaded = true;
                    this.isMonacoLoaded$.next(true);
                });
            });
        };

        // Load AMD loader if necessary
        if (!(window as any).require) {
            const loaderScript = document.createElement('script');
            loaderScript.type = 'text/javascript';
            loaderScript.src = `${this.monacoPathVal}/loader.js`;
            loaderScript.addEventListener('load', onGotAmdLoader);
            document.body.appendChild(loaderScript);
        } else {
            onGotAmdLoader();
        }
    }

    private completionProvider: monaco.IDisposable;

    public SetCompletionProvider(language: string, provider: monaco.languages.CompletionItemProvider) {

        if (this.completionProvider) {
            this.completionProvider.dispose();
        }

        this.completionProvider = monaco.languages.registerCompletionItemProvider(language, provider);
    }
}
