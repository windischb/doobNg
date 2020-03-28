import { DemoExample } from '../../shared/components/part/example'

export class PowershellDemo {

    static Editor = `
<div style="height: 360px;">
    <db-editor language="powershell" [value]="powershellScriptCode"></db-editor>
</div>
        `

    static Code = `
function Global:Remove-EmptyLines {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory=$true, ValueFromPipeline=$true)]
        [string]$String,

        [Parameter(Mandatory=$false)]
        [switch]$MultiToOne
    )

    PROCESS {

        $replaceWith = [String]::Empty
        $regexPattern = "^\\s*$\\n|\\r";
        if($MultiToOne) {
            $replaceWith = [System.Environment]::NewLine
        }

        $regex = [regex]::new($regexPattern, [System.Text.RegularExpressions.RegexOptions]::Multiline)
        $result = $regex.Replace($String, $replaceWith)
        Write-Output $result
    }
}
        `

    static Examples: Array<DemoExample> = [
        {
            language: 'html',
            code: PowershellDemo.Editor
        },
        {
            language: 'typescript',
            code: `
export class EditorDemoComponent {

    typeScriptCode = \`
${PowershellDemo.Code.trim()}
\`

    }
                `
        }
    ]

}
