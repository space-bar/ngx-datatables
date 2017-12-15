import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {DatatablesColumnComponent} from '../datatables-column/datatables-column.component';
import {DatatablesTemplateComponent} from '../datatables-template/datatables-template.component';

@Component({
  selector: 'ngx-datatables',
  templateUrl: './datatables.component.html',
  styleUrls: ['./datatables.component.css']
})
export class DatatablesComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked, OnChanges {
  private readonly ROW_SELECTOR_CLASS = 'row-selector';


  @ContentChildren(DatatablesColumnComponent)
  columns: QueryList<DatatablesColumnComponent>;

  @Input()
  selectionMode = 'multiple';

  @Input()
  tableClass: string;

  @Input()
  containerClass: string;

  @Input()
  data: Object[];

  @Input()
  ajax: string | DataTables.AjaxSettings | DataTables.FunctionAjax;

  @Input()
  options: DataTables.Settings;

  private options$: DataTables.Settings;

  private dataListener: Subject<Object[]> = new Subject();

  public dirtyData: boolean;

  @ViewChild('tableElement')
  private tableElementRef: ElementRef;


  private _dataTableApi: DataTables.Api;

  private initListener: Subject<Object> = Subject.create();

  @ViewChild(DatatablesTemplateComponent)
  private datatablesTemplateComponent: DatatablesTemplateComponent;

  @ViewChild('templateContainer', {read: ViewContainerRef})
  private templateViewContainerRef: ViewContainerRef;

  private PRIVATE_SETTINGS = {
    initComplete: (settings: DataTables.SettingsLegacy, json: Object) => {
      this.initListener.next(json);
      if (this.options && $.isFunction(this.options.initComplete)) {
        this.options.initComplete.call(this.dataTableApi, settings, json);
      }
    },
    headerCallback: (thead: Node, data: any[], start: number, end: number, display: any[]) => {
      this.onHeaderCallbackEvent(thead, data, start, end, display);
      if (this.options && $.isFunction(this.options.initComplete)) {
        this.options.initComplete.call(this.dataTableApi, thead, data, start, end, display);
      }
    },
    drawCallback: (settings: DataTables.SettingsLegacy) => {
      this.onDrawCallbackEvent(settings);
      if (this.options && $.isFunction(this.options.initComplete)) {
        this.options.initComplete.call(this.dataTableApi, settings);
      }
    },
    preDrawCallback: (settings: DataTables.SettingsLegacy) => {
      this.onPreDrawCallbackEvent(settings);
      if (this.options && $.isFunction(this.options.initComplete)) {
        this.options.initComplete.call(this.dataTableApi, settings);
      }
    }
  };

