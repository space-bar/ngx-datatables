import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
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


  constructor(@Optional() @SkipSelf() sharedModule: SharedModule) {
    if (sharedModule) {
      throw new Error('SharedModule is a singleton that should only be imported by the AppModule');
    }
  }
}
