import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppComponent} from './app.component';
import {DatatablesModule} from '../datatables/datatables.module';
import * as $ from 'jquery';
import { DatatablesDirective } from '../datatables/datatables/datatables.directive';

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
/*window['jQuery'] = window['$'] = $;

const WIDGET_PLUGINS = [
  require('datatables.net')
];*/
