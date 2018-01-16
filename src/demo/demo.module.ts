import {NgModule} from '@angular/core';
import {ZeroConfiguration} from './basic/zero-configuration';
import {BrowserModule} from '@angular/platform-browser';
import {DatatablesModule} from '../datatables/datatables.module';
import {DemoComponent} from './demo.component';
import {SharedModule} from "./shared/shared.module";
import {DemoRoutingModule} from "./demo-routing-module";

@NgModule({
  declarations: [
    DemoComponent,
    ZeroConfiguration
  ],
  imports: [
    BrowserModule,
    DatatablesModule,
    SharedModule.forRoot(),
    DemoRoutingModule
  ],
  providers: [],
  bootstrap: [DemoComponent]
})
export class DemoModule {
}
