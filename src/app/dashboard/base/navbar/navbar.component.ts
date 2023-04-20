import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppService } from 'src/core/services/app.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private appService:AppService,private http:HttpClient){

  }
  navItems! : MenuItem[];
  ngOnInit() {
    if (this.appService.checkTokenExist){
      this.navItems = [
        {
          label:'Logout',
          icon : 'pi pi-power-off',
          command:()=>{
            const apiParam=this.appService.getToken
            this.appService.post('user/logout/',{"refresh_token":apiParam.refresh_token}).subscribe(resp=>{
              console.log(resp['status'])
              if (resp['status']==200){
                localStorage.clear();
                this.navItems.shift();
                this.navItems.unshift({
                  label: 'Login',
                  icon: 'pi pi-fw pi-user',
                  routerLink: ['/user/login']
               })
              }
            })
          }
        }
      ]
    }else{
      this.navItems = [
        {
            label: 'Login',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/user/login']
         }];
    }
    this.navItems.push({
      label: 'cart',
      icon: 'pi pi-fw pi-shopping-cart',
      routerLink: ['/cart']
    })
      
    

  }
}