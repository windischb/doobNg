/// <reference path="../../../../../node_modules/monaco-editor/monaco.d.ts" />

export class LanguageHelper {

    static GetLanguages() {
        return monaco.languages.getLanguages();
    }

    static GetLanguage(language: string) {
        let lang = monaco.languages.getLanguages().find(l => l.id === language);
        return lang;
    }

    static GetDefaultFileExtension(language: string) {
        let lang = this.GetLanguage(language);
        return lang?.extensions[0];
    }

    static GetLanguageFromFileExtension(extension: string) {
        let language = monaco.languages.getLanguages().find(l => l.extensions[0] === extension);
        return language?.id;
    }

    static GetLanguageFromFileName(fileName: string) {
        const extension = this.GetFileExtension(fileName);
        return this.GetLanguageFromFileExtension(extension);
    }

    static GetFileExtension(fileName: string) {

        fileName = fileName.split('/').reverse()[0];

        if(fileName.indexOf('.') === -1) {
            return null;
        }
        return fileName.split('.').reverse()[0];
    }

}
