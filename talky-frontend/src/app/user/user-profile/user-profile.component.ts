import { Component } from '@angular/core';
import { UserDetails } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  isFormVisible: boolean=true;
  isVisible : boolean=true
  notVisible: boolean=true
  hidden: boolean= true
  userID! : string;
  userDetails!: UserDetails ;

  constructor( 
    private userService: UserService,
    private authService: AuthService){
   
  }
  
  loggedInTrue = localStorage.getItem('loggedIn')
  
  
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
}
