import { Component } from '@angular/core';

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

}
