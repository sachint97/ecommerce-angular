import { Component } from '@angular/core';
import { AppService } from '../../../../core/services/app.service';
import { Product } from '../../../../core/models/model';
import {SelectItem} from 'primeng/api';


@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent {

  products: Product[];

    sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    sortKey:string;

    constructor(private appServices: AppService) { }

    ngOnInit() {
        this.appServices.get("assets/products.json").subscribe(
          res => this.products = res.data
        );
        this.sortOptions = [
            {label: 'Price High to Low', value: '!price'},
            {label: 'Price Low to High', value: 'price'}
        ];
    }
    
    onSortChange(event: any) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }
}
