import { ComponentFactoryResolver, ElementRef, OnInit, QueryList, ViewContainerRef } from "@angular/core";
import { DatatablesColumnComponent } from "../datatables-column/datatables-column.component";
export declare class DatatablesTemplateComponent implements OnInit {
    private elementRef;
    private viewContainerRef;
    private componentFactoryResolver;
    columns: QueryList<DatatablesColumnComponent>;
    data: Object[];
    constructor(elementRef: ElementRef, viewContainerRef: ViewContainerRef, componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    readonly nativeElement: any;
    private buildTemplateComponent(data, columns?);
}
