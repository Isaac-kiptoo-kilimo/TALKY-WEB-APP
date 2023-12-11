import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  showPostButton = false;
  hidden: boolean= true
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

  
constructor(private router:Router, private fb:FormBuilder){
  this.commentForm = this.fb.group({
    commentText: ['', [Validators.required, Validators.maxLength(255)]]
  });
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
