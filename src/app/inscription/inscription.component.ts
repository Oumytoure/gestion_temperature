import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators, } from '@angular/forms';
import { MustMatch } from '../must.match';

/* import { UsernameValidator } from 'src/app/username.validator'; */


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  confirmation: any;
  mot_pass: any;
  
  registerForm!:FormGroup
  submitted=false
  keyup: any;
  verifPass:any=true;
 
 
  constructor(private formBuilder:FormBuilder){

  }

  ngOnInit(){
    this.registerForm = this.formBuilder.group({

      prenom:['',[Validators.required]],
      nom:['',[Validators.required ]],
      email:['',[Validators.required,Validators.email]],
        role:['',Validators.required],
        mot_pass:['',[Validators.required,Validators.minLength(8)]],
        confirmation: ['', Validators.required ],
        
      })   
    
    }
  
  

    checkPassword =()=>{  
    let pass1 = (<HTMLInputElement>document.getElementById("pass1")).value; 
    let pass2 = (<HTMLInputElement>document.getElementById("pass2")).value;  
     console.log(pass1 != pass2)     
    if( pass1 != pass2)    
     {     
      this.verifPass = false;   
      console.log(this.verifPass) 
       this.registerForm = this.formBuilder.group( {       
                                        
          mot_pass:[''],   
          confirmation:[''],      
          })     
       setTimeout(()=>{ this.verifPass = true}, 3000);          
      } 
     }

      
   
  onSubmit() {
  this.submitted=true
  if(this.registerForm.invalid){
    return;
  }
}
  }

  




// custom validator to check that two fields match
/* export function MustMatch(ControlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[ControlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    } */




