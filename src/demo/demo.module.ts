import {NgModule} from '@angular/core';
import {ZeroConfiguration} from "./basic/zero-configuration";
import {BrowserModule} from "@angular/platform-browser";
import {DatatablesModule} from "../datatables/datatables.module";
import {DemoComponent} from "./demo.component";

@NgModule({
  declarations: [
    DemoComponent,
    ZeroConfiguration
  ],
  imports: [
    BrowserModule,
    DatatablesModule
  ],
  providers: [],
  bootstrap: [DemoComponent]
})
export class DemoModule {
}
