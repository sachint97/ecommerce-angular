import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/core/services/app.service';
import { environment } from 'src/environments/environment.development';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cart:any;
  products:any[];
  mediaUrl:string='';
  constructor(private apiService:AppService){

  }
  ngOnInit(): void {
    this.getCartproducts()
    this.mediaUrl=environment.MEDIA_API_URL;
  }

  getCartproducts(){
    this.apiService.get('cart/?username=testing').subscribe(resp=>{
      this.cart=resp.data;
      this.products=this.cart.cart_items;
    })
  }

  getMediaUrl(product:any){
    if (product.product_inventory.media[0] !=undefined){
      return this.mediaUrl+ product.product_inventory.media[0].img_url;
    }else{
      return this.mediaUrl+'/images/default.png'
    }
  }
  deleteProduct(product:any){
    console.log(product)
    this.apiService.delete('cart/remove-product/testing/'+String(product.product_inventory.id)+'/').subscribe(resp=>{
      this.getCartproducts()
    })
  }
  getMaxUnits(product:any){
    return Number(product.product_inventory.quantity);
  }
  getProductQty(product:any){
    return product.product_inventory.quantity;
  }
  qtyChange(product:any){
    const data={
      "username":"testing",
      "product_id":product.product_inventory.id,
      "qty":product.quantity
  }
  this.apiService.put('cart/edit-qty/',data).subscribe(resp=>{
    this.getCartproducts()
  })
  }
}
