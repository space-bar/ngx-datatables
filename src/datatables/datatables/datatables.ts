import {AfterViewChecked, AfterViewInit, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

export abstract class Datatables implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked, OnChanges {

  selectionMode = 'multiple';

  data: Object[];

  ajax: string | DataTables.AjaxSettings | DataTables.FunctionAjax;

  options: DataTables.Settings;

  protected options$: DataTables.Settings;

  protected dataListener: Subject<Object[]> = new Subject();

  protected initListener: Subject<Object> = Subject.create();

  protected dirtyData: boolean;

  protected tableElementRef: ElementRef;

  private _dataTableApi: DataTables.Api;


  private PRIVATE_SETTINGS = {
    initComplete: (settings: DataTables.SettingsLegacy, json: Object) => {
      this.onInitComplete(settings, json);
      if (this.options && $.isFunction(this.options.initComplete)) {
        this.options.initComplete.call(this.dataTableApi, settings, json);
      }
    },
    headerCallback: (thead: Node, data: any[], start: number, end: number, display: any[]) => {
      this.onHeaderCallback(thead, data, start, end, display);
      if (this.options && $.isFunction(this.options.headerCallback)) {
        this.options.headerCallback.call(this.dataTableApi, thead, data, start, end, display);
      }
    },
    drawCallback: (settings: DataTables.SettingsLegacy) => {
      this.onDrawCallback(settings);
      if (this.options && $.isFunction(this.options.drawCallback)) {
        this.options.drawCallback.call(this.dataTableApi, settings);
      }
    },
    preDrawCallback: (settings: DataTables.SettingsLegacy) => {
      this.onPreDrawCallback(settings);
      if (this.options && $.isFunction(this.options.preDrawCallback)) {
        this.options.preDrawCallback.call(this.dataTableApi, settings);
      }
    }
  };

  constructor(private _elementRef: ElementRef) {
    this.tableElementRef = _elementRef;
  }

  /*******  LIFECYCLE CALLBACK FUNCTIONS *******/

  /**
   * callback on pre-construct of class
   */
  ngOnInit() {
    this.dataListener.subscribe((currentData) => {
      this.dirtyData = true;
    });
    if ($.fn.dataTable && $.fn.dataTable.ext) {
      $.fn.dataTable.ext.errMode = 'throw';
    }
    this.initOptions();
  }

  /**
   * callback on view initialization
   */
  ngAfterViewInit(): void {
    this.buildDataTable();
  }

  /**
   *
   */
  ngAfterViewChecked(): void {
  }

  /**
   * Callback on input attribute change, hence DataTable is destroyed and reCreated
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges) {
    this.dataListener.next(null);
    for (const propName in changes) {
      if (!changes[propName].firstChange) {
        this.initOptions();
        this.buildDataTable();
        break;
      }
    }
  }

  /**
   * callback on View destroyed, Hence DataTables is destroy
   */
  ngOnDestroy(): void {
    this.dataListener.unsubscribe();
    this.initListener.unsubscribe();
    if (this._dataTableApi) {
      this._dataTableApi.destroy(true);
    }
  }


  /******* PRIVATE DATATABLES INIT FUNCTIONS *******/

  /**
   * initialization and merging of input attributes
   */
  protected initOptions() {
    this.options$ = {ajax: typeof this.ajax === 'string' ? {url: this.ajax} : this.ajax};
    this.options$ = $.extend(true, this.options$, this.options || {});
    this.options$ = $.extend(true, this.options$, this.PRIVATE_SETTINGS);

    this.options$.serverSide = (this.options$.ajax &&
      (typeof this.options$.ajax === 'string' || this.options$.ajax['url'] || $.isFunction(this.options$.ajax)));
    this.options$.data = this.options$.serverSide ? null : this.data;
  }

  /**
   * DataTables new instance initialization
   */
  protected buildDataTable(): void {
    if (!$ || !$.fn || !$.fn.DataTable) {
      console.log('DataTable not initialized properly');
      console.log('jquery ', $ !== undefined);
      console.log('jquery $.fn', $ && $.fn);
      console.log('jquery $.fn', $ && $.fn && $.fn.DataTable);
      return;
    }
    const tableNode = this.tableElementRef.nativeElement;
    if ($.fn.dataTable.isDataTable(tableNode)) {
      $(tableNode).DataTable().destroy();
    }
    const staticData = this.options$.serverSide ? this.data : null;
    this._dataTableApi = $(tableNode).DataTable(this.options$);
    /*if (staticData) {
      setTimeout(() => {
        this._dataTableApi.rows.add(staticData).draw();
      }, 200);
    }*/
  }


  /*******  PROTECTED CALLBACK FUNCTIONS *******/

  protected onInitComplete(settings: DataTables.SettingsLegacy, json: Object) {
    this.initListener.next(json);
  }

  /**
   * Event callback before DataTables Draw occurs
   * @param {DataTables.SettingsLegacy} settings
   */
  protected onPreDrawCallback(settings: DataTables.SettingsLegacy) {
  }

  /**
   * Event callback DataTables Draw
   * @param {DataTables.SettingsLegacy} settings
   */
  protected onDrawCallback(settings: DataTables.SettingsLegacy) {
    const data = this.currentData();
    this.dataListener.next(data);
  }

  /**
   * Callback function on Table Header init
   * @param {Node} thead
   * @param {any[]} data
   * @param {number} start
   * @param {number} end
   * @param {any[]} display
   */
  protected onHeaderCallback(thead: Node, data: any[], start: number, end: number, display: any[]) {
  }

  /*******  PRIVATE UTIL FUNCTIONS *******/

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


  /*******  PUBLIC UTIL FUNCTIONS *******/

  get toolbar(): Observable<Element> {
    return Observable.create((observer: Observer<Element>) => {
        const subscription: Subscription = this.initListener.subscribe(() => {
          observer.next($(this._elementRef.nativeElement).find('div.dataTables_toolbar').get(0));
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
        $(this._elementRef.nativeElement).find('div.dataTables_toolbar').append(tools);
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
