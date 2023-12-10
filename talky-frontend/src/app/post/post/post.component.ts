import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  hidden: boolean= true
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

  postComment(){
    console.log("I am clickable");
    
  }
}
