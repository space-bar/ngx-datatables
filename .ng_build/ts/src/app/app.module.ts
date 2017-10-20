import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {DatatablesModule} from "./datatables/datatables.module";
import * as $ from "jquery";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, DatatablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
window['jQuery'] = window['$'] = $;

const WIDGET_PLUGINS = [
  require("datatables.net"),
  require("datatables.net-bs"),
  require("datatables.net-select"),
];
