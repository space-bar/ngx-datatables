import {Directive, ElementRef, Input} from '@angular/core';
import {Datatables} from "./datatables";

@Directive({
  selector: '[ngxDatatables]'
})
export class DatatablesDirective extends Datatables {

  @Input()
  data: Object[];

  @Input()
  ajax: string | DataTables.AjaxSettings | DataTables.FunctionAjax;

  @Input()
  options: DataTables.Settings;

  constructor(private elementRef: ElementRef) {
    super(elementRef);
  }
}
