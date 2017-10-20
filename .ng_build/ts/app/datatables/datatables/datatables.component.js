import { Component, ComponentFactoryResolver, ContentChildren, ElementRef, Input, NgZone, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { DatatablesColumnComponent } from '../datatables-column/datatables-column.component';
import { DatatablesTemplateComponent } from '../datatables-template/datatables-template.component';
export class DatatablesComponent {
    /**
     * @param {?} elementRef
     * @param {?} zone
     * @param {?} componentFactoryResolver
     */
    constructor(elementRef, zone, componentFactoryResolver) {
        this.elementRef = elementRef;
        this.zone = zone;
        this.componentFactoryResolver = componentFactoryResolver;
        this.ROW_SELECTOR_CLASS = "row-selector";
        this.selectionMode = "multiple";
        this.dataListener = new Subject();
        this.initListener = Subject.create();
        this.NO_SEARCH_INPUT_DOM = "<'row'<'col-sm-6'><'col-sm-6'<'dataTables_toolbar'>>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7 text-right'lp>>";
        this.DEFAULT_SETTINGS = {
            dom: "<'row'<'col-sm-6'f><'col-sm-6'<'dataTables_toolbar'>>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7 text-right'lp>>",
            //serverSide: true,
            responsive: true,
            searching: false,
            processing: true,
            //selection: "multiple",
            //export: "datatable/export",
            pagingType: "full_numbers",
            lengthMenu: [2, 4, 20, 50, 100, 200, 500],
            order: [[0, 'desc']],
            initComplete: (settings, json) => {
                this.initListener.next(json);
            },
            (thead, data, start, end, display) =;> {
                this.onHeaderCallbackEvent(thead, data, start, end, display);
            },
            (settings) =;> {
                this.onDrawCallbackEvent(settings);
            },
            (settings) =;> {
                this.onPreDrawCallbackEvent(settings);
            },
            {
                //processing: '<span class="fa fa-spinner fa-pulse fa-spin dataTables_processing"></span> loading...',
                "Records Per Page: _MENU_"
            }
    }
      this.PRIVATE_SETTINGS = {
            initComplete: (settings, json) => {
                this.initListener.next(json);
                if (this.options && $.isFunction(this.options.initComplete))
                    this.options.initComplete.call(this.dataTableApi, settings, json);
            },
            (thead, data, start, end, display) =;> {
                this.onHeaderCallbackEvent(thead, data, start, end, display);
                if (this.options && $.isFunction(this.options.initComplete))
                    this.options.initComplete.call(this.dataTableApi, thead, data, start, end, display);
            },
            (settings) =;> {
                this.onDrawCallbackEvent(settings);
                if (this.options && $.isFunction(this.options.initComplete))
                    this.options.initComplete.call(this.dataTableApi, settings);
            },
            (settings) =;> {
                this.onPreDrawCallbackEvent(settings);
                if (this.options && $.isFunction(this.options.initComplete))
                    this.options.initComplete.call(this.dataTableApi, settings);
            }
    }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.dataListener.subscribe((data) => {
            this.dirtyData = true;
            if (data && data.length) {
                this.data = data;
                this.buildTemplateComponent();
            }
    })
      if ($.fn['dataTable'] && $.fn['dataTable'].ext) {
            $.fn['dataTable'].ext.errMode = function (settings, helpPage, message) {
                console.log(message);
            };
        }
        this.init();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initDataTable();
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this.renderDirtyData();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.dataListener.next(null);
        for (let /** @type {?} */ propName in changes) {
            if (!changes[propName].firstChange) {
                this.init();
                this.initDataTable();
                break;
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.dataListener.unsubscribe();
        this.initListener.unsubscribe();
    }
    /**
     * @return {?}
     */
    init() {
        let /** @type {?} */ defaultSettings = Object.assign({}, this.DEFAULT_SETTINGS);
        if (this.hideSearchInput) {
            defaultSettings.dom = this.NO_SEARCH_INPUT_DOM;
        }
        this.options$ = $.extend(true, defaultSettings, { ajax: typeof this.ajaxOptions == 'string' ? { url: this.ajaxOptions } : this.ajaxOptions });
        this.options$ = $.extend(true, this.options$, this.options || {});
        this.options$ = $.extend(true, this.options$, this.PRIVATE_SETTINGS);
        this.options$.serverSide = (this.options$.ajax && (typeof this.options$.ajax == 'string' || this.options$.ajax['url'] || $.isFunction(this.options$.ajax)));
        this.options$.data = this.options$.serverSide ? null : [];
    }
    /**
     * @return {?}
     */
    initDataTable() {
        let /** @type {?} */ tableNode = this.tableElementRef.nativeElement;
        if (!$.fn.DataTable['isDataTable'](tableNode)) {
            $(tableNode).DataTable().destroy();
        }
        this.options$.columnDefs = this.initColumnDefs();
        this._dataTableApi = $(tableNode).DataTable(this.options$);
        if (this.data && !this.options$.serverSide) {
            setTimeout(() => {
                this._dataTableApi.rows.add(this.data).draw();
        },
          200;
        )
        }
    }
    /**
     * @return {?}
     */
    renderDirtyData() {
        if (this.dirtyData && this.datatablesTemplateComponent) {
            this.dirtyData = false;
            $('tr', this.datatablesTemplateComponent.nativeElement).each((index, tr) => {
                $('td span', tr;).each((cellIndex, td) => {
                    let /** @type {?} */ paramIndexes = td.id.split("_");
                    console.log(paramIndexes);
                    if (paramIndexes.length > 3) {
                        let /** @type {?} */ row = paramIndexes[3];
                        let /** @type {?} */ col = paramIndexes[2];
                        if (!isNaN(parseInt(row)) && !isNaN(parseInt(row))) {
                            let /** @type {?} */ cell = this.dataTableApi.cell(row, col);
                            if (cell) {
                                let /** @type {?} */ $cell = $(cell.node());
                                $cell.empty();
                                $cell.append(td);
                            }
                        }
                    }
        })
        })
        }
    }
    /**
     * @param {?} tableApi
     * @return {?}
     */
    initSelection(tableApi) {
        tableApi.rows().nodes().$('td.' + this.ROW_SELECTOR_CLASS).each((rowIndex, td) => {
            $('input[type="checkbox"]', td;).off('change.dt').on('change.dt', function () {
                let /** @type {?} */ rowSelector = tableApi.row(td)[((this)).checked ? 'select' : 'deselect'];
                if ($.isFunction(rowSelector))
                    rowSelector();
            });
    })
      let /** @type {?} */ colSelector = tableApi.columns('td.' + this.ROW_SELECTOR_CLASS);
        $.each(colSelector.header(), (index, th) => {
            $('input[type="checkbox"]', th;).off('change.dt').on('change.dt', function () {
                let /** @type {?} */ tdCheckboxes = $('input[type="checkbox"]', tableApi.column(th).nodes());
                tdCheckboxes.prop({ checked: ((this)).checked });
                /*let rowSelector = tableApi.rows(tableApi.column(th).nodes())[this.checked ? 'select' : 'deselect'];
                 if ($.isFunction(rowSelector))
                 rowSelector();*/
                tdCheckboxes.change();
            });
    })
    }
    /**
     * @param {?} thead
     * @return {?}
     */
    initColumnHeader(thead) {
        this.columns.forEach((item, index, items) => {
            if (item.rowSelector;) {
                let /** @type {?} */ th = $('th', thead).eq(index);
                let /** @type {?} */ this_ = this;
                $('input[type="checkbox"]', th).off('change.dt').on('change.dt', function () {
                    let /** @type {?} */ tdCheckboxes = $('input[type="checkbox"]', this_.dataTableApi.column(th).nodes());
                    tdCheckboxes.prop({ checked: ((this)).checked });
                    /*let rowSelector = tableApi.rows(tableApi.column(th).nodes())[this.checked ? 'select' : 'deselect'];
                     if ($.isFunction(rowSelector))
                     rowSelector();*/
                    tdCheckboxes.change();
                });
            }
    })
    }
    /**
     * @return {?}
     */
    initColumnDefs() {
        let /** @type {?} */ columnDefs = [];
        this.columns.forEach((item, index, items) => {
            let /** @type {?} */ columnDef = item.buildColumnDefs();
            columnDef = columnDef ? columnDef : ({});
            columnDef.targets = index;
            if (item.rowSelector) {
                this.buildRowSelectorColumn(columnDef);
            }
            columnDefs.push(columnDef);
    })
      return columnDefs;
    }
    /**
     * @param {?} columnDef
     * @return {?}
     */
    buildRowSelectorColumn(columnDef) {
        columnDef.render = function (data, type, rowData, meta) {
            if (type !== 'display')
                return data;
            return `<span class="md-checkbox">
             <input type="checkbox" id="rowselector_${meta.col}_${meta.row}" class="md-check">
           <label for="rowselector_${meta.col}_${meta.row}">
              <span></span>
              <span class="check"></span>
              <span class="box"></span>
            </label>
        </span>`;
        };
        let /** @type {?} */ this_ = this;
        columnDef.createdCell = (cell, cellData, rowData, row, col) =;> {
            $(cell).addClass(this.ROW_SELECTOR_CLASS).find('input[type="checkbox"]').off('change.dt').on('change.dt', function () {
                let /** @type {?} */ rowSelector = this_.dataTableApi.row($(cell).parent('tr'))[$(this).is(':checked') ? 'select' : 'deselect'];
                if ($.isFunction(rowSelector))
                    rowSelector();
            });
      }
    }
    /**
     * @return {?}
     */
    buildTemplateComponent() {
        this.templateViewContainerRef.clear();
        let /** @type {?} */ rendererComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DatatablesTemplateComponent);
        this.datatablesTemplateComponent = this.templateViewContainerRef.createComponent(rendererComponentFactory).instance;
        this.datatablesTemplateComponent.columns = this.columns;
        this.datatablesTemplateComponent.data = this.data;
    }
    /**
     * @param {?} settings
     * @return {?}
     */
    onPreDrawCallbackEvent(settings) {
    }
    /**
     * @param {?} settings
     * @return {?}
     */
    onDrawCallbackEvent(settings) {
        let /** @type {?} */ data = this.currentData();
        this.dataListener.next(data);
    }
    /**
     * @param {?} thead
     * @param {?} data
     * @param {?} start
     * @param {?} end
     * @param {?} display
     * @return {?}
     */
    onHeaderCallbackEvent(thead, data, start, end, display) {
        this.initColumnHeader(thead);
    }
    /**
     * @return {?}
     */
    currentData() {
        let /** @type {?} */ dataObject = this.dataTableApi.rows({ page: 'current' }).data();
        let /** @type {?} */ data = [];
        if (dataObject.length) {
            for (let /** @type {?} */ x = 0; x < dataObject.length; x++) {
                data.push(dataObject[x]);
            }
        }
        return data;
    }
    /**
     * @return {?}
     */
    get toolbar() {
        return Observable.create((observer) => {
            let /** @type {?} */ subscription = this.initListener.subscribe(() => {
                observer.next($(this.elementRef.nativeElement).find('div.dataTables_toolbar').get(0));
                observer.complete();
    })
      return () =;> {
                subscription.unsubscribe();
      }
    })
    }
    /**
     * @param {?} toolbarListener
     * @return {?}
     */
    set toolbar(toolbarListener) {
        let /** @type {?} */ _subscription = this.initListener.subscribe(() => {
            let /** @type {?} */ subscription = toolbarListener.subscribe((tools) => {
                $(this.elementRef.nativeElement;).find('div.dataTables_toolbar').append(tools);
            }, error =;> {
            }, () =;> {
                //_subscription.unsubscribe();
      }
    )
      return () =;> {
                subscription.unsubscribe();
      }
    })
    }
    /**
     * @return {?}
     */
    get dataTableApi() {
        return this._dataTableApi || $(this.tableElementRef.nativeElement).DataTable();
    }
    /**
     * @return {?}
     */
    getSelectedRowsCount() {
        return this.dataTableApi.rows({ selected: true }).count();
    }
    /**
     * @return {?}
     */
    getSelectedRows() {
        return this.dataTableApi.rows({ selected: true }).to$().toArray();
    }
    /**
     * @param {?} row
     * @return {?}
     */
    isRowSelected(row) {
        return this.dataTableApi.rows({ selected: true }).$(row).length > 0;
    }
    /**
     * @param {?} row
     * @return {?}
     */
    selectRow(row) {
        if (!this.isRowSelected(row)) {
            let /** @type {?} */ select = this.dataTableApi.rows(row)['select'];
            if ($.isFunction(select)) {
                select();
            }
        }
    }
    /**
     * @param {?} row
     * @return {?}
     */
    deselectRow(row) {
        if (this.isRowSelected(row)) {
            let /** @type {?} */ deselect = this.dataTableApi.rows(row)['deselect'];
            if ($.isFunction(deselect)) {
                deselect();
            }
        }
    }
    /**
     * @return {?}
     */
    selectAllRows() {
        let /** @type {?} */ select = this.dataTableApi.rows()['select'];
        if ($.isFunction(select)) {
            select();
        }
    }
    /**
     * @return {?}
     */
    deselectAllRows() {
        let /** @type {?} */ deselect = this.dataTableApi.rows()['deselect'];
        if ($.isFunction(deselect)) {
            deselect();
        }
    }
    /**
     * @return {?}
     */
    isServerSide() {
        return this.dataTableApi.page.info().serverSide;
    }
    /**
     * @return {?}
     */
    reload() {
        if (!this.isServerSide()) {
            this.dataTableApi.draw(true);
        }
        else {
            this.dataTableApi.clear();
            this.dataTableApi.draw();
        }
    }
}
DatatablesComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-datatables',
                template: `
    <div class="table-container datatable-container {{containerClass}}">

      <table class="table table-striped table-bordered table-hover table-checkable {{tableClass}}" #tableElement>
        <thead>
        <tr role="row" class="heading">
          <th *ngFor="let column of columns;let colIndex = index"
              [ngClass]="{'row-selector selector':(column.bodyTemplate ? 1 : (column.rowSelector ? 2 : 0))==2}">

            <ng-container [ngSwitch]="column.headerTemplate ? 1 : (column.rowSelector ? 2 : 0)">
              <ng-container *ngSwitchCase="1"
                            [ngTemplateOutlet]="column.headerTemplate?.templateRef"
                            [ngTemplateOutletContext]="{$implicit:{column:column}}"
                            #headerTemplate></ng-container>

              <span *ngSwitchCase="2">
                <span class="md-checkbox">
                  <input type="checkbox" id="rowselector_{{colIndex}}" class="md-check">
                  <label for="rowselector_{{colIndex}}">
                    <span></span>
                    <span class="check"></span>
                    <span class="box"></span>
                  </label>
                </span>
              </span>

              <span *ngSwitchDefault>{{column.header}}</span>
            </ng-container>

          </th>
        </tr>

        </thead>
        <tbody>

        </tbody>

      </table>

      <ng-container #templateContainer>

      </ng-container>

    </div>
  `,
                styles: [`

  `]
            },] },
];
/**
 * @nocollapse
 */
