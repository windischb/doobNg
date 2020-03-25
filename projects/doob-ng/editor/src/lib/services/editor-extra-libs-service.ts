import { DoobEditorFile } from '../models';

export class DoobEditorExtraLibsManager {


    private extraLibs: Map<string, ExtraLibsContext> = new Map<string, ExtraLibsContext>();


    public AddExtraLibDisposable(file: DoobEditorFile, func: (() => monaco.IDisposable)) {

        if (this.extraLibs.has(file.Path)) {

            const found = this.extraLibs.get(file.Path);
            if (found.File.Value !== file.Value) {
                found.Disposable.dispose();
                this.extraLibs.delete(file.Path);
                this.extraLibs.set(file.Path, { File: file, Disposable: func() });
            }

        } else {
            this.extraLibs.set(file.Path, { File: file, Disposable: func() });
        }

    }

    public DisposeAll() {
        this.extraLibs.forEach((value, key) => {
            value.Disposable.dispose();
        });
        this.extraLibs.clear();
    }

}


class ExtraLibsContext {
    File: DoobEditorFile;
    Disposable: monaco.IDisposable;
}
