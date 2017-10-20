import { Component, ComponentFactoryResolver, ContentChild, ContentChildren, Directive, ElementRef, Input, NgModule, NgZone, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject as Subject$1 } from 'rxjs/Subject';
import { Observable as Observable$1 } from 'rxjs/Observable';
var DatatablesTemplateDirective = (function () {
    /**
     * @param {?} _templateRef
     */
    function DatatablesTemplateDirective(_templateRef) {
        this._templateRef = _templateRef;
    }
    Object.defineProperty(DatatablesTemplateDirective.prototype, "templateRef", {
        /**
         * @return {?}
         */
        get: function () {
            return this._templateRef;
        },
        enumerable: true,
        configurable: true
    });
    return DatatablesTemplateDirective;
}());
DatatablesTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxDatatablesTemplate]'
            },] },
];
/**
 * @nocollapse
 */
DatatablesTemplateDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
]; };
DatatablesTemplateDirective.propDecorators = {
    'ngxDatatablesTemplate': [{ type: Input },],
};
var DatatablesColumnComponent = (function () {
    function DatatablesColumnComponent() {
        this.searchable = true;
        this.visible = true;
    }
    /**
     * @return {?}
     */
    DatatablesColumnComponent.prototype.ngOnInit = function () {
    };
    /**
     * @return {?}
     */
    DatatablesColumnComponent.prototype.ngAfterContentInit = function () {
        if (this.templates != null) {
            this._headerTemplate = this.findTemplateFor('header');
            this._footerTemplate = this.findTemplateFor('footer');
            this._bodyTemplate = this.findTemplateFor('body');
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DatatablesColumnComponent.prototype.ngOnChanges = function (changes) {
    };
    Object.defineProperty(DatatablesColumnComponent.prototype, "headerTemplate", {
        /**
         * @return {?}
         */
        get: function () {
            return this._headerTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatablesColumnComponent.prototype, "footerTemplate", {
        /**
         * @return {?}
         */
        get: function () {
            return this._footerTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatablesColumnComponent.prototype, "bodyTemplate", {
        /**
         * @return {?}
         */
        get: function () {
            return this._bodyTemplate;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} templates
     * @return {?}
     */
    DatatablesColumnComponent.prototype.singularTemplate = function (templates) {
        if (templates != null && templates.length > 1) {
            console.warn("Multiple '" + templates[0].ngxDatatablesTemplate + "' Column template detected [ignored]");
        }
        return templates == null || templates.length === 0 ? null : templates[0];
    };
    /**
     * @param {?} templateName
     * @return {?}
     */
    DatatablesColumnComponent.prototype.findTemplateFor = function (templateName) {
        var /** @type {?} */ templates = this.templates != null ? this.templates.filter(function (template) { return template.ngxDatatablesTemplate === templateName; }) : null;
        if (templates != null && templates.length > 1) {
            console.warn("Multiple '" + templateName + "' Column template detected [ignored]");
        }
        return templates == null || templates.length === 0 ? null : templates[0];
    };
    /**
     * @return {?}
     */
    DatatablesColumnComponent.prototype.buildColumnDefs = function () {
        var /** @type {?} */ columnDefs = ({});
        columnDefs.searchable = this.searchable;
        columnDefs.title = this.title;
        columnDefs.visible = this.visible;
        columnDefs.width = this.width;
        columnDefs.orderable = (typeof this.orderable === 'undefined' && this.rowSelector) ? false : this.orderable;
        columnDefs.data = this.field;
        return columnDefs;
    };
    return DatatablesColumnComponent;
}());
DatatablesColumnComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-datatables-column',
                template: "\n\n  ",
                styles: ["\n\n  "]
            },] },
];
/**
 * @nocollapse
 */
DatatablesColumnComponent.ctorParameters = function () { return []; };
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
var DatatablesTemplateComponent = (function () {
    /**
     * @param {?} elementRef
     * @param {?} viewContainerRef
     * @param {?} componentFactoryResolver
     */
    function DatatablesTemplateComponent(elementRef, viewContainerRef, componentFactoryResolver) {
        this.elementRef = elementRef;
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    /**
     * @return {?}
     */
    DatatablesTemplateComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(DatatablesTemplateComponent.prototype, "nativeElement", {
        /**
         * @return {?}
         */
        get: function () {
            return this.elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} data
     * @param {?=} columns
     * @return {?}
     */
    DatatablesTemplateComponent.prototype.buildTemplateComponent = function (data, columns) {
        this.viewContainerRef.clear();
        var /** @type {?} */ rendererComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DatatablesTemplateComponent);
        var /** @type {?} */ datatablesTemplateComponent = (this.viewContainerRef.createComponent(rendererComponentFactory).instance);
        datatablesTemplateComponent.columns = columns;
        datatablesTemplateComponent.data = data;
        return datatablesTemplateComponent;
    };
    return DatatablesTemplateComponent;
}());
DatatablesTemplateComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-datatables-template',
                template: "\n    <tr *ngFor=\"let rowData of data;let rowIndex = index\">\n\n      <td *ngFor=\"let column of columns;let colIndex=index\"\n          [ngClass]=\"{'row-selector':(column.bodyTemplate ? 1 : (column.rowSelector ? 2 : 0))==2}\">\n\n        <ng-container [ngSwitch]=\"column.bodyTemplate ? 1 : (column.rowSelector ? 2 : 0)\">\n              <span *ngSwitchCase=\"1\" id=\"_1_{{colIndex}}_{{rowIndex}}\">\n                  <ng-container [ngTemplateOutlet]=\"column.bodyTemplate?.templateRef\"\n                                [ngTemplateOutletContext]=\"{$implicit:{rowData:rowData,data:rowData,rowIndex:rowIndex,columnIndex:colIndex}}\"\n                                #bodyTemplate></ng-container>\n              </span>\n\n        </ng-container>\n      </td>\n    </tr>\n  ",
                styles: ["\n\n  "]
            },] },
];
/**
 * @nocollapse
 */
DatatablesTemplateComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
]; };
DatatablesTemplateComponent.propDecorators = {
    'columns': [{ type: Input },],
    'data': [{ type: Input },],
};
var DatatablesComponent = (function () {
    /**
     * @param {?} elementRef
     * @param {?} zone
     * @param {?} componentFactoryResolver
     */
    function DatatablesComponent(elementRef, zone, componentFactoryResolver) {
        var _this = this;
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
            initComplete: function (settings, json) {
                _this.initListener.next(json);
            },
            headerCallback: function (thead, data, start, end, display) {
                _this.onHeaderCallbackEvent(thead, data, start, end, display);
            },
            drawCallback: function (settings) {
                _this.onDrawCallbackEvent(settings);
            },
            preDrawCallback: function (settings) {
                _this.onPreDrawCallbackEvent(settings);
            },
            language: {
                //processing: '<span class="fa fa-spinner fa-pulse fa-spin dataTables_processing"></span> loading...',
                lengthMenu: "Records Per Page: _MENU_"
            }
        };
        this.PRIVATE_SETTINGS = {
            initComplete: function (settings, json) {
                _this.initListener.next(json);
                if (_this.options && $.isFunction(_this.options.initComplete))
                    _this.options.initComplete.call(_this.dataTableApi, settings, json);
            },
            headerCallback: function (thead, data, start, end, display) {
                _this.onHeaderCallbackEvent(thead, data, start, end, display);
                if (_this.options && $.isFunction(_this.options.initComplete))
                    _this.options.initComplete.call(_this.dataTableApi, thead, data, start, end, display);
            },
            drawCallback: function (settings) {
                _this.onDrawCallbackEvent(settings);
                if (_this.options && $.isFunction(_this.options.initComplete))
                    _this.options.initComplete.call(_this.dataTableApi, settings);
            },
            preDrawCallback: function (settings) {
                _this.onPreDrawCallbackEvent(settings);
                if (_this.options && $.isFunction(_this.options.initComplete))
                    _this.options.initComplete.call(_this.dataTableApi, settings);
            }
        };
    }
    /**
     * @return {?}
     */
    DatatablesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataListener.subscribe(function (data) {
            _this.dirtyData = true;
            if (data && data.length) {
                _this.data = data;
                _this.buildTemplateComponent();
            }
        });
        if ($.fn['dataTable'] && $.fn['dataTable'].ext) {
            $.fn['dataTable'].ext.errMode = function (settings, helpPage, message) {
                console.log(message);
            };
        }
        this.init();
    };
    /**
     * @return {?}
     */
    DatatablesComponent.prototype.ngAfterViewInit = function () {
        this.initDataTable();
    };
    /**
     * @return {?}
     */
    DatatablesComponent.prototype.ngAfterViewChecked = function () {
        this.renderDirtyData();
    };
    /**
     * @return {?}
     */
    DatatablesComponent.prototype.ngAfterContentInit = function () {
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DatatablesComponent.prototype.ngOnChanges = function (changes) {
        this.dataListener.next(null);
        for (var /** @type {?} */ propName in changes) {
            if (!changes[propName].firstChange) {
                this.init();
                this.initDataTable();
                break;
            }
        }
    };
    /**
     * @return {?}
     */
    DatatablesComponent.prototype.ngOnDestroy = function () {
        this.dataListener.unsubscribe();
        this.initListener.unsubscribe();
    };
    /**
     * @return {?}
     */
    DatatablesComponent.prototype.init = function () {
        var /** @type {?} */ defaultSettings = Object.assign({}, this.DEFAULT_SETTINGS);
        if (this.hideSearchInput) {
            defaultSettings.dom = this.NO_SEARCH_INPUT_DOM;
        }
        this.options$ = $.extend(true, defaultSettings, { ajax: typeof this.ajaxOptions == 'string' ? { url: this.ajaxOptions } : this.ajaxOptions });
        this.options$ = $.extend(true, this.options$, this.options || {});
        this.options$ = $.extend(true, this.options$, this.PRIVATE_SETTINGS);
        this.options$.serverSide = (this.options$.ajax && (typeof this.options$.ajax == 'string' || this.options$.ajax['url'] || $.isFunction(this.options$.ajax)));
        this.options$.data = this.options$.serverSide ? null : [];
    };
    /**
     * @return {?}
     */
    DatatablesComponent.prototype.initDataTable = function () {
        var _this = this;
        var /** @type {?} */ tableNode = this.tableElementRef.nativeElement;
        if (!$.fn.DataTable['isDataTable'](tableNode)) {
            $(tableNode).DataTable().destroy();
        }
        this.options$.columnDefs = this.initColumnDefs();
        this._dataTableApi = $(tableNode).DataTable(this.options$);
        if (this.data && !this.options$.serverSide) {
            setTimeout(function () {
                _this._dataTableApi.rows.add(_this.data).draw();
            }, 200);
        }
    };
    /**
     * @return {?}
     */
    DatatablesComponent.prototype.renderDirtyData = function () {
        var _this = this;
        if (this.dirtyData && this.datatablesTemplateComponent) {
            this.dirtyData = false;
            $('tr', this.datatablesTemplateComponent.nativeElement).each(function (index, tr) {
                $('td span', tr).each(function (cellIndex, td) {
                    var /** @type {?} */ paramIndexes = td.id.split("_");
                    console.log(paramIndexes);
                    if (paramIndexes.length > 3) {
                        var /** @type {?} */ row = paramIndexes[3];
                        var /** @type {?} */ col = paramIndexes[2];
                        if (!isNaN(parseInt(row)) && !isNaN(parseInt(row))) {
                            var /** @type {?} */ cell = _this.dataTableApi.cell(row, col);
                            if (cell) {
                                var /** @type {?} */ $cell = $(cell.node());
                                $cell.empty();
                                $cell.append(td);
                            }
                        }
                    }
                });
            });
        }
    };
    /**
     * @param {?} tableApi
     * @return {?}
     */
    DatatablesComponent.prototype.initSelection = function (tableApi) {
        tableApi.rows().nodes().$('td.' + this.ROW_SELECTOR_CLASS).each(function (rowIndex, td) {
            $('input[type="checkbox"]', td).off('change.dt').on('change.dt', function () {
                var /** @type {?} */ rowSelector = tableApi.row(td)[((this)).checked ? 'select' : 'deselect'];
                if ($.isFunction(rowSelector))
                    rowSelector();
            });
        });
        var /** @type {?} */ colSelector = tableApi.columns('td.' + this.ROW_SELECTOR_CLASS);
        $.each(colSelector.header(), function (index, th) {
            $('input[type="checkbox"]', th).off('change.dt').on('change.dt', function () {
                var /** @type {?} */ tdCheckboxes = $('input[type="checkbox"]', tableApi.column(th).nodes());
                tdCheckboxes.prop({ checked: ((this)).checked });
                /*let rowSelector = tableApi.rows(tableApi.column(th).nodes())[this.checked ? 'select' : 'deselect'];
                 if ($.isFunction(rowSelector))
                 rowSelector();*/
                tdCheckboxes.change();
            });
        });
    };
    /**
     * @param {?} thead
     * @return {?}
     */
    DatatablesComponent.prototype.initColumnHeader = function (thead) {
        var _this = this;
        this.columns.forEach(function (item, index, items) {
            if (item.rowSelector) {
                var /** @type {?} */ th_1 = $('th', thead).eq(index);
                var /** @type {?} */ this_1 = _this;
                $('input[type="checkbox"]', th_1).off('change.dt').on('change.dt', function () {
                    var /** @type {?} */ tdCheckboxes = $('input[type="checkbox"]', this_1.dataTableApi.column(th_1).nodes());
                    tdCheckboxes.prop({ checked: ((this)).checked });
                    /*let rowSelector = tableApi.rows(tableApi.column(th).nodes())[this.checked ? 'select' : 'deselect'];
                     if ($.isFunction(rowSelector))
                     rowSelector();*/
                    tdCheckboxes.change();
                });
            }
        });
    };
    /**
     * @return {?}
     */
    DatatablesComponent.prototype.initColumnDefs = function () {
        var _this = this;
        var /** @type {?} */ columnDefs = [];
        this.columns.forEach(function (item, index, items) {
            var /** @type {?} */ columnDef = item.buildColumnDefs();
            columnDef = columnDef ? columnDef : ({});
            columnDef.targets = index;
            if (item.rowSelector) {
                _this.buildRowSelectorColumn(columnDef);
            }
            columnDefs.push(columnDef);
        });
        return columnDefs;
    };
    /**
     * @param {?} columnDef
     * @return {?}
     */
    DatatablesComponent.prototype.buildRowSelectorColumn = function (columnDef) {
        var _this = this;
        columnDef.render = function (data, type, rowData, meta) {
            if (type !== 'display')
                return data;
            return "<span class=\"md-checkbox\">\n             <input type=\"checkbox\" id=\"rowselector_" + meta.col + "_" + meta.row + "\" class=\"md-check\">\n           <label for=\"rowselector_" + meta.col + "_" + meta.row + "\">\n              <span></span>\n              <span class=\"check\"></span>\n              <span class=\"box\"></span>\n            </label>\n        </span>";
        };
        var /** @type {?} */ this_ = this;
        columnDef.createdCell = function (cell, cellData, rowData, row, col) {
            $(cell).addClass(_this.ROW_SELECTOR_CLASS).find('input[type="checkbox"]').off('change.dt').on('change.dt', function () {
                var /** @type {?} */ rowSelector = this_.dataTableApi.row($(cell).parent('tr'))[$(this).is(':checked') ? 'select' : 'deselect'];
                if ($.isFunction(rowSelector))
                    rowSelector();
            });
        };
    };
    /**
     * @return {?}
     */
    DatatablesComponent.prototype.buildTemplateComponent = function () {
        this.templateViewContainerRef.clear();
        var /** @type {?} */ rendererComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DatatablesTemplateComponent);
        this.datatablesTemplateComponent = this.templateViewContainerRef.createComponent(rendererComponentFactory).instance;
        this.datatablesTemplateComponent.columns = this.columns;
        this.datatablesTemplateComponent.data = this.data;
    };
    /**
     * @param {?} settings
     * @return {?}
     */
    DatatablesComponent.prototype.onPreDrawCallbackEvent = function (settings) {
    };
    /**
     * @param {?} settings
     * @return {?}
     */
    DatatablesComponent.prototype.onDrawCallbackEvent = function (settings) {
        var /** @type {?} */ data = this.currentData();
        this.dataListener.next(data);
    };
    /**
     * @param {?} thead
     * @param {?} data
     * @param {?} start
     * @param {?} end
     * @param {?} display
     * @return {?}
     */
    DatatablesComponent.prototype.onHeaderCallbackEvent = function (thead, data, start, end, display) {
        this.initColumnHeader(thead);
    };
    /**
     * @return {?}
     */
    DatatablesComponent.prototype.currentData = function () {
        var /** @type {?} */ dataObject = this.dataTableApi.rows({ page: 'current' }).data();
        var /** @type {?} */ data = [];
        if (dataObject.length) {
            for (var /** @type {?} */ x = 0; x < dataObject.length; x++) {
                data.push(dataObject[x]);
            }
        }
        return data;
    };
    Object.defineProperty(DatatablesComponent.prototype, "toolbar", {
        /**
         * @return {?}
         */
        get: function () {
            var _this = this;
            return Observable$1.create(function (observer) {
                var /** @type {?} */ subscription = _this.initListener.subscribe(function () {
                    observer.next($(_this.elementRef.nativeElement).find('div.dataTables_toolbar').get(0));
                    observer.complete();
                });
                return function () {
                    subscription.unsubscribe();
                };
            });
        },
        /**
         * @param {?} toolbarListener
         * @return {?}
         */
        set: function (toolbarListener) {
            var _this = this;
            var /** @type {?} */ _subscription = this.initListener.subscribe(function () {
                var /** @type {?} */ subscription = toolbarListener.subscribe(function (tools) {
                    $(_this.elementRef.nativeElement).find('div.dataTables_toolbar').append(tools);
                }, function (error) {
                }, function () {
                    //_subscription.unsubscribe();
                });
                return function () {
                    subscription.unsubscribe();
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatablesComponent.prototype, "dataTableApi", {
        /**
         * @return {?}
         */
        get: function () {
            return this._dataTableApi || $(this.tableElementRef.nativeElement).DataTable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatatablesComponent.prototype.getSelectedRowsCount = function () {
        return this.dataTableApi.rows({ selected: true }).count();
    };
    /**
     * @return {?}
     */
    DatatablesComponent.prototype.getSelectedRows = function () {
        return this.dataTableApi.rows({ selected: true }).to$().toArray();
    };
    /**
     * @param {?} row
     * @return {?}
     */
    DatatablesComponent.prototype.isRowSelected = function (row) {
        return this.dataTableApi.rows({ selected: true }).$(row).length > 0;
    };
    /**
     * @param {?} row
     * @return {?}
     */
    DatatablesComponent.prototype.selectRow = function (row) {
        if (!this.isRowSelected(row)) {
            var /** @type {?} */ select = this.dataTableApi.rows(row)['select'];
            if ($.isFunction(select)) {
                select();
            }
        }
    };
    /**
     * @param {?} row
     * @return {?}
     */
    DatatablesComponent.prototype.deselectRow = function (row) {
        if (this.isRowSelected(row)) {
            var /** @type {?} */ deselect = this.dataTableApi.rows(row)['deselect'];
            if ($.isFunction(deselect)) {
                deselect();
            }
        }
    };
    /**
     * @return {?}
     */
    DatatablesComponent.prototype.selectAllRows = function () {
        var /** @type {?} */ select = this.dataTableApi.rows()['select'];
        if ($.isFunction(select)) {
            select();
        }
    };
    /**
     * @return {?}
     */
    DatatablesComponent.prototype.deselectAllRows = function () {
        var /** @type {?} */ deselect = this.dataTableApi.rows()['deselect'];
        if ($.isFunction(deselect)) {
            deselect();
        }
    };
    /**
     * @return {?}
     */
    DatatablesComponent.prototype.isServerSide = function () {
        return this.dataTableApi.page.info().serverSide;
    };
    /**
     * @return {?}
     */
    DatatablesComponent.prototype.reload = function () {
        if (!this.isServerSide()) {
            this.dataTableApi.draw(true);
        }
        else {
            this.dataTableApi.clear();
            this.dataTableApi.draw();
        }
    };
    return DatatablesComponent;
}());
DatatablesComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-datatables',
                template: "\n    <div class=\"table-container datatable-container {{containerClass}}\">\n\n      <table class=\"table table-striped table-bordered table-hover table-checkable {{tableClass}}\" #tableElement>\n        <thead>\n        <tr role=\"row\" class=\"heading\">\n          <th *ngFor=\"let column of columns;let colIndex = index\"\n              [ngClass]=\"{'row-selector selector':(column.bodyTemplate ? 1 : (column.rowSelector ? 2 : 0))==2}\">\n\n            <ng-container [ngSwitch]=\"column.headerTemplate ? 1 : (column.rowSelector ? 2 : 0)\">\n              <ng-container *ngSwitchCase=\"1\"\n                            [ngTemplateOutlet]=\"column.headerTemplate?.templateRef\"\n                            [ngTemplateOutletContext]=\"{$implicit:{column:column}}\"\n                            #headerTemplate></ng-container>\n\n              <span *ngSwitchCase=\"2\">\n                <span class=\"md-checkbox\">\n                  <input type=\"checkbox\" id=\"rowselector_{{colIndex}}\" class=\"md-check\">\n                  <label for=\"rowselector_{{colIndex}}\">\n                    <span></span>\n                    <span class=\"check\"></span>\n                    <span class=\"box\"></span>\n                  </label>\n                </span>\n              </span>\n\n              <span *ngSwitchDefault>{{column.header}}</span>\n            </ng-container>\n\n          </th>\n        </tr>\n\n        </thead>\n        <tbody>\n\n        </tbody>\n\n      </table>\n\n      <ng-container #templateContainer>\n\n      </ng-container>\n\n    </div>\n  ",
                styles: ["\n\n  "]
            },] },
];
/**
 * @nocollapse
 */
DatatablesComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: NgZone, },
    { type: ComponentFactoryResolver, },
]; };
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
var DatatablesPortletComponent = (function () {
    /**
     * @param {?} elementRef
     */
    function DatatablesPortletComponent(elementRef) {
        this.elementRef = elementRef;
        this.toggleFilter = function () {
        };
    }
    /**
     * @return {?}
     */
    DatatablesPortletComponent.prototype.ngOnInit = function () {
    };
    /**
     * @return {?}
     */
    DatatablesPortletComponent.prototype.ngAfterViewInit = function () {
        this.initTools();
    };
    /**
     * @return {?}
     */
    DatatablesPortletComponent.prototype.ngAfterContentInit = function () {
        if (this.templates) {
            this.actionsTemplate = this.findTemplateFor('actions');
            this.filtersTemplate = this.findTemplateFor('filters');
            this.toolsTemplate = this.findTemplateFor('tools');
            this.captionTemplate = this.findTemplateFor('caption');
            if (this.actionsTemplate)
                this.initActions();
        }
    };
    Object.defineProperty(DatatablesPortletComponent.prototype, "filtersData", {
        /**
         * @return {?}
         */
        get: function () {
            if (this.filtersTemplate) {
                var /** @type {?} */ element = this.filtersTemplate.templateRef.elementRef.nativeElement;
                var /** @type {?} */ forms = element.getElementsByTagName("form");
                return forms && forms.length ? this.serializeToJSON(forms[0]) : {};
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatatablesPortletComponent.prototype.filters = function () {
        if (this.filtersTemplate) {
            var /** @type {?} */ element = this.filterPanelElementRef.nativeElement;
            var /** @type {?} */ forms = element.getElementsByTagName("form");
            return forms && forms.length ? this.serializeToJSON(forms[0]) : {};
        }
        return {};
    };
    /**
     * @return {?}
     */
    DatatablesPortletComponent.prototype.resetFilters = function () {
        if (this.filtersTemplate) {
            var /** @type {?} */ element = this.filterPanelElementRef.nativeElement;
            var /** @type {?} */ forms = element.getElementsByTagName("form");
            if (forms && forms.length) {
                forms[0].reset(); //$('#form_id').trigger("reset");
            }
        }
    };
    /**
     * @return {?}
     */
    DatatablesPortletComponent.prototype.filtersPanel = function () {
        return this.filterPanelElementRef.nativeElement;
    };
    /**
     * @return {?}
     */
    DatatablesPortletComponent.prototype.initTools = function () {
        if (this.toolsPanelElementRef) {
            var /** @type {?} */ $toolsPanel = $(this.toolsPanelElementRef.nativeElement);
            $toolsPanel.children('a.btn-outline').off('mouseleave.tools.dt').on('mouseleave.tools.dt', function (e) {
                $(this).blur();
            });
            this.initFilterTool($toolsPanel);
            this.initFullscreenTool($toolsPanel);
        }
    };
    /**
     * @return {?}
     */
    DatatablesPortletComponent.prototype.initActions = function () {
        if (this.actionsPanelElementRef) {
            var /** @type {?} */ $actionsPanel = $(this.actionsPanelElementRef.nativeElement);
        }
        this.initActionsToolbar(null);
    };
    /**
     * @param {?} $toolPanel
     * @return {?}
     */
    DatatablesPortletComponent.prototype.initFilterTool = function ($toolPanel) {
        var /** @type {?} */ $filterBtn = $toolPanel.children('a.filter');
        var /** @type {?} */ $filterPanel = $(this.filterPanelElementRef.nativeElement);
        var /** @type {?} */ $filterBtnIcon = $filterBtn.find('i:last');
        var /** @type {?} */ onclickFilter = function (e) {
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
        };
        $filterBtn.off('click.dt').on('click.dt', onclickFilter);
        onclickFilter(null);
        this.toggleFilter = onclickFilter;
    };
    /**
     * @param {?} $toolPanel
     * @return {?}
     */
    DatatablesPortletComponent.prototype.initFullscreenTool = function ($toolPanel) {
        var /** @type {?} */ $fullscreenBtn = $toolPanel.find('a.fullscreen');
        var /** @type {?} */ $fullscreenBtnIcon = $fullscreenBtn.find('i:last');
        var /** @type {?} */ onclickFullscreen = function () {
            setTimeout(function () {
                if ($fullscreenBtn.hasClass('on')) {
                    $fullscreenBtnIcon.removeClass('fa-expand').addClass('fa-compress');
                    $fullscreenBtn.addClass('active').removeClass('btn-outline');
                }
                else {
                    $fullscreenBtnIcon.removeClass('fa-compress').addClass('fa-expand');
                    $fullscreenBtn.removeClass('active').addClass('btn-outline');
                }
            }, 100);
        };
        $fullscreenBtn.off('click.dt').on('click.dt', onclickFullscreen);
        onclickFullscreen();
    };
    /**
     * @param {?} $actionsPanel
     * @return {?}
     */
    DatatablesPortletComponent.prototype.initActionsToolbar = function ($actionsPanel) {
        var _this = this;
        console.log(this.actionsTemplate.templateRef.elementRef.nativeElement);
        if (this.datatablesComponent && this.actionsTemplate) {
            var /** @type {?} */ subscription = this.datatablesComponent.toolbar.subscribe(function (toolbar) {
                console.log("=" + toolbar);
                $(toolbar).append($(_this.actionsTemplate.templateRef.elementRef.nativeElement));
            });
        }
    };
    /**
     * @param {?} templateName
     * @return {?}
     */
    DatatablesPortletComponent.prototype.findTemplateFor = function (templateName) {
        var /** @type {?} */ templates = this.templates != null ? this.templates.filter(function (template) {
            console.log(template);
            return template.ngxDatatablesTemplate === templateName;
        }) : null;
        if (templates != null && templates.length > 1) {
            console.warn("Multiple '" + templateName + "' Column template detected [ignored]");
        }
        return templates == null || templates.length === 0 ? null : templates[0];
    };
    /**
     * @param {?} form
     * @return {?}
     */
    DatatablesPortletComponent.prototype.serializeToJSON = function (form) {
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
    };
    return DatatablesPortletComponent;
}());
DatatablesPortletComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-datatables-portlet',
                template: "\n    <div class=\"portlet portlet-datatable\">\n      <div class=\"portlet-title\">\n        <div class=\"row\">\n          <div class=\"caption col-md-6\">\n            <ng-container [ngTemplateOutlet]=\"captionTemplate?.templateRef\"></ng-container>\n            <ng-container *ngIf=\"!captionTemplate?.templateRef\" #defaultCaptionTemplate>\n              <i [ngClass]=\"iconClass ? iconClass :'glyphicon glyphicon-th-list'\"></i>\n              <span class=\"caption-subject\">{{caption}}</span>\n              <span class=\"caption-helper\">{{description}}</span>\n            </ng-container>\n          </div>\n\n          <div class=\"actions col-md-6\" #toolsPanel>\n            <ng-container [ngTemplateOutlet]=\"toolsTemplate?.templateRef\"></ng-container>\n            <ng-container *ngIf=\"!toolsTemplate?.templateRef\" #defaultToolsTemplate>\n              <a class=\"btn filter {{filterClass}}\" [attr.title]=\"filterTitle?filterTitle:'Toggle Filters'\"\n                 href=\"javascript:\">\n                <i [ngClass]=\"filterIconClass ? filterIconClass :'glyphicon glyphicon-filter'\"></i>\n              </a>\n              <a class=\"btn fullscreen {{fullscreenClass}}\"\n                 [attr.title]=\"fullscreenTitle?fullscreenTitle:'Toggle fullscreen'\"\n                 href=\"javascript:\">\n                <i [ngClass]=\"fullscreenIconClass ? fullscreenIconClass :'glyphicon glyphicon-resize-full'\"></i>\n              </a>\n            </ng-container>\n          </div>\n        </div>\n      </div>\n      <div class=\"portlet-title datatable-filter\" style=\"display:none\" #filterPanel>\n        <ng-container [ngTemplateOutlet]=\"filtersTemplate?.templateRef\"></ng-container>\n      </div>\n      <div class=\"portlet-body\">\n        <div>\n          <ng-container [ngTemplateOutlet]=\"actionsTemplate?.templateRef\"></ng-container>\n        </div>\n\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
                styles: ["\n    /***\n    Bootstrap Line Tabs by @keenthemes\n    A component of Metronic Theme - #1 Selling Bootstrap 3 Admin Theme in Themeforest: http://j.mp/metronictheme\n    Licensed under MIT\n    ***/\n\n    /* Portlet */\n    .portlet {\n      background: #fff;\n      padding: 20px;\n    }\n\n    .portlet.portlet-gray {\n      background: #f7f7f7;\n    }\n\n    .portlet.portlet-bordered {\n      border: 1px solid #eee;\n    }\n\n    /* Portlet Title */\n    .portlet-title {\n      padding: 0;\n      min-height: 40px;\n      border-bottom: 1px solid #eee;\n      margin-bottom: 18px;\n    }\n\n    .caption {\n      float: left;\n      display: inline-block;\n      font-size: 18px;\n      line-height: 18px;\n    }\n\n    .caption.caption-green .caption-subject,\n    .caption.caption-green i {\n      color: #4db3a2;\n      font-weight: 200;\n    }\n\n    .caption.caption-red .caption-subject,\n    .caption.caption-red i {\n      color: #e26a6a;\n      font-weight: 200;\n    }\n\n    .caption.caption-purple .caption-subject,\n    .caption.caption-purple i {\n      color: #8775a7;\n      font-weight: 400;\n    }\n\n    .caption i {\n      color: #777;\n      font-size: 15px;\n      font-weight: 300;\n      margin-top: 3px;\n    }\n\n    .caption-subject {\n      color: #666;\n      font-size: 16px;\n      font-weight: 600;\n    }\n\n    .caption-helper {\n      padding: 0;\n      margin: 0;\n      line-height: 13px;\n      color: #9eacb4;\n      font-size: 13px;\n      font-weight: 400;\n    }\n\n    /* Actions */\n    .actions {\n      float: right;\n      display: inline-block;\n    }\n\n    .actions a {\n      margin-left: 3px;\n    }\n\n    .actions .btn {\n      color: #666;\n      padding: 3px 9px;\n      font-size: 13px;\n      line-height: 1.5;\n      background-color: #fff;\n      border-color: #ccc;\n      border-radius: 50px;\n    }\n\n    .actions .btn i {\n      font-size: 12px;\n    }\n\n    .actions .btn:hover {\n      background: #f2f2f2;\n    }\n\n    /* Pagination */\n    .pagination {\n      margin: -3px 0 0;\n      border-radius: 50px;\n    }\n\n    .pagination > li > a,\n    .pagination > li > span {\n      padding: 4px 10px;\n      font-size: 12px;\n      color: #8775a7;\n      background: #f7f7f7;\n    }\n\n    .pagination > li:hover > a,\n    .pagination > li.active > a,\n    .pagination > li.active:hover > a {\n      color: #fff;\n      background: #8775a7;\n      border-color: #8775a7;\n    }\n\n    /* Inputs */\n    .inputs {\n      float: right;\n      display: inline-block;\n      padding: 4px 0;\n      margin-top: -10px;\n    }\n\n    .input-inline {\n      width: 240px;\n      display: inline-block;\n      vertical-align: middle;\n    }\n\n    /* Tab */\n    .portlet-title > .nav-tabs {\n      background: none;\n      margin: 0;\n      float: right;\n      display: inline-block;\n      border: 0;\n    }\n\n    .portlet-title > .nav-tabs > li {\n      background: none;\n      margin: 0;\n      border: 0;\n    }\n\n    .portlet-title > .nav-tabs > li > a {\n      background: none;\n      border: 0;\n      padding: 2px 10px 13px;\n      color: #444;\n    }\n\n    .portlet-title > .nav-tabs > li.active,\n    .portlet-title > .nav-tabs > li.active:hover {\n      border-bottom: 4px solid #f3565d;\n      position: relative;\n    }\n\n    .portlet-title > .nav-tabs > li:hover {\n      border-bottom: 4px solid #f29b9f;\n    }\n\n    .portlet-title > .nav-tabs > li.active > a,\n    .portlet-title > .nav-tabs > li:hover > a {\n      color: #333;\n      background: #fff;\n      border: 0;\n    }\n\n    /* Btn Circle */\n    .actions .btn.btn-circle {\n      width: 28px;\n      height: 28px;\n      padding: 3px 7px;\n      text-align: center;\n    }\n\n    .actions .btn.btn-circle i {\n      font-size: 11px;\n    }\n\n    /* Btn Grey Salsa */\n    .actions .btn.grey-salsa {\n      border: none;\n      margin-left: 3px;\n      -webkit-box-shadow: none;\n              box-shadow: none;\n      border-radius: 50px !important;\n    }\n\n    .actions .btn.grey-salsa.active {\n      color: #fafcfb;\n      background: #8e9bae;\n    }\n\n    .actions .grey-salsa.btn:hover,\n    .actions .grey-salsa.btn:focus,\n    .actions .grey-salsa.btn:active,\n    .actions .grey-salsa.btn.active {\n      color: #fafcfb;\n      background: #97a3b4;\n    }\n\n    /* Btn Red */\n    .actions .btn.btn-red.active,\n    .actions .btn.btn-red:hover {\n      color: #fff;\n      -webkit-box-shadow: none;\n              box-shadow: none;\n      background: #e26a6a;\n      border-color: #e26a6a;\n    }\n\n    /* Btn Red */\n    .actions .btn.btn-purple.active,\n    .actions .btn.btn-purple:hover {\n      color: #fff;\n      -webkit-box-shadow: none;\n              box-shadow: none;\n      background: #8775a7;\n      border-color: #8775a7;\n    }\n  "]
            },] },
];
/**
 * @nocollapse
 */
DatatablesPortletComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
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
var DatatablesModule = (function () {
    function DatatablesModule() {
    }
    return DatatablesModule;
}());
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
DatatablesModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { DatatablesModule, DatatablesColumnComponent as ɵb, DatatablesPortletComponent as ɵd, DatatablesTemplateComponent as ɵa, DatatablesTemplateDirective as ɵc, DatatablesComponent as ɵe };
//# sourceMappingURL=ngx-datatables.es5.js.map
