import { Component } from '@angular/core';
import { AppService } from '../../../../core/services/app.service';
import { Product } from '../../../../core/models/model';
import { environment } from 'src/environments/environment.development';




@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  products: Product[];

	responsiveOptions;

  mediaUrl:string
	constructor(private appService: AppService) {
    this.mediaUrl=environment.MEDIA_API_URL
		this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
	}

  ngOnInit() {
		this.appService.get("inventory/products/").subscribe(products => {
			this.products = products.data.results.slice(0,5);
		});
    }
    getMediaUrl(product:any){
      if (product.media[0] !=undefined){
        return this.mediaUrl+ product.media[0].img_url;
      }else{
        return this.mediaUrl+'/images/default.png'
      }
    }
}
