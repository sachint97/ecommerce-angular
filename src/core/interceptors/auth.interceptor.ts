import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';
import { refreshTokenURL } from '../constants/api-constants';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  totalReq:number=0;
  constructor(private appService:AppService) {}
  httpHeaders(token){
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //request object is immutablehence you have to create a duplicate and pass that object
    //1.Keep check of number of request sent and response got if it is not balance loader should keep on loading
    //2.if request is token refresh request then get the new access token and update it to session storage
    var token=this.appService.getToken
    var req:HttpRequest<any>
    console.log("hereee"+request.url);
    if(request.url==(environment.API_URL+refreshTokenURL)){
      req=request.clone()
    }else{
      if(token.refresh_token!=null&&token.access_token!=null){
        console.log(new Date(Number(token.access_token_expiry_time)));
        if (new Date(Number(token.access_token_expiry_time)) < new Date()){
          this.appService.post(refreshTokenURL,{"refresh":token.refresh_token}).subscribe(resp=>{
            var date = new Date() 
            localStorage.setItem("access_token",resp.data.access);
            console.log(String(date.setSeconds(date.getSeconds() + resp.data.access_token_life_time_in_seconds)))
            localStorage.setItem("access_token_life_time_in_seconds",String(date.setSeconds(date.getSeconds() + resp.data.access_token_life_time_in_seconds)));
          })
          token=this.appService.getToken
        }
        req=request.clone({
          setHeaders: {
            'Authorization': `Bearer ${token.access_token}`,
            'content-type': 'application/json'
          },
        })
      }else {
        req=request.clone()
      }
    }
    
    //3.if refresh token expiry time is less than current time then redirect to login screen
    //4.if access token expiry time is less than current time then send refresh token request and store new access token into session
    //5.
    return next.handle(req); // allows request leave the app
  }
}
