import { Component } from '@angular/core';
import { AppService } from '../../../../core/services/app.service';
import { Product } from '../../../../core/models/model';




@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  products: Product[];

	responsiveOptions;

	constructor(private appService: AppService) {
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
		this.appService.get("assets/products.json").subscribe(products => {
			this.products = products.data.slice(0,5);
      console.log(products.data.slice(0,5))
		});
    }
}
