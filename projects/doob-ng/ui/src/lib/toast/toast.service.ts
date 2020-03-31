import { Injectable } from "@angular/core";


declare const $:any;

@Injectable({
    providedIn: 'root'
})
export class DoobToastService {


    private defaultOptions: ToastOptions = {
        position: "top right",
        showProgress: false,
        displayTime: 2000
    }


    public Add(content: ToastContent, options?: ToastOptions) {

        const mergedOptions = {...this.defaultOptions, ...options,...content}
        $('body').toast(mergedOptions);
    }

    public AddInfo(content: ToastContent, options?: ToastOptions) {
        this.Add(content, {...options, class: "info"})
    }

    public AddSuccess(content: ToastContent, options?: ToastOptions) {
        this.Add(content, {...options, class: "success"})
    }

    public AddWarning(content: ToastContent, options?: ToastOptions) {
        this.Add(content, {...options, class: "warning"})
    }

    public AddById(id: string, options?: ToastOptions) {
        const mergedOptions = {...this.defaultOptions, ...options}
        $(id).toast(mergedOptions);
    }
}

export class ToastContent {

    title?: string;
    message?: string;

}

export class ToastOptions {

    position?: "top right" | "top center" | "top left" | "bottom right" | "bottom center" | "bottom left"
    displayTime?: number
    class?: "info" | "success" | "warning" | "error" | string
    showProgress?: "bottom" | "top" | boolean
    transition?: any
    opacity?: number
}
