import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  isLoading = false;
  loginError = false;
  loginForm! : FormGroup

  constructor(private formBuilder:FormBuilder, private router:Router){
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

      this.router.navigate(['user'])
      
}
  }
}
