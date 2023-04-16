import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BaseComponent } from './base/base.component';
import { CarouselComponent } from './base/carousel/carousel.component';
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
import { ProductComponent } from './base/product/product.component';
import {GalleriaModule} from 'primeng/galleria';
import { PhotoService } from 'src/core/services/photo.service';
import { DividerModule } from 'primeng/divider';
import {TableModule} from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { CartComponent } from './base/cart/cart.component';
import { VirtualScrollerModule } from 'primeng/virtualscroller';


@NgModule({
  declarations: [
    BaseComponent,
    CarouselComponent,
    ProductsViewComponent,
    ProductComponent,
    CartComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    InputTextModule,
    ButtonModule,
    CarouselModule,
    HttpClientModule,
    RatingModule,
    DataViewModule,
    DropdownModule,
    RatingModule,
    FormsModule,
    GalleriaModule,
    DividerModule,
    TableModule,
    InputNumberModule,
    VirtualScrollerModule
    
  ],
  providers:[HttpClientModule,AppService,PhotoService]
})
export class DashboardModule { }
