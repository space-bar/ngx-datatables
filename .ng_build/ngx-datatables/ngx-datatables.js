import { Component, ComponentFactoryResolver, ContentChild, ContentChildren, Directive, ElementRef, Input, NgModule, NgZone, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject as Subject$1 } from 'rxjs/Subject';
import { Observable as Observable$1 } from 'rxjs/Observable';

class DatatablesTemplateDirective {
    /**
     * @param {?} _templateRef
     */
    constructor(_templateRef) {
        this._templateRef = _templateRef;
    }
    /**
     * @return {?}
     */
    get templateRef() {
        return this._templateRef;
    }
}
DatatablesTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxDatatablesTemplate]'
            },] },
];
/**
 * @nocollapse
 */
DatatablesTemplateDirective.ctorParameters = () =;> [
    { type: TemplateRef, },
];
DatatablesTemplateDirective.propDecorators = {
    'ngxDatatablesTemplate': [{ type: Input },],
};

class DatatablesColumnComponent {
    constructor() {
        this.searchable = true;
        this.visible = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.templates != null) {
            this._headerTemplate = this.findTemplateFor('header');
            this._footerTemplate = this.findTemplateFor('footer');
            this._bodyTemplate = this.findTemplateFor('body');
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
    }
    /**
     * @return {?}
     */
    get headerTemplate() {
        return this._headerTemplate;
    }
    /**
     * @return {?}
     */
    get footerTemplate() {
        return this._footerTemplate;
    }
    /**
     * @return {?}
     */
    get bodyTemplate() {
        return this._bodyTemplate;
    }
    /**
     * @param {?} templates
     * @return {?}
     */
    singularTemplate(templates) {
        if (templates != null && templates.length > 1) {
            console.warn(`Multiple '${templates[0].ngxDatatablesTemplate}' Column template detected [ignored]`);
        }
        return templates == null || templates.length === 0 ? null : templates[0];
    }
    /**
     * @param {?} templateName
     * @return {?}
     */
    findTemplateFor(templateName) {
        let /** @type {?} */ templates = this.templates != null ? this.templates.filter(template => template.ngxDatatablesTemplate === templateName;) : null;
        if (templates != null && templates.length > 1) {
            console.warn(`Multiple '${templateName}' Column template detected [ignored]`);
        }
        return templates == null || templates.length === 0 ? null : templates[0];
    }
    /**
     * @return {?}
     */
    buildColumnDefs() {
        let /** @type {?} */ columnDefs = ({});
        columnDefs.searchable = this.searchable;
        columnDefs.title = this.title;
        columnDefs.visible = this.visible;
        columnDefs.width = this.width;
        columnDefs.orderable = (typeof this.orderable === 'undefined' && this.rowSelector) ? false : this.orderable;
        columnDefs.data = this.field;
        return columnDefs;
    }
}
DatatablesColumnComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-datatables-column',
                template: `

  `,
                styles: [`

  `]
            },] },
];
/**
 * @nocollapse
 */
DatatablesColumnComponent.ctorParameters = () =;> [];
DatatablesColumnComponent.propDecorators = {
    'templates': [{ type: ContentChildren, args: [DatatablesTemplateDirective,] },],
    'title': [{ type: Input },],
    'field': [{ type: Input },],
    'sortField': [{ type: Input },],
    'header': [{ type: Input },],
    'footer': [{ type: Input },],
    'sortable': [{ type: Input },],
    'sortFunction': [{ type: Input },],
    'editable': [{ type: Input },],
    'filter': [{ type: Input },],
    'rowSelector': [{ type: Input },],
    'orderable': [{ type: Input },],
    'searchable': [{ type: Input },],
    'visible': [{ type: Input },],
    'width': [{ type: Input },],
};

