import { Directive, ElementRef, Input, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: 'input[dbAllowedCharacters]'
})
export class DoobAllowedCharactersDirective  {


    private allowedRegex: RegExp;

    @Input()
    set dbAllowedCharacters(value: string) {
        this.allowedRegex = new RegExp(value);
    }


    @HostListener('keypress', ['$event'])
    OnKeypress($event: KeyboardEvent) {
        if(!this.allowedRegex) {
            return;
        }

        if(!this.allowedRegex.test($event.key)){
            $event.preventDefault();
        }
    }

    @HostListener('paste', ['$event'])
    OnPaste($event: ClipboardEvent) {
        if(!this.allowedRegex) {
            return;
        }
        $event.preventDefault();
        let value = $event.clipboardData.getData('text/plain');
        var newValue = value.split('').filter(c => this.allowedRegex.test(c)).join('')
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', newValue);

    }


    constructor(private elementRef: ElementRef,private renderer: Renderer2) {

    }

}
