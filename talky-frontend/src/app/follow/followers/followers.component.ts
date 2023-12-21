import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent {
isVisible : boolean=true
following: any[]=[]
followers: any[] = [];
  

constructor(private router:Router,
  private userService: UserService){

  
}


ngOnInit() {

  this.getFollowers();
  this.getFollowings()
}

getFollowers() {
  const userID = localStorage.getItem('userID') ?? '';
  this.userService.getFollowers(userID).subscribe(
    (response) => {
      this.followers = response;
      console.log(this.followers);
      
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}



getFollowings() {
  const userID = localStorage.getItem('userID') ?? ''
  this.userService.getFollowings(userID).subscribe(
    (response) => {
      this.following=response
      console.log('Following:', response);
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}

  
}
