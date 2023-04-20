import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Media, Product } from 'src/core/models/model';
import { AppService } from 'src/core/services/app.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  id:string;
  product: Product;
  mediaUrl:string;
  images: Media[];
  responsiveOptions: any[];
  qty:number=1;
  constructor(private route: ActivatedRoute,private appService:AppService) {
    this.mediaUrl=environment.MEDIA_API_URL
   }

  ngOnInit() {
    // this.photoService.getImages().then((images) => (this.images = images));
    this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    this.route.paramMap.subscribe(params => {
      this.id = params.get('web_id')!;
    });
    this.appService.get('inventory/product/'+this.id+'/').subscribe(resp=>{
      this.product=resp.data;
      this.images=this.product.media!
      if (this.images?.length == 0){
        this.images.push({img_url:'/images/default.png'})
      }
    })
    
  }
  getMediaUrl(product:any){
    if (product.media[0] !=undefined){
      return this.mediaUrl+ product.media[0].img_url;
    }else{
      return this.mediaUrl+'/images/default.png'
    }
  }
  getMaxUnits(){
    return Number(this.product.units);
  }
  addProduct(){
    console.log(this.qty)
    console.log(this.product.id)
    console.log(this.id)
  }
}


