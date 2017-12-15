import {SimpleChanges} from "@angular/core";

export abstract class Datatables {

  constructor() {
  }
/*
  /!*
  * lifecycle callback functions
  * *!/
  onInit() {
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

  afterViewInit(): void {
    this.initDataTable();
  }

  afterViewChecked(): void {
    this.renderDirtyData();
  }


  onChanges(changes: SimpleChanges) {
    this.dataListener.next(null);
    for (const propName in changes) {
      if (!changes[propName].firstChange) {
        this.init();
        this.initDataTable();
        break;
      }
    }
  }

  onDestroy(): void {
    this.dataListener.unsubscribe();
    this.initListener.unsubscribe();
    if (this._dataTableApi) {
      this._dataTableApi.destroy(true);
    }
  }

  /!*
  * protected DataTables init functions
  * *!/

  protected init() {
    this.options$ = {ajax: typeof this.ajax === 'string' ? {url: this.ajax} : this.ajax};
    this.options$ = $.extend(true, this.options$, this.options || {});
    this.options$ = $.extend(true, this.options$, this.PRIVATE_SETTINGS);

    this.options$.serverSide = (this.options$.ajax &&
      (typeof this.options$.ajax === 'string' || this.options$.ajax['url'] || $.isFunction(this.options$.ajax)));
    this.options$.data = this.options$.serverSide ? null : [];
  }

  protected initDataTable(): void {
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

  protected renderDirtyData() {
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
  }*/
}
