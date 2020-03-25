

const FileExtensionMapping = new Map<string, string>([
    ['js', 'javascript'],
    ['ts', 'typescript'],
    ['json', 'json'],
    ['xml', 'xml'],
    ['html', 'html'],
    ['htm', 'html'],
    ['txt', 'plaintext'],
    ['ps1', 'powershell']
]);


export function GetLanguageFromFileName(fileName: string) {
    const extension = fileName.split('.').reverse()[0];
    return FileExtensionMapping.get(extension);
}

export function GetDefaultExtensionForLanguage(language: string) {

    language = language.toLowerCase();

    for (const [k, v] of Array.from(FileExtensionMapping.entries())) {
        if (v === language) {
            return k;
        }
    }
    return undefined;
}

export function GetFileExtension(fileName: string) {

    fileName = fileName.split('/').reverse()[0];

    if(fileName.indexOf('.') === -1) {
        return null;
    }
    return fileName.split('.').reverse()[0];
}
