import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentDetails,Comment, Post, updatedComment } from 'src/app/interface/post';
import { User, UserDetails } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  hidden: boolean=true
  isLikeClicked = false;
  isLikeClicked2 = false;
  isLikeClicked3 = false;

  comments: CommentDetails[]=[];
  comPostID!: string;
  commentID: string='';
  updateCommentID :string ='';
  following!: string
  isFollowing = false;
  userID! : string;
  users: User[]=[];
  posts!: Post[];  clickedPostID! : string
  CommentclickedPostID! : string
  userDetails!: UserDetails ;
  showProfileDropdown: boolean = false;
  postUsername!: string;
  updateCommentForm! : FormGroup
  commentForm!: FormGroup;
  currentUserID: string='';
  followStatusMap: { [userID: string]: string } = {};


constructor(private router:Router, private fb:FormBuilder,
  private userService: UserService, private toastr: ToastrService,
  private authService: AuthService, private postService: PostService){

  this.commentForm = this.fb.group({
    content: ['', [Validators.required]]
  });

  this.updateCommentForm= this.fb.group({
    content: ['', [Validators.required]]
  })
  
}

loggedInTrue = localStorage.getItem('loggedIn')
myID = localStorage.getItem('userID') as string;

 ngOnInit() {
   
    this.getPosts(); 
    
 }


 getPosts() {
  this.postService.getPosts().subscribe((posts) => {
    this.posts = posts;
    console.log(posts);
    
    console.log(posts[0].username);
    console.log(posts[0].createdAt);
    console.log(posts[1].mediaFile);
  },
  (error) => {
    console.error('Error fetching users:', error.error.message);
  });
}




clickedPost(clickedID: string) {
  console.log(clickedID);
  this.clickedPostID = clickedID;
}


postComment() {
 
  
  if (this.commentForm.valid && this.clickedPostID) {
    this.authService.getUserDetails().subscribe(
      (userDetails) => {
        // Assuming userDetails contains the user ID
        const userID = userDetails[0].userID;
      console.log(userID);

        const commentedPost: Comment = {
          postID: this.clickedPostID,
          userID: userID,
          content: this.commentForm.value.content,

        };
        console.log(commentedPost);

        this.postService.createComment(commentedPost).subscribe(
          (res) => {
            console.log(res);
            this.getPostComments(commentedPost.postID)
            this.toastr.success('Comment submitted successfully!', 'Success');
            console.log("Comment created");
            this.commentForm.reset();
          },
          (error) => {
            console.error('Error creating comment:', error);
            this.toastr.error('Error submitting comment', 'Error');
          }
        );
      },
      (error) => {
        console.error('Error getting user details:', error);
      }
    );
  } else {
    console.log("Error in creating comment");
  }
}



getPostComments(postID: string): void {
  this.postService.getPostComments(postID).subscribe((comments) => {
    
    const postIndex = this.posts.findIndex((post) => post.postID === postID);

    
    if (postIndex !== -1) {
      this.posts[postIndex].comments = comments;
    }
  });
}


deleteComment(commentID: string): void {
  alert('Are you sure You want to delete, this action is irreversible')
  this.postService.deleteComent(commentID).subscribe(
    () => {
      // this.getPostComments();
    },
    (error) => {
      console.error('Error deleting comment:', error);
    }
  );
}



clickUpdateCommentID(commentID: string) {
  this.updateCommentID = commentID;

  if (this.userID) {
    console.log(this.userID);
    
  } else {
    console.error('You are not allowed to edit this comment.');
  }
}

updateComment(postID:string) {
  if (this.updateCommentForm.invalid || !this.updateCommentID) {
    console.error('Invalid Comment or commentID');
    return;
  }

  const updatedContent: string = this.updateCommentForm.value.content;
  const updatedComment: updatedComment = {
    userID: this.userID, 
    content: updatedContent
  };
  console.log(updatedComment);

  this.postService.updateComment(this.updateCommentID, updatedComment).subscribe(
    (response) => {
      console.log('Comment updated successfully', response);
      this.getPostComments(postID);
      this.updateCommentForm.reset();
    },
    (error) => {
      console.error('Error updating Comment', error);
    }
  );
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

}
