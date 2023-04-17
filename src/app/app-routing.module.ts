import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',
  loadChildren : ()=> import('./dashboard/dashboard.module').then(m=>m.DashboardModule)},
  {path:'user',
  loadChildren : ()=> import('./autentication/autentication.module').then(m=>m.AutenticationModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
