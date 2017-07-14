import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ContentChildren,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {DatatablesColumnComponent} from "../datatables-column/datatables-column.component";
import {DatatablesTemplateComponent} from "../datatables-template/datatables-template.component";

@Component({
  selector: 'ngx-datatables',
  templateUrl: './datatables.component.html',
  styleUrls: ['./datatables.component.css']
})
export class DatatablesComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit, AfterViewChecked, OnChanges {
  private readonly ROW_SELECTOR_CLASS = "row-selector";

  @ContentChildren(DatatablesColumnComponent)
  columns: QueryList<DatatablesColumnComponent>;

  @Input()
  selectionMode: string = "multiple";

  @Input("data")
  data: Object[];

  @Input("ajax")
  ajaxOptions: string | DataTables.AjaxSettings | DataTables.FunctionAjax;

  private dataListener: Subject<Object[]> = new Subject();

  public dirtyData: boolean;

  @ViewChild("tableElement")
  private tableElementRef: ElementRef;

  private options: DataTables.Settings;

  private _dataTableApi: DataTables.Api;

  private initListener: Subject<Object> = Subject.create();

  @ViewChild(DatatablesTemplateComponent)
  private datatablesTemplateComponent: DatatablesTemplateComponent;

  @ViewChild("templateContainer", {read: ViewContainerRef})
  private templateViewContainerRef: ViewContainerRef;

