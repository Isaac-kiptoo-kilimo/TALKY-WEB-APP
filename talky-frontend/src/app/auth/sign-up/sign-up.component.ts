import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm: FormGroup;
  loading: boolean = false; 

  constructor(private fb: FormBuilder,private router:Router) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  signupUser() {
    if(this.signupForm.valid){
    const signupnewUser=this.signupForm.value
    console.log(this.signupForm.value);
    
    this.loading = true;

   
    setTimeout(() => {
     
      this.loading = false;
    }, 6000);
    this.router.navigate([''])
  }else{
    console.log(Error);
    
  }
  }
    
  }

