import { Component, AfterViewInit, Input } from '@angular/core';
import * as prism from 'prismjs';

@Component({
  selector: 'db-prism',
  templateUrl: './prism.component.html',
  styleUrls: ['./prism.component.scss'],
})
export class DoobPrismComponent implements AfterViewInit {

  private _language: string;
  @Input()
  get language() {
    return this._language;
  }
  set language(value: string) {

    value = value.toLowerCase()
    if (value.startsWith("language-")) {
      value = value.substring("language-".length)
    } else if (value.startsWith("lang-")) {
      value = value.substring("lang-".length)
    }
    this._language = `language-${value}`
  }

  _code: string;
  @Input()
  get code() {
    return this._code;
  }

  set code(value: string) {
    this._code = value.trim();
  }

  constructor() { }


  ngAfterViewInit(): void {
    prism.highlightAll()
  }

  getLanguage() {
    return this._language;
  }

}
