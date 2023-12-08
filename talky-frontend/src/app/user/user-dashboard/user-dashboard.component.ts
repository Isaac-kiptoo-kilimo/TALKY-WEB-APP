import { Component } from '@angular/core';
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

constructor(private router:Router){

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
  postComment(){
    console.log("I am clickable");
    
  }

  viewProfile(){
    console.log("I am clickable");
    this.router.navigate(['profile'])
  }
}
