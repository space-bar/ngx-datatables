import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewContainerRef
} from "@angular/core";
import {DatatablesColumnComponent} from "../datatables-column/datatables-column.component";

@Component({
  selector: 'ngx-datatables-template',
  template: `
    <tr *ngFor="let rowData of data;let rowIndex = index">

      <td *ngFor="let column of columns;let colIndex=index"
          [ngClass]="{'row-selector':(column.bodyTemplate ? 1 : (column.rowSelector ? 2 : 0))==2}">

        <ng-container [ngSwitch]="column.bodyTemplate ? 1 : (column.rowSelector ? 2 : 0)">
              <span *ngSwitchCase="1" id="_1_{{colIndex}}_{{rowIndex}}">
                  <ng-container [ngTemplateOutlet]="column.bodyTemplate?.templateRef"
                                [ngTemplateOutletContext]="{$implicit:{rowData:rowData,data:rowData,rowIndex:rowIndex,columnIndex:colIndex}}"
                                #bodyTemplate></ng-container>
              </span>

        </ng-container>
      </td>
    </tr>
  `,
  styles: [`

  `]
})
export class DatatablesTemplateComponent implements OnInit {

  @Input()
  columns: QueryList<DatatablesColumnComponent>;

  @Input()
  data: Object[];

  constructor(private elementRef: ElementRef, private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }

  get nativeElement() {
    return this.elementRef.nativeElement;
  }

  private buildTemplateComponent(data: Object[], columns?: QueryList<DatatablesColumnComponent>): DatatablesTemplateComponent {
    this.viewContainerRef.clear();
    let rendererComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DatatablesTemplateComponent);
    let datatablesTemplateComponent = <DatatablesTemplateComponent>this.viewContainerRef.createComponent(rendererComponentFactory).instance;
    datatablesTemplateComponent.columns = columns;
    datatablesTemplateComponent.data = data;
    return datatablesTemplateComponent;
  }
}
