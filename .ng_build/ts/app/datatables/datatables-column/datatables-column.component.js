import { Component, ContentChildren, Input } from '@angular/core';
import { DatatablesTemplateDirective } from '../datatables-template/datatables-template.directive';
export class DatatablesColumnComponent {
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
function DatatablesColumnComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DatatablesColumnComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DatatablesColumnComponent.ctorParameters;
    /** @type {?} */
    DatatablesColumnComponent.propDecorators;
    /** @type {?} */
    DatatablesColumnComponent.prototype.templates;
    /** @type {?} */
    DatatablesColumnComponent.prototype._headerTemplate;
    /** @type {?} */
    DatatablesColumnComponent.prototype._footerTemplate;
    /** @type {?} */
    DatatablesColumnComponent.prototype._bodyTemplate;
    /** @type {?} */
    DatatablesColumnComponent.prototype.title;
    /** @type {?} */
    DatatablesColumnComponent.prototype.field;
    /** @type {?} */
    DatatablesColumnComponent.prototype.sortField;
    /** @type {?} */
    DatatablesColumnComponent.prototype.header;
    /** @type {?} */
    DatatablesColumnComponent.prototype.footer;
    /** @type {?} */
    DatatablesColumnComponent.prototype.sortable;
    /** @type {?} */
    DatatablesColumnComponent.prototype.sortFunction;
    /** @type {?} */
    DatatablesColumnComponent.prototype.editable;
    /** @type {?} */
    DatatablesColumnComponent.prototype.filter;
    /** @type {?} */
    DatatablesColumnComponent.prototype.rowSelector;
    /** @type {?} */
    DatatablesColumnComponent.prototype.orderable;
    /** @type {?} */
    DatatablesColumnComponent.prototype.searchable;
    /** @type {?} */
    DatatablesColumnComponent.prototype.visible;
    /** @type {?} */
    DatatablesColumnComponent.prototype.width;
}
//# sourceMappingURL=datatables-column.component.js.map
