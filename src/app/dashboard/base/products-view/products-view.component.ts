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
    }

    ngOnInit() {
        this.appServices.get("inventory/products/").subscribe(
          res =>{
            this.products = res.data.results
          }
        );
        this.sortOptions = [
            {label: 'Price High to Low', value: '!price'},
            {label: 'Price Low to High', value: 'price'}
        ];
    }
    

    productPage(id:string){
      this.router.navigate(['product/',id])
    }

    getMediaUrl(product:any){
      if (product.media[0] !=undefined){
        return this.mediaUrl+ product.media[0].img_url;
      }else{
        return this.mediaUrl+'/images/default.png'
      }
    }
    addToCart(product:any){
      console.log(product)
      var data={
        "cart_id": 1,
        "product_id":product.id,
         "qty":1
      }
      this.appServices.post('cart/add-product/',data).subscribe(resp=>{

      })
    }
}
