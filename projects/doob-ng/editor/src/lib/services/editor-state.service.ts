import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoobEditorStateService {

  ModelStates: { [uri: string]: ModelState } = {};


  public SetViewState(uri: string, viewState: monaco.editor.ICodeEditorViewState) {
    if (!this.ModelStates[uri]) {
      this.ModelStates[uri] = new ModelState();
    }
    this.ModelStates[uri].ViewState = viewState;
  }

  public GetViewState(uri: string) {
    if (this.ModelStates[uri]) {
      return this.ModelStates[uri].ViewState;
    }
  }

  public RestoreViewState(editor: monaco.editor.IStandaloneCodeEditor, uri: string) {
    const savedViewState = this.GetViewState(uri);
    if (savedViewState) {
      editor.restoreViewState(savedViewState);
    }
  }

  public SetLastSavedVersion(uri: string, versionId: number) {
    if (!this.ModelStates[uri]) {
      this.ModelStates[uri] = new ModelState();
    }
    this.ModelStates[uri].LastSavedVersion = versionId;
  }

  public GetLastSavedVersion(uri: string) {
    if (this.ModelStates[uri]) {
      return this.ModelStates[uri].LastSavedVersion;
    }
  }

  public IsDirty(uri: string, currentVersionId: number) {
    const lastSavedVersion = this.GetLastSavedVersion(uri);
    return currentVersionId !== lastSavedVersion;
  }

}

class ModelState {

  ViewState: monaco.editor.ICodeEditorViewState;
  LastSavedVersion: number;
}
