import { Directive, Renderer, ElementRef } from '@angular/core';
import { Keyboard } from 'ionic-native';
/*
  Generated class for the Focuser directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
    selector: '[focuser]' // Attribute selector
})
export class Focuser {
    constructor(private renderer: Renderer, private elementRef: ElementRef) {
    }

    ngAfterViewInit() {


        const element = this.elementRef.nativeElement.querySelector('textarea');


        setTimeout(() => {
            this.renderer.invokeElementMethod(element, 'focus', []);
            Keyboard.show();
        }, 0);
    }
}

