import { FormControl, FormGroup } from "@angular/forms";

export function validateAllFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
        const control = formGroup.get(field);            
        if (control instanceof FormControl) {             
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {        
            this.validateAllFields(control);  
        }
    });}

export class PasswordViewHide{
    viewPasswordFlag:string='password';
    icon:string="pi pi-eye"
    viewPassword(){
        this.viewPasswordFlag='text';
        this.icon="pi pi-eye-slash"
      }
    hidePassword(){
        this.viewPasswordFlag="password";
        this.icon="pi pi-eye"
      }
}

export class ValidityCheck{
    checkInvalidTouched(form:FormGroup|FormControl,name){
    return (form.get(name).invalid && form.get(name).touched) ? 'ng-invalid ng-dirty' : ''
  }
}

