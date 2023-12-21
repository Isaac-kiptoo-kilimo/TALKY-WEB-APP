import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  isLoading = false;
  loginError = false;
  resetPasswordForm!: FormGroup

constructor(private formBuilder:FormBuilder, private userService: UserService, private router:Router){
  this.resetPasswordForm=this.formBuilder.group({
    email:['',[Validators.required]],
    resetToken:['',[Validators.required]],
    newPassword:['',[Validators.required]]
  })
}

resetPassword(){
  if(this.resetPasswordForm.valid){
    const resetPassword=this.resetPasswordForm.value
    console.log(resetPassword);
    
    this.userService.resetPassword(resetPassword)
    
      this.router.navigate(['']);

  }else{
    this.resetPasswordForm.markAllAsTouched()
  }
}


}
