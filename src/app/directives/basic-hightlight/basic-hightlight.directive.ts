import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicHightlight]'
})
export class BasicHightlightDirective implements OnInit{

  constructor(private element:ElementRef) { }

  ngOnInit() {
    this.element.nativeElement.style.backgroundColor = 'red'
  } 

}
