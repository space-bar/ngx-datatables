import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewContainerRef
} from '@angular/core';
import {DatatablesColumnComponent} from '../datatables-column/datatables-column.component';

@Component({
  selector: 'ngx-datatables-template',
  templateUrl: './datatables-template.component.html',
  styleUrls: ['./datatables-template.component.css']
})
export class DatatablesTemplateComponent implements OnInit {

  @Input()
  columns: QueryList<DatatablesColumnComponent>;

  @Input()
  data: Object[];

  constructor(private elementRef: ElementRef, private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }

  get nativeElement() {
    return this.elementRef.nativeElement;
  }

  private buildTemplateComponent(data: Object[], columns?: QueryList<DatatablesColumnComponent>): DatatablesTemplateComponent {
    this.viewContainerRef.clear();
    const rendererComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DatatablesTemplateComponent);
    const datatablesTemplateComponent =
      <DatatablesTemplateComponent>this.viewContainerRef.createComponent(rendererComponentFactory).instance;
    datatablesTemplateComponent.columns = columns;
    datatablesTemplateComponent.data = data;
    return datatablesTemplateComponent;
  }
}
