export abstract class BuilderBaseItem {
    abstract type: string;
    hidden?: () => boolean = () => null;
    disabled?: () => boolean = () => null;
    class?: () => string = () => null;
    style?:  () => {} = () => ({});
    onClick?: ($event: MouseEvent) => void = () => null;


}
