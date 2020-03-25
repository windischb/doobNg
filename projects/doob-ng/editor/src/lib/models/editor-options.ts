import { DoobEditorFile } from './editor-file';
import { Observable } from 'rxjs';

export class DoobEditorOptions {
    public OnSave?: (path: string, value: string) => boolean | Observable<any>;
    public CheckFileChanged?: (oldFile: DoobEditorFile, newFile: DoobEditorFile) => boolean;
}
