import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/core/services/app.service';
import { validateAllFields,PasswordViewHide,ValidityCheck } from 'src/core/utilities/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup;
  passwordView=new PasswordViewHide();
  checkInvalid=new ValidityCheck()
  constructor(private appService:AppService,private route:Router){

  }
  ngOnInit(): void {
    this.form();
  }
  form(){
    this.loginForm=new FormGroup({
      username : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required])
    }
    );
  }
  login(){
    if(this.loginForm.invalid){
      validateAllFields(this.loginForm)
    }else{
      this.appService.post('user/login/',this.loginForm.value).subscribe(resp=>{
        this.appService.storeTokenInLocalStorage(resp.data);
        this.route.navigate(['/'])
      })
    }
  }
}
