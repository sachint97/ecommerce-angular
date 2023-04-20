import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/core/services/app.service';
import { DataSharingService } from 'src/core/services/data-sharing.service';
import { PasswordViewHide,ValidityCheck,validateAllFields } from 'src/core/utilities/utils';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit{
  checkInvalid=new ValidityCheck()
  passwordView=new PasswordViewHide()
  ConfirmPasswordView=new PasswordViewHide()
  resetForm:FormGroup;
  emailOtp:{'email':string,'otp':number}
  constructor(private dataSharing:DataSharingService,private route:Router,private appService:AppService){

  }
  ngOnInit(): void {
    this.emailOtp=this.dataSharing.getEmailOtp;
    if (this.emailOtp===undefined){
      this.route.navigate(['user/forgot-password'])
    };
    this.form();
  }
  form(){
    this.resetForm=new FormGroup({
      'password':new FormControl('',[Validators.required]),
      'confirm-password':new FormControl('',[Validators.required]),
    });
  }
  changePassword(){
    if(this.resetForm.invalid){
      validateAllFields(this.resetForm);
    }else{
      const apiParam={
        "email":this.emailOtp.email,
        "otp":this.emailOtp.otp,
        "password":this.resetForm.get('password').value,
        "confirm_password":this.resetForm.get('confirm-password').value
      }
      console.log(apiParam)
      this.appService.post('user/forgot-password/reset-password/',apiParam).subscribe(resp=>{
        if(resp.status==200){
          this.route.navigate(['user/login/']);
        }
      })
    }
  }

}
