import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatatablesColumnComponent} from './datatables-column/datatables-column.component';
import {DatatablesTemplateComponent} from './datatables-template/datatables-template.component';
import {DatatablesPortletComponent} from './datatables-portlet/datatables-portlet.component';
import {DatatablesTemplateDirective} from './datatables-template/datatables-template.directive';
import {DatatablesComponent} from './datatables/datatables.component';
import {DatatablesDirective} from './datatables/datatables.directive';

const components = [
  DatatablesColumnComponent,
  DatatablesPortletComponent,
  DatatablesTemplateComponent,
  DatatablesTemplateDirective,
  DatatablesComponent,
  DatatablesDirective
];

@NgModule({
  imports: [
    CommonModule
  ],
  entryComponents: [DatatablesTemplateComponent],
  exports: [...components],
  declarations: [...components],
})
export class DatatablesModule {
}
