import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserDetails } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  showPostButton = false;
  hidden: boolean= true
  loggedIn=true
  sidebarOpen: boolean = false;
  isLikeClicked = false;
  isLikeClicked2 = false;
  isLikeClicked3 = false;
  followStatus: string = 'Follow';
  followStatus2: string = 'Follow';
  followStatus3: string = 'Follow';
  followStatus4: string = 'Follow';
  visible : boolean =true  
  commentForm!: FormGroup;
  filter=''
  userID! : string;
  users!: User[];
  userDetails!: UserDetails ;
  showProfileDropdown: boolean = false;


constructor(private router:Router, private fb:FormBuilder,
  private userService: UserService,
  private authService: AuthService){
  this.commentForm = this.fb.group({
    commentText: ['', [Validators.required, Validators.maxLength(255)]]
  });
}

loggedInTrue = localStorage.getItem('loggedIn')


 ngOnInit() {
   
    this.getUsers();

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
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching users:',error.error.message);
      }
    );
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.loadUsers();
      },
      (error) => {
        console.error('Error fetching tours:', error);
      }
    );
  }

deleteUser(userID: string): void {
    alert('Are you sure You want to delete, this action is irreversible')
    this.userService.deleteUser(userID).subscribe(
      () => {
        this.loadUsers();
      },
      (error) => {
        console.error('Error deleting Tour:', error);
      }
    );
  }
  

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
  
  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

toggleLikeColor() {
  this.isLikeClicked = !this.isLikeClicked;
  console.log(this.isLikeClicked);
  
}


toggleLikeColor2() {
  this.isLikeClicked2 = !this.isLikeClicked2;
  console.log(this.isLikeClicked2);
  
}
toggleLikeColor3() {
  this.isLikeClicked3 = !this.isLikeClicked3;
  console.log(this.isLikeClicked3);
  
}

toggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;
}

toggleFollow() {
  
  this.followStatus = this.followStatus === 'Follow' ? 'Following' : 'Follow';
}

toggleFollow2() {
  
  this.followStatus2 = this.followStatus2 === 'Follow' ? 'Following' : 'Follow';
}
toggleFollow3() {
  
  this.followStatus3 = this.followStatus3 === 'Follow' ? 'Following' : 'Follow';
}
toggleFollow4() {
  
  this.followStatus4 = this.followStatus4 === 'Follow' ? 'Following' : 'Follow';
}

  postComment(){
    console.log("I am clickable");
    
  }

  viewProfile(){
    console.log("I am clickable");
    this.router.navigate(['profile'])
  }

  }
  




  


