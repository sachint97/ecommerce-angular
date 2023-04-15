import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';



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
}
