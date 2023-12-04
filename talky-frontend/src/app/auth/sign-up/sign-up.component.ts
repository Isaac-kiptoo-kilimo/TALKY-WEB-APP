import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  isPasswordsMismatched = false;
  signupForm! : FormGroup
  constructor(private formBuilder:FormBuilder ){

    this.signupForm= formBuilder.group({
      email:["",[Validators.required]],
      password:["",[Validators.required]]
    })
  }

  signupUser(){
    if(this.signupForm.valid){
      const signupUser=this.signupForm.value
      console.log(signupUser);
    }
    
  }
}
