import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  QueryList,
} from '@angular/core';
import {DatatablesColumnComponent} from '../datatables-column/datatables-column.component';

@Component({
  selector: 'ngx-datatables-template',
  templateUrl: './datatables-template.component.html',
  styleUrls: ['./datatables-template.component.css']
})
export class DatatablesTemplateComponent {

  @Input()
  columns: QueryList<DatatablesColumnComponent>;

  @Input()
  data: Object[];

  constructor(private elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
  }

  get nativeElement() {
    return this.elementRef.nativeElement;
  }

  updateParameters(data: Object[], columns?: QueryList<DatatablesColumnComponent>) {
    this.data = data;
    this.columns = columns || this.columns;
    this.changeDetectorRef.detectChanges();
  }

}
