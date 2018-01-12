import {ModuleWithProviders, NgModule, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {ContentComponent} from './content/content.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';

const COMPONENTS = [HeaderComponent, FooterComponent, NavbarComponent, ContentComponent];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }


  constructor(@Optional() @SkipSelf() coreModule: SharedModule) {
    if (coreModule) {
      throw new Error('SharedModule is a singleton that should only be imported by the AppModule');
    }
  }
}
