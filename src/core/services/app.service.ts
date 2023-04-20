import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product, Token } from '../models/model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { localConstants } from '../constants/local-storage-constants';



@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient,public router:Router) { }

  private httpHeaders(type:string){
    return new HttpHeaders({
      'Content-Type':type,
    });
  }
  get(apiConst:string){
    return this.http.get(`${environment.API_URL}${apiConst}`,{headers:this.httpHeaders('application/json'),observe:'response'}).pipe(
      map((resp:any)=>{
        return {status:resp['status'],data:resp['body'],statusText:resp['statusText']}
      })
    );
  }
  post(apiConst:string,reqBody:any){
    return this.http.post(environment.API_URL+apiConst,reqBody,{headers:this.httpHeaders('application/json'),observe:'response'}).pipe(
      map((resp:any)=>{
        return {status:resp['status'],data:resp['body'],statusText:resp['statusText']}
      })
    );
  }

  put(apiConst:string,reqBody:any){
    return this.http.put(environment.API_URL+apiConst,reqBody,{headers:this.httpHeaders('application/json'),observe:'response'}).pipe(
      map((resp:any)=>{
        return {status:resp['status'],data:resp['body'],statusText:resp['statusText']}
      })
    );
  }
  delete(apiConst:string){
    return this.http.delete(environment.API_URL+apiConst,{headers:this.httpHeaders('application/json'),observe:'response'}).pipe(
      map((resp:any)=>{
        return {status:resp['status'],data:resp['body'],statusText:resp['statusText']}
      })
    );
  }

  storeTokenInLocalStorage(resp:Token){
    localStorage.setItem(localConstants.accessToken,resp.access_token)
    localStorage.setItem(localConstants.refreshToken,resp.refresh_token)
    var date = new Date() 
    localStorage.setItem(localConstants.accessTokenExpiryTime,String(date.setSeconds(date.getSeconds() + resp.access_token_life_time_in_seconds)))
    localStorage.setItem(localConstants.refreshTokenExpiryTime,String(date.setSeconds(date.getSeconds() + resp.refresh_token_life_time_in_seconds)))
  }

  get checkTokenExist(){
    var access_token=localStorage.getItem('access_token');
    var refresh_token=localStorage.getItem('refresh_token');
    console.log(refresh_token);
    if (refresh_token==null && refresh_token==undefined){
        return false;
    }else{
        return true;
    }
  }
  get getToken(){
    return {
      "access_token":localStorage.getItem('access_token'),
      "refresh_token":localStorage.getItem('refresh_token'),
      "access_token_expiry_time":localStorage.getItem('access_token_expiry_time'),
      "refresh_token_expiry_time":localStorage.getItem('refresh_token_expiry_time'),
    }
  }
}
