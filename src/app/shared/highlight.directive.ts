import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[highlightStudents]'
})
export class highlightDirective {

    @Input() public isStudentsHighlighted = false;

    constructor(private elementRef: ElementRef) {

      // this.elementRef.nativeElement.style.fontWeight = "bold";
    }
}