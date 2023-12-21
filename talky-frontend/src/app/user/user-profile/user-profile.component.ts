import { Component } from '@angular/core';
import { User, UserDetails } from 'src/app/interface/user';
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
  users: any[] = [];
  loggedInUserID = localStorage.getItem('userID')
  user!: User;

  constructor( 
    private userService: UserService,
    private authService: AuthService){
   
  }
  
  loggedInTrue = localStorage.getItem('loggedIn')
  
  
   ngOnInit() {
     this.getUsers()
     
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

  getUsers() {
    let loggedInUserID = localStorage.getItem('userID');

    if (loggedInUserID !== null) {
      console.log(loggedInUserID);

      this.userService.getUsers(loggedInUserID).subscribe(
        (response) => {
          console.log(response);

          this.users = response;

          this.users.map(user => {
            this.user=user
            console.log(this.user);
            
          })

        },
        (error) => {
          console.error('Error fetching users:', error.error.message);
        }
      );
    } else {
      console.error('User ID is null.');
    }
  }
   
}
