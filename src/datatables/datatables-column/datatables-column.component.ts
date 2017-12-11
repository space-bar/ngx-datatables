import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {DatatablesTemplateDirective} from '../datatables-template/datatables-template.directive';


@Component({
  selector: 'ngx-datatables-column',
  templateUrl: './datatables-column.component.html',
  styleUrls: ['./datatables-column.component.css']
})
export class DatatablesColumnComponent implements OnInit, AfterContentInit {
  @ContentChildren(DatatablesTemplateDirective)
  private templates: QueryList<DatatablesTemplateDirective>;

  private _headerTemplate: DatatablesTemplateDirective;

  private _footerTemplate: DatatablesTemplateDirective;

  private _bodyTemplate: DatatablesTemplateDirective;

  @Input()
  title?: string;

  @Input()
  field?: string;

  @Input()
  data?: string;

  @Input()
  sortField?: string;

  @Input()
  header?: string;

  @Input()
  footer?: string;

  @Input()
  sortable?: string;

  @Input()
  sortFunction?: string;

  @Input()
  editable?: string;

  @Input()
  filter?: string;

  @Input()
  rowSelector?: boolean;

  @Input()
  orderable?: boolean;

  @Input()
  searchable = true;

  @Input()
  visible = true;

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
  buildColumnDefs(colSettings: DataTables.ColumnSettings): DataTables.ColumnDefsSettings {
    // const columnDefs: DataTables.ColumnDefsSettings = colSettings
    // ? Object.assign(<DataTables.ColumnDefsSettings>{}, colSettings || {}) : <DataTables.ColumnDefsSettings>{};
    const columnDefs: DataTables.ColumnDefsSettings = <DataTables.ColumnDefsSettings>{};
    columnDefs.searchable = this.searchable;
    columnDefs.title = this.title;
    columnDefs.visible = this.visible;
    columnDefs.width = this.width;
    columnDefs.orderable = (typeof this.orderable === 'undefined' && this.rowSelector) ? false : this.orderable;
    columnDefs.data = this.data || this.field;

    return colSettings ? Object.assign(columnDefs, colSettings) : columnDefs;
  }
}
