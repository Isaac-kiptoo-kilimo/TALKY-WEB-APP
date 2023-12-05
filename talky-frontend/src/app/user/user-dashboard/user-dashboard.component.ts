import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  showPostButton = false;
constructor(private router:Router){

}
  postComment(){
    console.log("I am clickable");
    
  }

  viewProfile(){
    console.log("I am clickable");
    this.router.navigate(['profile'])
  }
}