  /*private _changeDetectionRef: ChangeDetectorRef, private applicationRef: ApplicationRef
   , private viewContainer: ViewContainerRef,*/
  constructor(private elementRef: ElementRef, private zone: NgZone, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  /*
   * lifecyscle callback functions
   * */
  ngOnInit() {
    this.dataListener.subscribe((data) => {
      this.dirtyData = true;
      if (data && data.length) {
        this.data = data;
        setTimeout(() => {
          this.buildTemplateComponent();
        }, 10);
      }
    });
    if ($.fn['dataTable'] && $.fn['dataTable'].ext) {
      $.fn['dataTable'].ext.errMode = function (settings, helpPage, message) {
        console.log(message);
      };
    }
    this.init();
  }

  public ngAfterViewInit(): void {
    this.initDataTable();
  }

  public ngAfterViewChecked(): void {
    this.renderDirtyData();
  }

  ngAfterContentInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataListener.next(null);
    for (let propName in changes) {
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
  }

  /*
   * private init functions
   * */
  private init() {
    this.options = $.extend(true, this.DEFAULT_SETTINGS,
      {ajax: typeof this.ajaxOptions == 'string' ? {url: this.ajaxOptions} : this.ajaxOptions});
    this.options.serverSide = (this.options.ajax && (typeof this.options.ajax == 'string' || this.options.ajax['url'] || $.isFunction(this.options.ajax)));
    this.options.data = this.options.serverSide ? null : this.data;
  }

  private initDataTable(): void {
    let tableNode = this.tableElementRef.nativeElement;
    if (!$.fn.DataTable['isDataTable'](tableNode)) {
      $(tableNode).DataTable().destroy();
    }
    this.options.columnDefs = this.initColumnDefs();
    this._dataTableApi = $(tableNode).DataTable(this.options);
  }

  private renderDirtyData() {
    if (this.dirtyData && this.datatablesTemplateComponent) {
      this.dirtyData = false;
      $('tr', this.datatablesTemplateComponent.nativeElement).each((index, tr) => {
        $('td span', tr).each((cellIndex, td) => {
          let paramIndexes = td.id.split("_");
          console.log(paramIndexes);
          if (paramIndexes.length > 3) {
            let row = paramIndexes[3];
            let col = paramIndexes[2];
            if (!isNaN(parseInt(row)) && !isNaN(parseInt(row))) {
              let cell = this.dataTableApi.cell(row, col);
              if (cell) {
                let $cell = $(cell.node());
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
        let rowSelector = tableApi.row(td)[(<HTMLInputElement>this).checked ? 'select' : 'deselect'];
        if ($.isFunction(rowSelector))
          rowSelector();
      });
    });
    let colSelector = tableApi.columns('td.' + this.ROW_SELECTOR_CLASS);
    $.each(colSelector.header(), (index, th: Element) => {
      $('input[type="checkbox"]', th).off('change.dt').on('change.dt', function () {
        let tdCheckboxes = $('input[type="checkbox"]', tableApi.column(th).nodes());
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
        let th = $('th', thead).eq(index);
        let this_ = this;
        $('input[type="checkbox"]', th).off('change.dt').on('change.dt', function () {
          let tdCheckboxes = $('input[type="checkbox"]', this_.dataTableApi.column(th).nodes());
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
    let columnDefs: DataTables.ColumnDefsSettings[] = [];
    this.columns.forEach((item, index, items) => {
      let columnDef: DataTables.ColumnDefsSettings = item.buildColumnDefs();
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

    let this_ = this;
    columnDef.createdCell = (cell: Node, cellData: any, rowData: any, row: number, col: number) => {
      $(cell).addClass(this.ROW_SELECTOR_CLASS).find('input[type="checkbox"]').off('change.dt').on('change.dt', function () {
        let rowSelector = this_.dataTableApi.row($(cell).parent('tr'))[$(this).is(':checked') ? 'select' : 'deselect'];
        if ($.isFunction(rowSelector))
          rowSelector();
      });
    };
  }

  private buildTemplateComponent() {
    this.templateViewContainerRef.clear();
    let rendererComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DatatablesTemplateComponent);
    this.datatablesTemplateComponent = this.templateViewContainerRef.createComponent(rendererComponentFactory).instance;
    this.datatablesTemplateComponent.columns = this.columns;
    this.datatablesTemplateComponent.data = this.data;
  }


  /*
   * event functions for datatables callbacks
   * */

  private  onPreDrawCallbackEvent(settings: DataTables.SettingsLegacy) {
  }

  private  onDrawCallbackEvent(settings: DataTables.SettingsLegacy) {
    let data = this.currentData();
    this.dataListener.next(data);
  }

  private  onHeaderCallbackEvent(thead: Node, data: any[], start: number, end: number, display: any[]) {
    this.initColumnHeader(thead);
  }

  private currentData(): Object[] {
    let dataObject = this.dataTableApi.rows({page: 'current'}).data();
    let data = [];
    if (dataObject.length) {
      for (let x = 0; x < dataObject.length; x++) {
        data.push(dataObject[x]);
      }
    }
    return data;
  }

  private DEFAULT_SETTINGS = {
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
    initComplete: (settings: DataTables.SettingsLegacy, json: Object) => {
      this.initListener.next(json);
    },
    headerCallback: (thead: Node, data: any[], start: number, end: number, display: any[]) => {
      this.onHeaderCallbackEvent(thead, data, start, end, display);
    },
    drawCallback: (settings: DataTables.SettingsLegacy) => {
      this.onDrawCallbackEvent(settings);
    },
    preDrawCallback: (settings: DataTables.SettingsLegacy) => {
      this.onPreDrawCallbackEvent(settings);
    },
    language: {
      //processing: '<span class="fa fa-spinner fa-pulse fa-spin dataTables_processing"></span> loading...',
      lengthMenu: "Records Per Page: _MENU_"
    }
  };

  /*
   * accessor util functions
   * */
  get toolbar(): Observable<Element> {
    return Observable.create((observer: Observer<Element>) => {
        let subscription: Subscription = this.initListener.subscribe(() => {
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
    let _subscription: Subscription = this.initListener.subscribe(() => {
      let subscription: Subscription = toolbarListener.subscribe((tools: Element) => {
        $(this.elementRef.nativeElement).find('div.dataTables_toolbar').append(tools);
      }, error => {
      }, () => {
        //_subscription.unsubscribe();
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
      let select = this.dataTableApi.rows(row)['select'];
      if ($.isFunction(select)) {
        select();
      }
    }
  }

  deselectRow(row: Node | JQuery): void {
    if (this.isRowSelected(row)) {
      let deselect = this.dataTableApi.rows(row)['deselect'];
      if ($.isFunction(deselect)) {
        deselect();
      }
    }
  }

  selectAllRows(): void {
    let select = this.dataTableApi.rows()['select'];
    if ($.isFunction(select)) {
      select();
    }
  }

  deselectAllRows(): void {
    let deselect = this.dataTableApi.rows()['deselect'];
    if ($.isFunction(deselect)) {
      deselect();
    }
  }
}