  constructor(private elementRef: ElementRef, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  /*
   * lifecycle callback functions
   * */
  ngOnInit() {
    this.dataListener.subscribe((data) => {
      this.dirtyData = true;
      if (data && data.length) {
        this.data = data;
        this.buildTemplateComponent();
      }
    });
    if ($.fn.dataTable && $.fn.dataTable.ext) {
      $.fn.dataTable.ext.errMode = 'throw';
    }
    this.init();
  }

  public ngAfterViewInit(): void {
    this.initDataTable();
  }

  public ngAfterViewChecked(): void {
    this.renderDirtyData();
  }


  ngOnChanges(changes: SimpleChanges) {
    this.dataListener.next(null);
    for (const propName in changes) {
      if (!changes[propName].firstChange) {
        this.init();
        this.initDataTable();
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.dataListener.unsubscribe();
    this.initListener.unsubscribe();
    if (this._dataTableApi) {
      this._dataTableApi.destroy(true);
    }
  }

  /*
   * private init functions
   * */

  private init() {
    this.options$ = {ajax: typeof this.ajax === 'string' ? {url: this.ajax} : this.ajax};
    this.options$ = $.extend(true, this.options$, this.options || {});
    this.options$ = $.extend(true, this.options$, this.PRIVATE_SETTINGS);

    this.options$.serverSide = (this.options$.ajax &&
      (typeof this.options$.ajax === 'string' || this.options$.ajax['url'] || $.isFunction(this.options$.ajax)));
    this.options$.data = this.options$.serverSide ? null : [];
  }

  private initDataTable(): void {
    if (!$ || !$.fn || !$.fn.DataTable) {
      console.log('DataTable not initialized properly');
      console.log('jquery ', $ !== undefined);
      console.log('jquery $.fn', $ && $.fn);
      console.log('jquery $.fn', $ && $.fn && $.fn.DataTable);
      return;
    }
    const tableNode = this.tableElementRef.nativeElement;
    if ($.fn.dataTable.isDataTable(tableNode)) {
      $(tableNode).DataTable().clear().destroy();
    }
    this.options$.columnDefs = this.initColumnDefs();
    this._dataTableApi = $(tableNode).DataTable(this.options$);
    if (this.data && !this.options$.serverSide) {
      setTimeout(() => {
        this._dataTableApi.rows.add(this.data).draw();
      }, 200);
    }
  }

  private renderDirtyData() {
    if (this.dirtyData && this.datatablesTemplateComponent) {
      this.dirtyData = false;
      $('tr', this.datatablesTemplateComponent.nativeElement).each((index, tr) => {
        $('td span', tr).each((cellIndex, td) => {
          const paramIndexes = td.id.split('_');
          if (paramIndexes.length > 3) {
            const row = paramIndexes[3];
            const col = paramIndexes[2];
            if (!isNaN(parseInt(row, 10)) && !isNaN(parseInt(row, 10))) {
              const cell = this.dataTableApi.cell(row, col);
              if (cell) {
                const $cell = $(cell.node());
                $cell.empty();
                $cell.append(td);
              }
            }
          }
        });
      });
    }
  }

  private initSelection(tableApi: DataTables.Api): void {
    tableApi.rows().nodes().$('td.' + this.ROW_SELECTOR_CLASS).each((rowIndex, td) => {
      $('input[type="checkbox"]', td).off('change.dt').on('change.dt', function () {
        const rowSelector = tableApi.row(td)[(<HTMLInputElement>this).checked ? 'select' : 'deselect'];
        if ($.isFunction(rowSelector)) {
          rowSelector();
        }
      });
    });
    const colSelector = tableApi.columns('td.' + this.ROW_SELECTOR_CLASS);
    $.each(colSelector.header(), (index, th: Element) => {
      $('input[type="checkbox"]', th).off('change.dt').on('change.dt', function () {
        const tdCheckboxes = $('input[type="checkbox"]', tableApi.column(th).nodes());
        tdCheckboxes.prop({checked: (<HTMLInputElement>this).checked});
        /*let rowSelector = tableApi.rows(tableApi.column(th).nodes())[this.checked ? 'select' : 'deselect'];
         if ($.isFunction(rowSelector))
         rowSelector();*/
        tdCheckboxes.change();
      });
    });
  }

  private initColumnHeader(thead: Node) {
    this.columns.forEach((item, index, items) => {
      if (item.rowSelector) {
        const th = $('th', thead).eq(index);
        const this_ = this;
        $('input[type="checkbox"]', th).off('change.dt').on('change.dt', function () {
          const tdCheckboxes = $('input[type="checkbox"]', this_.dataTableApi.column(th).nodes());
          tdCheckboxes.prop({checked: (<HTMLInputElement>this).checked});
          /*let rowSelector = tableApi.rows(tableApi.column(th).nodes())[this.checked ? 'select' : 'deselect'];
           if ($.isFunction(rowSelector))
           rowSelector();*/
          tdCheckboxes.change();
        });
      }
    });
  }

  private initColumnDefs(): DataTables.ColumnDefsSettings[] {
    const columnDefs: DataTables.ColumnDefsSettings[] = [];
    this.columns.forEach((item, index, items) => {
      let columnSettings;
      if (this.options && this.options.columns && this.options.columns.length > index) {
        columnSettings = this.options.columns[index];
      }
      let columnDef: DataTables.ColumnDefsSettings = item.buildColumnDefs(columnSettings);
      columnDef = columnDef ? columnDef : <DataTables.ColumnDefsSettings>{};
      columnDef.targets = index;
      if (item.rowSelector) {
        this.buildRowSelectorColumn(columnDef);
      }
      columnDefs.push(columnDef);
    });
    return columnDefs;
  }

  private buildRowSelectorColumn(columnDef: DataTables.ColumnDefsSettings) {
    columnDef.render = function (data: any, type: string, rowData: any, meta: DataTables.CellMetaSettings) {
      if (type !== 'display') {
        return data;
      }
      return `<span class="rowselector-checkbox">
              <input type="checkbox" id="rowselector_${meta.row}_${meta.col}">
            </span>`;
    };

    const this_ = this;
    columnDef.createdCell = (cell: Node, cellData: any, rowData: any, row: number, col: number) => {
      $(cell).addClass(this.ROW_SELECTOR_CLASS).find('input[type="checkbox"]').off('change.dt').on('change.dt', function () {
        const rowSelector = this_.dataTableApi.row($(cell).parent('tr'))[$(this).is(':checked') ? 'select' : 'deselect'];
        if ($.isFunction(rowSelector)) {
          rowSelector();
        }
      });
    };
  }

  private buildTemplateComponent() {
      this.templateViewContainerRef.clear();
      const rendererComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DatatablesTemplateComponent);
      this.datatablesTemplateComponent = this.templateViewContainerRef.createComponent(rendererComponentFactory).instance;
      this.datatablesTemplateComponent.columns = this.columns;
      this.datatablesTemplateComponent.data = this.data;
  }


  /*
   * event functions for datatables callbacks
   * */

  private onPreDrawCallbackEvent(settings: DataTables.SettingsLegacy) {
  }

  private onDrawCallbackEvent(settings: DataTables.SettingsLegacy) {
    const data = this.currentData();
    this.dataListener.next(data);
  }

  private onHeaderCallbackEvent(thead: Node, data: any[], start: number, end: number, display: any[]) {
    this.initColumnHeader(thead);
  }

  private currentData(): Object[] {
    const dataObject = this.dataTableApi.rows({page: 'current'}).data();
    const data = [];
    if (dataObject.length) {
      for (let x = 0; x < dataObject.length; x++) {
        data.push(dataObject[x]);
      }
    }
    return data;
  }

  /*
   * accessor util functions
   * */
  get toolbar(): Observable<Element> {
    return Observable.create((observer: Observer<Element>) => {
        const subscription: Subscription = this.initListener.subscribe(() => {
          observer.next($(this.elementRef.nativeElement).find('div.dataTables_toolbar').get(0));
          observer.complete();
        });
        return () => {
          subscription.unsubscribe();
        };
      }
    );
  }

  set toolbar(toolbarListener: Observable<Element>) {
    const _subscription: Subscription = this.initListener.subscribe(() => {
      const subscription: Subscription = toolbarListener.subscribe((tools: Element) => {
        $(this.elementRef.nativeElement).find('div.dataTables_toolbar').append(tools);
      }, error => {
      }, () => {
        // _subscription.unsubscribe();
      });
      return () => {
        subscription.unsubscribe();
      };
    });
  }

  get dataTableApi(): DataTables.Api {
    return this._dataTableApi || $(this.tableElementRef.nativeElement).DataTable();
  }


  getSelectedRowsCount(): number {
    return this.dataTableApi.rows({selected: true}).count();
  }

  getSelectedRows(): Element[] {
    return this.dataTableApi.rows({selected: true}).to$().toArray();
  }

  isRowSelected(row: Node | JQuery): boolean {
    return this.dataTableApi.rows({selected: true}).$(row).length > 0;
  }

  selectRow(row: Node | JQuery): void {
    if (!this.isRowSelected(row)) {
      const select = this.dataTableApi.rows(row)['select'];
      if ($.isFunction(select)) {
        select();
      }
    }
  }

  deselectRow(row: Node | JQuery): void {
    if (this.isRowSelected(row)) {
      const deselect = this.dataTableApi.rows(row)['deselect'];
      if ($.isFunction(deselect)) {
        deselect();
      }
    }
  }

  selectAllRows(): void {
    const select = this.dataTableApi.rows()['select'];
    if ($.isFunction(select)) {
      select();
    }
  }

  deselectAllRows(): void {
    const deselect = this.dataTableApi.rows()['deselect'];
    if ($.isFunction(deselect)) {
      deselect();
    }
  }

  isServerSide(): boolean {
    return this.dataTableApi.page.info().serverSide;
  }

  reload() {
    if (!this.isServerSide()) {
      this.dataTableApi.draw(true);
    } else {
      this.dataTableApi.clear();
      this.dataTableApi.draw();
    }
  }
}