DatatablesComponent.ctorParameters = () =;> [
    { type: ElementRef, },
    { type: NgZone, },
    { type: ComponentFactoryResolver, },
];
DatatablesComponent.propDecorators = {
    'columns': [{ type: ContentChildren, args: [DatatablesColumnComponent,] },],
    'selectionMode': [{ type: Input },],
    'tableClass': [{ type: Input },],
    'containerClass': [{ type: Input },],
    'data': [{ type: Input, args: ["data",] },],
    'ajaxOptions': [{ type: Input, args: ["ajax",] },],
    'options': [{ type: Input, args: ["options",] },],
    'hideSearchInput': [{ type: Input, args: ["hideSearchInput",] },],
    'tableElementRef': [{ type: ViewChild, args: ["tableElement",] },],
    'datatablesTemplateComponent': [{ type: ViewChild, args: [DatatablesTemplateComponent,] },],
    'templateViewContainerRef': [{ type: ViewChild, args: ["templateContainer", { read: ViewContainerRef },] },],
};
function DatatablesComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DatatablesComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DatatablesComponent.ctorParameters;
    /** @type {?} */
    DatatablesComponent.propDecorators;
    /** @type {?} */
    DatatablesComponent.prototype.ROW_SELECTOR_CLASS;
    /** @type {?} */
    DatatablesComponent.prototype.columns;
    /** @type {?} */
    DatatablesComponent.prototype.selectionMode;
    /** @type {?} */
    DatatablesComponent.prototype.tableClass;
    /** @type {?} */
    DatatablesComponent.prototype.containerClass;
    /** @type {?} */
    DatatablesComponent.prototype.data;
    /** @type {?} */
    DatatablesComponent.prototype.ajaxOptions;
    /** @type {?} */
    DatatablesComponent.prototype.options;
    /** @type {?} */
    DatatablesComponent.prototype.hideSearchInput;
    /** @type {?} */
    DatatablesComponent.prototype.options$;
    /** @type {?} */
    DatatablesComponent.prototype.dataListener;
    /** @type {?} */
    DatatablesComponent.prototype.dirtyData;
    /** @type {?} */
    DatatablesComponent.prototype.tableElementRef;
    /** @type {?} */
    DatatablesComponent.prototype._dataTableApi;
    /** @type {?} */
    DatatablesComponent.prototype.initListener;
    /** @type {?} */
    DatatablesComponent.prototype.datatablesTemplateComponent;
    /** @type {?} */
    DatatablesComponent.prototype.templateViewContainerRef;
    /** @type {?} */
    DatatablesComponent.prototype.NO_SEARCH_INPUT_DOM;
    /** @type {?} */
    DatatablesComponent.prototype.DEFAULT_SETTINGS;
    /** @type {?} */
    DatatablesComponent.prototype.PRIVATE_SETTINGS;
    /** @type {?} */
    DatatablesComponent.prototype.elementRef;
    /** @type {?} */
    DatatablesComponent.prototype.zone;
    /** @type {?} */
    DatatablesComponent.prototype.componentFactoryResolver;
}
//# sourceMappingURL=datatables.component.js.map