class DatatablesTemplateComponent {
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

class DatatablesComponent {
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
        this.dataListener = new Subject$1();
        this.initListener = Subject$1.create();
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
        return Observable$1.create((observer) => {
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

class DatatablesPortletComponent {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.toggleFilter = () =;> {
      }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initTools();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.templates) {
            this.actionsTemplate = this.findTemplateFor('actions');
            this.filtersTemplate = this.findTemplateFor('filters');
            this.toolsTemplate = this.findTemplateFor('tools');
            this.captionTemplate = this.findTemplateFor('caption');
            if (this.actionsTemplate)
                this.initActions();
        }
    }
    /**
     * @return {?}
     */
    get filtersData() {
        if (this.filtersTemplate) {
            let /** @type {?} */ element = this.filtersTemplate.templateRef.elementRef.nativeElement;
            let /** @type {?} */ forms = element.getElementsByTagName("form");
            return forms && forms.length ? this.serializeToJSON(forms[0]) : {};
        }
        return {};
    }
    /**
     * @return {?}
     */
    filters() {
        if (this.filtersTemplate) {
            let /** @type {?} */ element = this.filterPanelElementRef.nativeElement;
            let /** @type {?} */ forms = element.getElementsByTagName("form");
            return forms && forms.length ? this.serializeToJSON(forms[0]) : {};
        }
        return {};
    }
    /**
     * @return {?}
     */
    resetFilters() {
        if (this.filtersTemplate) {
            let /** @type {?} */ element = this.filterPanelElementRef.nativeElement;
            let /** @type {?} */ forms = element.getElementsByTagName("form");
            if (forms && forms.length) {
                forms[0].reset(); //$('#form_id').trigger("reset");
            }
        }
    }
    /**
     * @return {?}
     */
    filtersPanel() {
        return this.filterPanelElementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    initTools() {
        if (this.toolsPanelElementRef) {
            let /** @type {?} */ $toolsPanel = $(this.toolsPanelElementRef.nativeElement);
            $toolsPanel.children('a.btn-outline').off('mouseleave.tools.dt').on('mouseleave.tools.dt', function (e) {
                $(this).blur();
            });
            this.initFilterTool($toolsPanel);
            this.initFullscreenTool($toolsPanel);
        }
    }
    /**
     * @return {?}
     */
    initActions() {
        if (this.actionsPanelElementRef) {
            let /** @type {?} */ $actionsPanel = $(this.actionsPanelElementRef.nativeElement);
        }
        this.initActionsToolbar(null);
    }
    /**
     * @param {?} $toolPanel
     * @return {?}
     */
    initFilterTool($toolPanel) {
        let /** @type {?} */ $filterBtn = $toolPanel.children('a.filter');
        let /** @type {?} */ $filterPanel = $(this.filterPanelElementRef.nativeElement);
        let /** @type {?} */ $filterBtnIcon = $filterBtn.find('i:last');
        let /** @type {?} */ onclickFilter = (e) =;> {
            if (e)
                e.preventDefault();
            if (e ? $filterPanel.is(':visible') : !$filterPanel.is(':visible')) {
                $filterBtn.removeClass('active').addClass('btn-outline');
                $filterPanel.slideUp(200);
            }
            else {
                $filterBtn.addClass('active').removeClass('btn-outline');
                $filterPanel.slideDown(200);
            }
      }
      $filterBtn.off('click.dt').on('click.dt', onclickFilter);
        onclickFilter(null);
        this.toggleFilter = onclickFilter;
    }
    /**
     * @param {?} $toolPanel
     * @return {?}
     */
    initFullscreenTool($toolPanel) {
        let /** @type {?} */ $fullscreenBtn = $toolPanel.find('a.fullscreen');
        let /** @type {?} */ $fullscreenBtnIcon = $fullscreenBtn.find('i:last');
        let /** @type {?} */ onclickFullscreen = () =;> {
            setTimeout(() => {
                if ($fullscreenBtn.hasClass('on');) {
                    $fullscreenBtnIcon.removeClass('fa-expand').addClass('fa-compress');
                    $fullscreenBtn.addClass('active').removeClass('btn-outline');
                }
                else {
                    $fullscreenBtnIcon.removeClass('fa-compress').addClass('fa-expand');
                    $fullscreenBtn.removeClass('active').addClass('btn-outline');
                }
      },
        100;
      )
      }
      $fullscreenBtn.off('click.dt').on('click.dt', onclickFullscreen);
        onclickFullscreen();
    }
    /**
     * @param {?} $actionsPanel
     * @return {?}
     */
    initActionsToolbar($actionsPanel) {
        console.log(this.actionsTemplate.templateRef.elementRef.nativeElement);
        if (this.datatablesComponent && this.actionsTemplate) {
            let /** @type {?} */ subscription = this.datatablesComponent.toolbar.subscribe((toolbar) => {
                console.log("=" + toolbar);
                $(toolbar).append($(this.actionsTemplate.templateRef.elementRef.nativeElement));
        })
        }
    }
    /**
     * @param {?} templateName
     * @return {?}
     */
    findTemplateFor(templateName) {
        let /** @type {?} */ templates = this.templates != null ? this.templates.filter(template => {
            console.log(template);
            return template.ngxDatatablesTemplate === templateName;
        }) : null;
        if (templates != null && templates.length > 1) {
            console.warn(`Multiple '${templateName}' Column template detected [ignored]`);
        }
        return templates == null || templates.length === 0 ? null : templates[0];
    }
    /**
     * @param {?} form
     * @return {?}
     */
    serializeToJSON(form) {
        var /** @type {?} */ json = {};
        $.each($(form).serializeArray(), function (i, n) {
            var /** @type {?} */ _name = undefined;
            var /** @type {?} */ _ = n.name.indexOf('[');
            if (_ > -1) {
                _name = n.name.replace(/\]/gi, '').split('[');
            }
            else if ((_ = n.name.indexOf('.')) > -1) {
                _name = n.name.split('.');
            }
            if (_ > -1 && _name) {
                var /** @type {?} */ o = json;
                for (var /** @type {?} */ i = 0, /** @type {?} */ len = _name.length; i < len; i++) {
                    if (i == len - 1) {
                        if (o[_name[i]]) {
                            if (typeof o[_name[i]] == 'string' || !o[_name[i]].push) {
                                o[_name[i]] = [o[_name[i]]];
                            }
                            o[_name[i]].push(n.value);
                        }
                        else
                            o[_name[i]] = n.value || '';
                    }
                    else
                        o = o[_name[i]] = o[_name[i]] || {};
                }
            }
            else {
                if (json[n.name] !== undefined) {
                    if (!json[n.name].push) {
                        json[n.name] = [json[n.name]];
                    }
                    json[n.name].push(n.value || '');
                }
                else
                    json[n.name] = n.value || '';
            }
        });
        return json;
    }
}
DatatablesPortletComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-datatables-portlet',
                template: `
    <div class="portlet portlet-datatable">
      <div class="portlet-title">
        <div class="row">
          <div class="caption col-md-6">
            <ng-container [ngTemplateOutlet]="captionTemplate?.templateRef"></ng-container>
            <ng-container *ngIf="!captionTemplate?.templateRef" #defaultCaptionTemplate>
              <i [ngClass]="iconClass ? iconClass :'glyphicon glyphicon-th-list'"></i>
              <span class="caption-subject">{{caption}}</span>
              <span class="caption-helper">{{description}}</span>
            </ng-container>
          </div>

          <div class="actions col-md-6" #toolsPanel>
            <ng-container [ngTemplateOutlet]="toolsTemplate?.templateRef"></ng-container>
            <ng-container *ngIf="!toolsTemplate?.templateRef" #defaultToolsTemplate>
              <a class="btn filter {{filterClass}}" [attr.title]="filterTitle?filterTitle:'Toggle Filters'"
                 href="javascript:">
                <i [ngClass]="filterIconClass ? filterIconClass :'glyphicon glyphicon-filter'"></i>
              </a>
              <a class="btn fullscreen {{fullscreenClass}}"
                 [attr.title]="fullscreenTitle?fullscreenTitle:'Toggle fullscreen'"
                 href="javascript:">
                <i [ngClass]="fullscreenIconClass ? fullscreenIconClass :'glyphicon glyphicon-resize-full'"></i>
              </a>
            </ng-container>
          </div>
        </div>
      </div>
      <div class="portlet-title datatable-filter" style="display:none" #filterPanel>
        <ng-container [ngTemplateOutlet]="filtersTemplate?.templateRef"></ng-container>
      </div>
      <div class="portlet-body">
        <div>
          <ng-container [ngTemplateOutlet]="actionsTemplate?.templateRef"></ng-container>
        </div>

        <ng-content></ng-content>
      </div>
    </div>
  `,
                styles: [`
    /***
    Bootstrap Line Tabs by @keenthemes
    A component of Metronic Theme - #1 Selling Bootstrap 3 Admin Theme in Themeforest: http://j.mp/metronictheme
    Licensed under MIT
    ***/

    /* Portlet */
    .portlet {
      background: #fff;
      padding: 20px;
    }

    .portlet.portlet-gray {
      background: #f7f7f7;
    }

    .portlet.portlet-bordered {
      border: 1px solid #eee;
    }

    /* Portlet Title */
    .portlet-title {
      padding: 0;
      min-height: 40px;
      border-bottom: 1px solid #eee;
      margin-bottom: 18px;
    }

    .caption {
      float: left;
      display: inline-block;
      font-size: 18px;
      line-height: 18px;
    }

    .caption.caption-green .caption-subject,
    .caption.caption-green i {
      color: #4db3a2;
      font-weight: 200;
    }

    .caption.caption-red .caption-subject,
    .caption.caption-red i {
      color: #e26a6a;
      font-weight: 200;
    }

    .caption.caption-purple .caption-subject,
    .caption.caption-purple i {
      color: #8775a7;
      font-weight: 400;
    }

    .caption i {
      color: #777;
      font-size: 15px;
      font-weight: 300;
      margin-top: 3px;
    }

    .caption-subject {
      color: #666;
      font-size: 16px;
      font-weight: 600;
    }

    .caption-helper {
      padding: 0;
      margin: 0;
      line-height: 13px;
      color: #9eacb4;
      font-size: 13px;
      font-weight: 400;
    }

    /* Actions */
    .actions {
      float: right;
      display: inline-block;
    }

    .actions a {
      margin-left: 3px;
    }

    .actions .btn {
      color: #666;
      padding: 3px 9px;
      font-size: 13px;
      line-height: 1.5;
      background-color: #fff;
      border-color: #ccc;
      border-radius: 50px;
    }

    .actions .btn i {
      font-size: 12px;
    }

    .actions .btn:hover {
      background: #f2f2f2;
    }

    /* Pagination */
    .pagination {
      margin: -3px 0 0;
      border-radius: 50px;
    }

    .pagination > li > a,
    .pagination > li > span {
      padding: 4px 10px;
      font-size: 12px;
      color: #8775a7;
      background: #f7f7f7;
    }

    .pagination > li:hover > a,
    .pagination > li.active > a,
    .pagination > li.active:hover > a {
      color: #fff;
      background: #8775a7;
      border-color: #8775a7;
    }

    /* Inputs */
    .inputs {
      float: right;
      display: inline-block;
      padding: 4px 0;
      margin-top: -10px;
    }

    .input-inline {
      width: 240px;
      display: inline-block;
      vertical-align: middle;
    }

    /* Tab */
    .portlet-title > .nav-tabs {
      background: none;
      margin: 0;
      float: right;
      display: inline-block;
      border: 0;
    }

    .portlet-title > .nav-tabs > li {
      background: none;
      margin: 0;
      border: 0;
    }

    .portlet-title > .nav-tabs > li > a {
      background: none;
      border: 0;
      padding: 2px 10px 13px;
      color: #444;
    }

    .portlet-title > .nav-tabs > li.active,
    .portlet-title > .nav-tabs > li.active:hover {
      border-bottom: 4px solid #f3565d;
      position: relative;
    }

    .portlet-title > .nav-tabs > li:hover {
      border-bottom: 4px solid #f29b9f;
    }

    .portlet-title > .nav-tabs > li.active > a,
    .portlet-title > .nav-tabs > li:hover > a {
      color: #333;
      background: #fff;
      border: 0;
    }

    /* Btn Circle */
    .actions .btn.btn-circle {
      width: 28px;
      height: 28px;
      padding: 3px 7px;
      text-align: center;
    }

    .actions .btn.btn-circle i {
      font-size: 11px;
    }

    /* Btn Grey Salsa */
    .actions .btn.grey-salsa {
      border: none;
      margin-left: 3px;
      -webkit-box-shadow: none;
              box-shadow: none;
      border-radius: 50px !important;
    }

    .actions .btn.grey-salsa.active {
      color: #fafcfb;
      background: #8e9bae;
    }

    .actions .grey-salsa.btn:hover,
    .actions .grey-salsa.btn:focus,
    .actions .grey-salsa.btn:active,
    .actions .grey-salsa.btn.active {
      color: #fafcfb;
      background: #97a3b4;
    }

    /* Btn Red */
    .actions .btn.btn-red.active,
    .actions .btn.btn-red:hover {
      color: #fff;
      -webkit-box-shadow: none;
              box-shadow: none;
      background: #e26a6a;
      border-color: #e26a6a;
    }

    /* Btn Red */
    .actions .btn.btn-purple.active,
    .actions .btn.btn-purple:hover {
      color: #fff;
      -webkit-box-shadow: none;
              box-shadow: none;
      background: #8775a7;
      border-color: #8775a7;
    }
  `]
            },] },
];
/**
 * @nocollapse
 */
