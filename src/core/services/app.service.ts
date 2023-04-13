import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/model';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  get(url:string){
    return this.http.get<any>(url);
  }
}
