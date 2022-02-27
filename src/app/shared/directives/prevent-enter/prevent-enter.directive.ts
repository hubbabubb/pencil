import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appPreventEnter]'
})
export class PreventEnterDirective {

  constructor() {}

  @HostListener('document:keydown.enter', ['$event']) preventEnter(event: KeyboardEvent) {
    event.preventDefault();
  }
}
