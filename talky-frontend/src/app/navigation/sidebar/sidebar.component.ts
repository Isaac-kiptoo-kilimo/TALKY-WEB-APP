import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User, UserDetails } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isAuthenticated : any;
  loggedIn=true
  userDetails!: UserDetails ;
  userID! : string;
  users!: User[];
  visible : boolean =true     
  constructor(private router:Router,private fb:FormBuilder,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
   
    

    if (this.authService.isLoggedIn()) {
     
      this.authService.getUserDetails().subscribe(
        (userDetails) => {
          console.log(userDetails[0].fullName);
          
          this.userDetails = userDetails[0];
          this.userID = userDetails[0].userID;
         
        },
        (error) => {
          console.error('Error getting user details:', error);
        }
      );
    }
    
 }
  toUserProfile(){
    this.router.navigate(['/user/'+ this.userID]);
  }

  logOut(){
     
  }
  loggedInTrue = localStorage.getItem('loggedIn')

  checkLoggedIn(){

    console.log(this.loggedInTrue);
    if(this.loggedInTrue == 'true'){
     
    }
  }
  
  logout() {
    this.router.navigate(['']);
    localStorage.clear();
    this.loggedIn = false;
  }
// ngOnDestroy(){
//   this.authStatusSubscription.unsubscribe();
// }  
}
