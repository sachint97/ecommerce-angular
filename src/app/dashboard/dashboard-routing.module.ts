import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { ProductComponent } from './base/product/product.component';
import { CartComponent } from './base/cart/cart.component';

const routes: Routes = [
  {path:'',component:BaseComponent},
  {path:'product/:web_id',component:ProductComponent},
  {path:'cart',component:CartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
