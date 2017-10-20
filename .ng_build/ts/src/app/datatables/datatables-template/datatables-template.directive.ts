import {Directive, Input, TemplateRef} from "@angular/core";

@Directive({
  selector: '[ngxDatatablesTemplate]'
})
export class DatatablesTemplateDirective {
  @Input()
  ngxDatatablesTemplate: string;

  constructor(private _templateRef: TemplateRef<any>) {
  }

  get templateRef(): TemplateRef<any> {
    return this._templateRef;
  }

}
