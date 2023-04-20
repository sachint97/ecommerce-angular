import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/core/services/app.service';
import { validateAllFields,ValidityCheck,PasswordViewHide } from 'src/core/utilities/utils';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  registerForm:FormGroup;
  checkValidity=new ValidityCheck()
  passwordView=new PasswordViewHide()
  confirmPasswordView=new PasswordViewHide()

  constructor(private route:Router,private appService:AppService){ 
  }

  ngOnInit(): void {
    this.form();
  }

  form(){
    this.registerForm=new FormGroup({
      first_name:new FormControl('',[Validators.required]),
      last_name:new FormControl('',[Validators.required]),
      username:new FormControl('',[Validators.required]),
      phone:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
      confirm_password:new FormControl('',[Validators.required]),
    })
  }
  signup(){
    if(this.registerForm.invalid){
      validateAllFields(this.registerForm)
    }else{
      this.appService.post('user/signup/',this.registerForm.value).subscribe(resp=>{
        console.log(resp)
        this.route.navigate(['user/login']);
      })

    }
  }
}
