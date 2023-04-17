import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  otpSent:boolean=false;

  constructor(private router:Router){

  }

  sendOtp(){
    this.otpSent=true;
  }
  verifyOtp(){
    this.router.navigate(['user/reset-password/']);
  }
}
