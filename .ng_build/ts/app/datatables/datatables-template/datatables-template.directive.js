import { Directive, Input, TemplateRef } from '@angular/core';
export class DatatablesTemplateDirective {
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
function DatatablesTemplateDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    DatatablesTemplateDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DatatablesTemplateDirective.ctorParameters;
    /** @type {?} */
    DatatablesTemplateDirective.propDecorators;
    /** @type {?} */
    DatatablesTemplateDirective.prototype.ngxDatatablesTemplate;
    /** @type {?} */
    DatatablesTemplateDirective.prototype._templateRef;
}
//# sourceMappingURL=datatables-template.directive.js.map
