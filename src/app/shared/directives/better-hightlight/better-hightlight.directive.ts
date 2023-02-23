import { Directive, Renderer2, OnInit, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBetterHightlight]'
})
export class BetterHightlightDirective implements OnInit {

  constructor(private rederer: Renderer2, private elRef: ElementRef) { }

  ngOnInit(): void {
    this.rederer.setStyle(this.elRef.nativeElement, 'background-color', 'purple')
    this.rederer.setStyle(this.elRef.nativeElement, 'color', 'white')
    this.rederer.setStyle(this.elRef.nativeElement, 'border-radius', '5px')
    this.rederer.setStyle(this.elRef.nativeElement, 'padding', '0.5rem')
    
  }
  
  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.rederer.setStyle(this.elRef.nativeElement, 'opacity', '0.5')
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.rederer.setStyle(this.elRef.nativeElement, 'opacity', '1')
  }

}
