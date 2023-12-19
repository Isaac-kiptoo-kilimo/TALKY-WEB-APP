import { Component,OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
  trigger('fadeInOut', [
      transition('fadeIn => fadeOut', [
        animate('1000ms', style({ opacity: 0 })),
      ]),
      transition('fadeOut => fadeIn', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
    ]),
  ]
  
})
export class LoginComponent implements OnInit {
  showFirstImage = true;

  isLoading = false;
  loginError = false;
  loginForm! : FormGroup
  errorMessage!: string;
  successMessage!: string ;
  loggingIn: boolean = false;
  loggedInState: boolean = false;
  loggedIn: boolean = false;
  link: string="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbCJx8zUpYCC7W5d-Izs3lxB_AgyhigLYzQw&usqp=CAU"
  

  constructor(private formBuilder:FormBuilder, private router:Router, private authService:AuthService, private userService: UserService){
    this.loginForm=formBuilder.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required]]
    })
  }

  ngOnInit() {
    interval(5000)
    .pipe(takeWhile(() => true))
    .subscribe(() => {
      this.showFirstImage = !this.showFirstImage;
    });
  }


  loginUser() {
    
  if (this.loginForm.invalid) {
    return;
  }

  const data = this.loginForm.value;

  this.loggingIn = true;

  this.authService.login(data).subscribe(
    (result) => {

      const token = result.token;
      localStorage.setItem('token', token);

      console.log('Login successful. Token:', token); 

     
      
      this.userService.checkDetails().subscribe(
        
        (user:User) => {
          console.log(user ); 
          this.loggedInState = true;
          this.link = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUIqAiC9hh11wMKEMA12TnXyz7Uw1qqHuWTrA6IFHxhA&s';
          this.successMessage = 'Logged in successfully.';
          setTimeout(() => {
            this.successMessage = '';
            this.loggingIn = false;

            localStorage.setItem('userID',user.userID)
            localStorage.setItem('username',user.username)
            localStorage.setItem('fullname',user.fullName)
            localStorage.setItem('profileImage',user.profileImage)
            localStorage.setItem('role',user.role)

            if (user.role === 'Admin') {
              this.router.navigate(['admin']);

            } else if (user.role === 'user') {
              this.router.navigate(['user']);
            }
          }, 2000);
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    },
    (error) => {
      console.error('Error during login:', error);
      if (error.status === 401) {
        this.errorMessage = 'Invalid email or password.';
      } else {
        this.errorMessage = error.error.error;
      }
      setTimeout(() => {
        this.errorMessage = '';
        this.loggingIn = false;
      }, 3000);
    }
  );
}

}

