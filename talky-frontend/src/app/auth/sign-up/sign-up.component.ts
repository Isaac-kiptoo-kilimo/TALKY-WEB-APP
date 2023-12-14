import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm: FormGroup;
  loading: boolean = false; 

  constructor(private fb: FormBuilder,private router:Router,private authService:AuthService) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

 

  getErrorMessage(controlName: string) {
    const control = this.signupForm.get(controlName);
    return control?.hasError('required') ? 'This field is required' :
      control?.hasError('email') ? 'Not a valid email' :
        '';
  }
  
  registerUser(){
    if (this.signupForm.valid) {
      let registeredUser = this.signupForm.value;
      this.authService.registerUser(registeredUser);
      this.router.navigate(['']);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

    
  }

