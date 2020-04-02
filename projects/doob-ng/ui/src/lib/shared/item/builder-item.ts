import { BuilderBaseItem } from './builder-base-item';

export class BuilderItem extends BuilderBaseItem {
    type = "item";
    description: () => string = () => null;
    icon: () => string = () => null;
    content: () => string = () => null;
}
