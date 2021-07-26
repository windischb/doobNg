import { Injectable } from '@angular/core';
import { DoobEditorFile } from '@local/editor';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EndpointRulesService {

    imports$: BehaviorSubject<DoobEditorFile[]> = new BehaviorSubject<DoobEditorFile[]>([]);
    typings$: BehaviorSubject<DoobEditorFile[]> = new BehaviorSubject<DoobEditorFile[]>([]);
    
    constructor() {

        this.imports$.next([this.GetHttpImports()])
        this.typings$.next([this.GetHttpTypings()]);
    }

    
    GetHttpTypings() {

        return new DoobEditorFile("Http.d.ts", `
        
namespace Scripter {

    namespace Module {

        namespace Http {

            interface HttpOptionsBuilder {

                UseProxy(proxy: string): HttpOptionsBuilder;
                UseProxy(proxy: string, credentials: Scripter.Module.HelperClasses.SimpleCredentials): HttpOptionsBuilder;
                IgnoreProxy(value?: boolean): HttpOptionsBuilder;
            }

            interface HttpRequestBuilder {
                UsePath(url: string): HttpRequestBuilder;
                AddHeader(key: string, ...value: string[]): HttpRequestBuilder;
                SetHeader(key: string, ...value: string[]): HttpRequestBuilder;
                SetContentType(vlue: string): HttpRequestBuilder;
                AddQueryParam(key: string, ...value: string[]): HttpRequestBuilder;
                SetQueryParam(key: string, ...value: string[]): HttpRequestBuilder;
                SetBearerToken(token: string): HttpRequestBuilder;
                SetBasicAuthentication(username: string, password: string): HttpRequestBuilder;

                Send(method: string, body?: any): HttpResponse;
                Get(): HttpResponse;
                Post(body: any): HttpResponse
                Put(body: any): HttpResponse;
                Patch(body: any): HttpResponse;
                Delete(body?: any): HttpResponse;

            }

            interface HttpResponse {
                Version: string;
                Content: GenericHttpContent;
                ContentHeaders: any;
                StatusCode: any;
                ReasonPhrase: string;
                Headers: any;
                TrailingHeaders: any;
                IsSuccessStatusCode: boolean;
                EnsureSuccessStatusCode(): HttpResponse;

            }

            interface GenericHttpContent {
                Type: string;
                IsArray: boolean;
                AsText(): string;
                AsObject(): any;
                AsArray(): Array<any>;
            }

        }
    }


}
        
        `, false)

    }

    GetHttpImports() {
        return new DoobEditorFile("Http.d.ts", `
        
        

        export declare function Client(url: string): Scripter.Module.Http.HttpRequestBuilder;
        export declare function Client(url: string, options: ((builder: Scripter.Module.Http.HttpOptionsBuilder) => Scripter.Module.Http.HttpOptionsBuilder)): Scripter.Module.Http.HttpRequestBuilder;
        
       `, false)
        
    }
}