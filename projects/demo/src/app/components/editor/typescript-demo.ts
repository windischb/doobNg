import { DemoExample } from '../../shared/components/part/example'

export class TypeScriptDemo {


    static Editor = `
<div style="height: 260px;">
    <db-editor language="typescript" [value]="typescriptCode"></db-editor>
</div>
    `

    static Code = `
class Foo {
    name: string;
    age: number;
}

let f = new Foo();
f.name = 'Bernhard'
f.age = 39

`

    static Examples: Array<DemoExample> = [
        {
            language: 'html',
            code: TypeScriptDemo.Editor
        },
        {
            language: 'typescript',
            code: `
export class EditorDemoComponent {

    typeScriptCode = \`
${TypeScriptDemo.Code.trim()}
\`

}
            `
        }
    ]

}
