import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isAuthenticated : any;
  userID!: User;

  constructor(private router:Router) { }

  ngOnInit(): void {
  
  }

  toUserProfile(){
    this.router.navigate(['/user/'+ this.userID]);
  }

  logOut(){
     
  }
// ngOnDestroy(){
//   this.authStatusSubscription.unsubscribe();
// }  
}