DatatablesPortletComponent.ctorParameters = () =;> [
    { type: ElementRef, },
];
DatatablesPortletComponent.propDecorators = {
    'toolsPanelElementRef': [{ type: ViewChild, args: ['toolsPanel',] },],
    'actionsPanelElementRef': [{ type: ViewChild, args: ['actionsPanel',] },],
    'filterPanelElementRef': [{ type: ViewChild, args: ['filterPanel',] },],
    'datatablesComponent': [{ type: ContentChild, args: [DatatablesComponent,] },],
    'templates': [{ type: ContentChildren, args: [DatatablesTemplateDirective,] },],
    'caption': [{ type: Input },],
    'description': [{ type: Input },],
    'iconClass': [{ type: Input },],
    'filterClass': [{ type: Input },],
    'filterTitle': [{ type: Input },],
    'filterIconClass': [{ type: Input },],
    'fullscreenClass': [{ type: Input },],
    'fullscreenTitle': [{ type: Input },],
    'fullscreenIconClass': [{ type: Input },],
    'showFullscreenIconClass': [{ type: Input },],
    'hideFullscreenIconClass': [{ type: Input },],
};

class DatatablesModule {
}
DatatablesModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                entryComponents: [DatatablesTemplateComponent],
                exports: [DatatablesColumnComponent, DatatablesTemplateComponent, DatatablesPortletComponent, DatatablesTemplateDirective, DatatablesComponent],
                declarations: [DatatablesColumnComponent, DatatablesTemplateComponent, DatatablesPortletComponent, DatatablesTemplateDirective, DatatablesComponent]
            },] },
];
/**
 * @nocollapse
 */
DatatablesModule.ctorParameters = () =;> [];

/**
 * Generated bundle index. Do not edit.
 */

export { DatatablesModule, DatatablesColumnComponent as ɵb, DatatablesPortletComponent as ɵd, DatatablesTemplateComponent as ɵa, DatatablesTemplateDirective as ɵc, DatatablesComponent as ɵe };
//# sourceMappingURL=ngx-datatables.js.map
