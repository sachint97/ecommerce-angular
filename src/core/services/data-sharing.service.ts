import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  emailOtpData:{"email":string,"otp":number}=undefined;
  constructor() { }
  shareToResetPassword(data:{"email":string,"otp":number}){
    this.emailOtpData=data;
  }
  get getEmailOtp(){
    return this.emailOtpData
  }
}
