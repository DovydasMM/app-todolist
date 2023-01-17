import { DOCUMENT } from "@angular/common";
import {
  AfterViewInit,
  Directive,
  Inject,
  OnDestroy,
  Output,
} from "@angular/core";
import { ElementRef } from "@angular/core";
import { fromEvent, filter, Subject, Subscription } from "rxjs";

@Directive({
  selector: "[appToggleDrop]",
})
export class ToggleDropDirective implements AfterViewInit, OnDestroy {
  @Output() clickOutside = new Subject<void>();

  documentClickSubscription: Subscription | undefined;

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    this.documentClickSubscription = fromEvent(this.document, "click")
      .pipe(
        filter((event) => {
          return !this.isInside(event.target as HTMLElement);
        })
      )
      .subscribe(() => {
        this.clickOutside.next();
      });
  }
  isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.element.nativeElement ||
      this.element.nativeElement.contains(elementToCheck)
    );
  }

  ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
  }
}
