import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DatatablesColumnComponent} from "./datatables-column/datatables-column.component";
import {DatatablesTemplateComponent} from "./datatables-template/datatables-template.component";
import {DatatablesPortletComponent} from "./datatables-portlet/datatables-portlet.component";
import {DatatablesTemplateDirective} from "./datatables-template/datatables-template.directive";
import {DatatablesComponent} from "./datatables/datatables.component";


@NgModule({
  imports: [
    CommonModule
  ],
  entryComponents: [DatatablesTemplateComponent],
  exports: [DatatablesColumnComponent, DatatablesTemplateComponent, DatatablesPortletComponent, DatatablesTemplateDirective, DatatablesComponent],
  declarations: [DatatablesColumnComponent, DatatablesTemplateComponent, DatatablesPortletComponent, DatatablesTemplateDirective, DatatablesComponent]
})
export class DatatablesModule {
}
