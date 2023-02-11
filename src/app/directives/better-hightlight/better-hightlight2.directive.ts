import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHightlight2]'
})
export class BetterHightlight2Directive implements OnInit {
  @HostBinding('style.opacity') opacity: string = '1' 
  @Input() backgroundColor: string = 'purple'
  @Input() color: string = 'white'

  constructor(private rederer: Renderer2, private elRef: ElementRef) { }

  ngOnInit(): void {
    this.rederer.setStyle(this.elRef.nativeElement, 'background-color', this.backgroundColor)
    this.rederer.setStyle(this.elRef.nativeElement, 'color', this.color)
    this.rederer.setStyle(this.elRef.nativeElement, 'border-radius', '5px')
    this.rederer.setStyle(this.elRef.nativeElement, 'padding', '0.5rem')
    
  }
  
  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.opacity = '0.5'
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.opacity = '1'
  }

}
