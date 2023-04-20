import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/core/services/app.service';
import { DataSharingService } from 'src/core/services/data-sharing.service';
import { ValidityCheck,validateAllFields } from 'src/core/utilities/utils';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit{
  otpSent:boolean=false;
  emailForm:FormGroup;
  otpForm:FormGroup;
  checkInvalid=new ValidityCheck()
  constructor(private router:Router,private appService:AppService,private dataSharing:DataSharingService){
  }

  ngOnInit(): void {
    this.form();
  }
  form(){
    this.emailForm=new FormGroup({
      email:new FormControl('',[Validators.required]),
      phone:new FormControl({value: '', disabled: true})
    })
    this.otpForm=new FormGroup({
      digit1:new FormControl('',[Validators.required]),
      digit2:new FormControl('',[Validators.required]),
      digit3:new FormControl('',[Validators.required]),
      digit4:new FormControl('',[Validators.required])
    })
  }
  sendOtp(){
    if (this.emailForm.invalid){
      validateAllFields(this.emailForm);
    }else{
      this.appService.post('user/forgot-password/',this.emailForm.value).subscribe(resp=>{
        if (resp.status==200){
          this.otpSent=true;
        }
      })
    }
    
  }
  verifyOtp(){
    if (this.emailForm.invalid){
      validateAllFields(this.otpForm);
    }else{
      let apiParms = {
        otp: parseInt(
          `${this.otpForm.value.digit1}`.toString() +
            `${this.otpForm.value.digit2}`.toString() +
            `${this.otpForm.value.digit3}`.toString() +
            `${this.otpForm.value.digit4}`.toString() 
        ),
        email:this.emailForm.get('email').value,
      };
      this.appService.post('user/forgot-password/otp-verification/',apiParms).subscribe(resp=>{
        this.dataSharing.shareToResetPassword(apiParms);
        this.router.navigate(['user/reset-password/']);}
      )
      }
  }

  onDigitInput(event,previous,current,next) {
    var length =current.value.length
    var maxLength = current.getAttribute('maxLength')
    
    if(length == maxLength){
      if(next != ''){
        next.focus();
      }
    }
    
    if(event.code === 'Backspace'|| event.code === 'ArrowLeft' ||event.keyCode === 8){
      
      if( previous!= ''){
        previous.focus()
      }
    }else if(event.code === 'ArrowRight'){
  
      if(next != ''){
        next.focus();
      }
    }
    else if(event.code === 'Enter'){
      this.verifyOtp()
    }   
      
  }
}
