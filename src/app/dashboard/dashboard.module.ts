import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BaseComponent } from './base/base.component';
import { CarouselComponent } from './base/carousel/carousel.component';
import { NavbarComponent } from './base/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import {CarouselModule} from 'primeng/carousel';
import {RatingModule} from 'primeng/rating';
import {DataViewModule} from 'primeng/dataview';
import { AppService } from '../../core/services/app.service';
import { ProductsViewComponent } from './base/products-view/products-view.component';

@NgModule({
  declarations: [
    BaseComponent,
    CarouselComponent,
    NavbarComponent,
    ProductsViewComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    CarouselModule,
    HttpClientModule,
    RatingModule,
    DataViewModule,
    DropdownModule,
    RatingModule,
    FormsModule
  ],
  providers:[HttpClientModule,AppService]
})
export class DashboardModule { }
