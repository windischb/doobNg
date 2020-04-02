import { BuilderBaseItem } from './builder-base-item';

export class BuilderHeaderItem extends BuilderBaseItem {
    type: string = "header";
    content: () => string = () => null;
}
