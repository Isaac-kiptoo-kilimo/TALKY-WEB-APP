import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;
  loginError = false;
  loginForm! : FormGroup

  constructor(private formBuilder:FormBuilder, private router:Router){
    this.loginForm=formBuilder.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required]]
    })
  }

  loginUser() {
    if (this.loginForm.valid) {
      const enteredEmail = this.loginForm.get('email')!.value;
  
      // Check if the entered email is correct
      if (enteredEmail === 'isaac@gmail.com') {
        // Email is correct, navigate to the "user" page
        console.log('Email is correct. Navigating to user page.');
        this.router.navigate(['user']);
      } else {
        // Incorrect email, log an error
        console.log('Incorrect email. Please enter the correct email.');
      }
    } else {
      // Form is not valid, log an error
      console.log('Form is not valid.');
    }
}
}
