import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[alertHost]',
})
export class AlertDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

// Don't forget to add in APP.MODULES.TS - or will throw error "Can't finde VieChieldeRef - undifiend"
