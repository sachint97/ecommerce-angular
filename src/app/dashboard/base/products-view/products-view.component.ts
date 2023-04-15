import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { AppService } from '../../../../core/services/app.service';
import { Media, Product } from '../../../../core/models/model';
import {SelectItem} from 'primeng/api';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent {
  @Input() appImgFallback:string;

  products: Product[];

    sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    sortKey:string;

    mediaUrl:string

    constructor(private appServices: AppService,private router:Router) { 
      this.mediaUrl=environment.MEDIA_API_URL
      console.log(this.mediaUrl)
    }

    ngOnInit() {
        this.appServices.get("inventory/products/").subscribe(
          res =>{
            console.log(res.data.results)
            this.products = res.data.results
          }
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

    productPage(id:string){
      this.router.navigate(['product/',id])
    }

    getMediaUrl(product:any){
      console.log(product?.media[0]!=undefined);
      if (product.media[0] !=undefined){
        return this.mediaUrl+ product.media[0].img_url;
      }else{
        return this.mediaUrl+'/images/default.png'
      }
    }
}
