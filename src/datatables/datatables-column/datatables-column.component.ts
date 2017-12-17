import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {DatatablesTemplateDirective} from '../datatables-template/datatables-template.directive';


@Component({
  selector: 'ngx-datatables-column',
  templateUrl: './datatables-column.component.html',
  styleUrls: ['./datatables-column.component.css']
})
export class DatatablesColumnComponent implements OnInit, AfterContentInit, DataTables.ColumnSettings {
  @ContentChildren(DatatablesTemplateDirective)
  private templates: QueryList<DatatablesTemplateDirective>;

  private _headerTemplate: DatatablesTemplateDirective;

  private _footerTemplate: DatatablesTemplateDirective;

  private _bodyTemplate: DatatablesTemplateDirective;

  /**
   * Alternative for data
   */
  @Input()
  field?: string;

  /**
   * Same as title but specific for header alone
   */
  @Input()
  header?: string;

  /**
   * Same as title but specific for footer alone
   */
  @Input()
  footer?: string;

  /**
   * Flag indicating a row selector
   */
  @Input()
  rowSelector?: boolean;


  //**********DATATABLES COLUMN SETTINGS***********
  /**
   * Cell type to be created for a column. th/td Since: DataTables 1.10
   */
  @Input()
  cellType?: string;

  /**
   * Class to assign to each cell in the column. Since: DataTables 1.10
   */
  @Input()
  className?: string;

  /**
   * Add padding to the text content used when calculating the optimal with for a table. Since: DataTables 1.10
   */
  @Input()
  contentPadding?: string;

  /**
   * Cell created callback to allow DOM manipulation. Since: DataTables 1.10
   */
  @Input()
  createdCell?: DataTables.FunctionColumnCreatedCell;

  /**
   * Class to assign to each cell in the column. Since: DataTables 1.10
   */
  @Input()
  data?: number | string | DataTables.ObjectColumnData | DataTables.FunctionColumnData;

  /**
   * Set default, static, content for a column. Since: DataTables 1.10
   */
  @Input()
  defaultContent?: string;

  /**
   * Set a descriptive name for a column. Since: DataTables 1.10
   */
  @Input()
  name?: string;

  /**
   * Enable or disable ordering on this column. Since: DataTables 1.10
   */
  @Input()
  orderable?: boolean;

  /**
   * Define multiple column ordering as the default order for a column. Since: DataTables 1.10
   */
  @Input()
  orderData?: number | number[];

  /**
   * Live DOM sorting type assignment. Since: DataTables 1.10
   */
  @Input()
  orderDataType?: string;

  /**
   * Ordering to always be applied to the table. Since 1.10
   *
   * Array type is prefix ordering only and is a two-element array:
   * 0: Column index to order upon.
   * 1: Direction so order to apply ("asc" for ascending order or "desc" for descending order).
   */
  @Input()
  orderFixed?: any[] | DataTables.ObjectOrderFixed;

  /**
   * Order direction application sequence. Since: DataTables 1.10
   */
  @Input()
  orderSequence?: string[];

  /**
   * Render (process) the data for use in the table. Since: DataTables 1.10
   */
  @Input()
  render?: number | string | DataTables.ObjectColumnData | DataTables.FunctionColumnRender | DataTables.ObjectColumnRender;

  /**
   * Enable or disable filtering on the data in this column. Since: DataTables 1.10
   */
  @Input()
  searchable?: boolean;

  /**
   * Set the column title. Since: DataTables 1.10
   */
  @Input()
  title?: string;

  /**
   * Set the column type - used for filtering and sorting string processing. Since: DataTables 1.10
   */
  @Input()
  type?: string;

  /**
   * Enable or disable the display of this column. Since: DataTables 1.10
   */
  @Input()
  visible?: boolean;

  /**
   * Column width assignment. Since: DataTables 1.10
   */
  @Input()
  width?: string;


  constructor() {
  }

  /*
   * lifecyscle callback functions
   */
  ngOnInit() {
  }

  ngAfterContentInit(): void {
    if (this.templates != null) {
      this._headerTemplate = this.findTemplateFor('header');
      this._footerTemplate = this.findTemplateFor('footer');
      this._bodyTemplate = this.findTemplateFor('body');
    }
  }

  /*
   * public props getter functions
   */
  get headerTemplate(): DatatablesTemplateDirective {
    return this._headerTemplate;
  }

  get footerTemplate(): DatatablesTemplateDirective {
    return this._footerTemplate;
  }

  get bodyTemplate(): DatatablesTemplateDirective {
    return this._bodyTemplate;
  }

  /*
   * private helper functions
   */
  private singularTemplate(templates: DatatablesTemplateDirective[]): DatatablesTemplateDirective {
    if (templates != null && templates.length > 1) {
      console.warn(`Multiple '${templates[0].ngxDatatablesTemplate}' Column template detected [ignored]`);
    }
    return templates == null || templates.length === 0 ? null : templates[0];
  }

  private findTemplateFor(templateName: string): DatatablesTemplateDirective {
    const templates: DatatablesTemplateDirective[] = this.templates != null ?
      this.templates.filter(template => template.ngxDatatablesTemplate === templateName) : null;
    if (templates != null && templates.length > 1) {
      console.warn(`Multiple '${templateName}' Column template detected [ignored]`);
    }
    return templates == null || templates.length === 0 ? null : templates[0];
  }

  /*
   * public helper functions
   */
  buildColumnDefs(colSettings?: DataTables.ColumnSettings): DataTables.ColumnDefsSettings {
    // const columnDefs: DataTables.ColumnDefsSettings = colSettings
    // ? Object.assign(<DataTables.ColumnDefsSettings>{}, colSettings || {}) : <DataTables.ColumnDefsSettings>{};
    const columnDefs: DataTables.ColumnDefsSettings = Object.assign(<DataTables.ColumnDefsSettings>{}, this);
    /*columnDefs.searchable = this.searchable;
    columnDefs.title = this.title;
    columnDefs.visible = this.visible;
    columnDefs.width = this.width;*/
    columnDefs.orderable = (typeof this.orderable === 'undefined' && this.rowSelector) ? false : this.orderable;
    columnDefs.data = this.data || this.field;

    return colSettings ? Object.assign(columnDefs, colSettings) : columnDefs;
  }
}
