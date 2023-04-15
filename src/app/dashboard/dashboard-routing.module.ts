import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { ProductComponent } from './base/product/product.component';

const routes: Routes = [
  {path:'',component:BaseComponent},
  {path:'product/:web_id',component:ProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
