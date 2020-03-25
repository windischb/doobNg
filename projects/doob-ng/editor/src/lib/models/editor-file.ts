export class DoobEditorFile<T = any> {

    public Path: string;
    public Value: string;
    public IsFolder?: boolean = false;
    public Context?: T;

    constructor(path: string, value: string, isFolder: boolean, context?: T) {
        this.Path = path;
        this.Value = value;
        this.IsFolder = isFolder;
        this.Context = context;
    }
}
