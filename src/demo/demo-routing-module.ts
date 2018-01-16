import {NgModule, Optional, SkipSelf} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from './shared/shared.module';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  /* {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
   {path: 'home', component: DashboardComponent, canActivate: [AuthGuard]},
   {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
   {path: 'signup', component: SignupComponent, canActivate: [AuthGuard]},
   {path: '**', component: PageNotFoundComponent, pathMatch: 'full'},*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class DemoRoutingModule {
  constructor(@Optional() @SkipSelf() appRoutingModule: DemoRoutingModule) {
    if (appRoutingModule) {
      throw new Error('Demo Routing Module can only be a singleton imported by the Root AppModule ');
    }
  }
}
