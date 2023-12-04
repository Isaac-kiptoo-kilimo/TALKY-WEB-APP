import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;
  loginError = false;
  loginForm! : FormGroup

  constructor(private formBuilder:FormBuilder){
    this.loginForm=formBuilder.group({
      fullName:["",[Validators.required]],
      username:["",[Validators.required]],
      profileImage:["",[Validators.required]],
      email:["",[Validators.required]],
      password:["",[Validators.required]]
    })
  }

  loginUser() {
    if (this.loginForm.invalid) {

      const loginUserForm=this.loginForm.value
      console.log(loginUserForm);
      
}
  }
}
