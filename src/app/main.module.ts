import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './demo/shared/header/header.component';
import { FooterComponent } from './demo/shared/footer/footer.component';
import { NavbarComponent } from './demo/shared/navbar/navbar.component';
import { ContentComponent } from './demo/shared/content/content.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderComponent, FooterComponent, NavbarComponent, ContentComponent]
})
export class MainModule { }
