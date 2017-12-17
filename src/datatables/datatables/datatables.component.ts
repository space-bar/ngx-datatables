import {
  Component,
  ComponentFactoryResolver,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DatatablesColumnComponent} from '../datatables-column/datatables-column.component';
import {DatatablesTemplateComponent} from '../datatables-template/datatables-template.component';
import {Datatables} from "./datatables";

@Component({
  selector: 'ngx-datatables',
  templateUrl: './datatables.component.html',
  styleUrls: ['./datatables.component.css']
})
export class DatatablesComponent extends Datatables {
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

  @ViewChild(DatatablesTemplateComponent)
  private datatablesTemplateComponent: DatatablesTemplateComponent;

  @ViewChild('templateContainer', {read: ViewContainerRef})
  private templateViewContainerRef: ViewContainerRef;

  constructor(private elementRef: ElementRef, private componentFactoryResolver: ComponentFactoryResolver) {
    super(elementRef);
  }

  /*******  LIFECYCLE CALLBACK FUNCTIONS *******/

  /**
   * callback on pre-construct of class
   */
  ngOnInit() {
    this.dataListener.subscribe((data) => {
      if (data && data.length) {
        //this.data = data;
        this.buildTemplateComponent();
      }
    });
    super.ngOnInit();
  }

  /**
   * callback on view initialization
   */
  ngAfterViewInit(): void {
    if (!this.columns.length) {
      this.tableElementRef = new ElementRef($(this.elementRef.nativeElement).find("table:first").get(0));
    }
    super.ngAfterViewInit();
  }


  /**
   *
   */
  ngAfterViewChecked(): void {
    this.renderDirtyData();
    super.ngAfterViewInit();
  }

  /******* PRIVATE DATATABLES INIT FUNCTIONS *******/

  /**
   * initialization and merging of input attributes
   */
  protected init() {
    super.init();
    this.options$.columnDefs = this.initColumnDefs();
  }

  /**
   * initialization of Custom Column Headers
   * @param {Node} thead
   */
  private initColumnHeader(thead: Node) {
    if (this.columns) {
      this.columns.forEach((item, index, items) => {
        if (item.rowSelector) {
          const th = $('th', thead).eq(index);
          const this_ = this;
          $('input[type="checkbox"]', th).off('change.dt').on('change.dt', function () {
            const tdCheckboxes = $('input[type="checkbox"]', this_.dataTableApi.column(th).nodes());
            tdCheckboxes.prop({checked: (<HTMLInputElement>this).checked});
            tdCheckboxes.change();
          });
        }
      });
    }
  }

  /**
   * Overriding and merging DataTables columns(options) and ngx-datatables-column settings.
   * Note that user defined columns and columnDefs options overrides ngx-datatables-column settings
   * However if columnDefs or columns must be used fully used, consider using a no ngx-datatables-column ngx-datatables or ngxDatatables Direcetive
   * @returns {DataTables.ColumnDefsSettings[]}
   */
  private initColumnDefs(): DataTables.ColumnDefsSettings[] {
    const columnDefs: DataTables.ColumnDefsSettings[] = [...(this.options && this.options.columnDefs ? this.options.columnDefs : [])];
    if (this.columns) {
      this.columns.forEach((col, index, cols) => {
        const columnDef = col.buildColumnDefs();
        //const columnDef: DataTables.ColumnDefsSettings = Object.assign(<DataTables.ColumnDefsSettings>{targets: index}, col);
        columnDef.targets = index;
        if (col.rowSelector) {
          this.buildRowSelectorColumn(columnDef);
        }
        columnDefs.push(columnDef);
      });
    }
    return columnDefs;
  }


  /*******  PRIVATE DOM MANIPULATION AND DYNAMIC RENDERING FUNCTIONS *******/

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

  /**
   * Custom row selector when a column is flag as a rowSelector
   * @param {DataTables.ColumnDefsSettings} columnDef
   */
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


  /**
   * Dynamic building and rendering of custom Column Components using ngxDataTablesTemplate
   */
  private buildTemplateComponent() {
    if (this.templateViewContainerRef) {
      this.templateViewContainerRef.clear();
      const rendererComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DatatablesTemplateComponent);
      this.datatablesTemplateComponent = this.templateViewContainerRef.createComponent(rendererComponentFactory).instance;
      this.datatablesTemplateComponent.columns = this.columns;
      this.datatablesTemplateComponent.data = this.data;
    }
  }

  /*******  PROTECTED CALLBACK FUNCTIONS *******/

  /**
   * Callback function on Table Header init
   * @param {Node} thead
   * @param {any[]} data
   * @param {number} start
   * @param {number} end
   * @param {any[]} display
   */
  protected onHeaderCallbackEvent(thead: Node, data: any[], start: number, end: number, display: any[]) {
    this.initColumnHeader(thead);
  }
}
