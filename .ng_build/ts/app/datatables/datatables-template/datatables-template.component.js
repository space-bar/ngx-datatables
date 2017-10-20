import { Component, ComponentFactoryResolver, ElementRef, Input, ViewContainerRef } from '@angular/core';
export class DatatablesTemplateComponent {
    /**
     * @param {?} elementRef
     * @param {?} viewContainerRef
     * @param {?} componentFactoryResolver
     */
    constructor(elementRef, viewContainerRef, componentFactoryResolver) {
        this.elementRef = elementRef;
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    get nativeElement() {
        return this.elementRef.nativeElement;
    }
    /**
     * @param {?} data
     * @param {?=} columns
     * @return {?}
     */
    buildTemplateComponent(data, columns) {
        this.viewContainerRef.clear();
        let /** @type {?} */ rendererComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DatatablesTemplateComponent);
        let /** @type {?} */ datatablesTemplateComponent = (this.viewContainerRef.createComponent(rendererComponentFactory).instance);
        datatablesTemplateComponent.columns = columns;
        datatablesTemplateComponent.data = data;
        return datatablesTemplateComponent;
    }
}
DatatablesTemplateComponent.decorators = [
    { type: Component, args: [{
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
            },] },
];
/**
 * @nocollapse
 */
DatatablesTemplateComponent.ctorParameters = () =;> [
    { type: ElementRef, },
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
];
DatatablesTemplateComponent.propDecorators = {
    'columns': [{ type: Input },],
    'data': [{ type: Input },],
};
function DatatablesTemplateComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DatatablesTemplateComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DatatablesTemplateComponent.ctorParameters;
    /** @type {?} */
    DatatablesTemplateComponent.propDecorators;
    /** @type {?} */
    DatatablesTemplateComponent.prototype.columns;
    /** @type {?} */
    DatatablesTemplateComponent.prototype.data;
    /** @type {?} */
    DatatablesTemplateComponent.prototype.elementRef;
    /** @type {?} */
    DatatablesTemplateComponent.prototype.viewContainerRef;
    /** @type {?} */
    DatatablesTemplateComponent.prototype.componentFactoryResolver;
}
//# sourceMappingURL=datatables-template.component.js.map
