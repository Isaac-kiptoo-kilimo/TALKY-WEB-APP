import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comment, CommentDetails, Post, PostDetails } from 'src/app/interface/post';
import { User, UserDetails } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

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
  postUserID! : string;
  users!: User[];
  posts!: Post[];
  comments!: CommentDetails[];
  comPostID!: string;
  // postDetails!: PostDetails;
  clickedPostID! : string
  CommentclickedPostID! : string
  userDetails!: UserDetails ;
  showProfileDropdown: boolean = false;
  postUsername!: string;

constructor(private router:Router, private fb:FormBuilder,
  private userService: UserService,    private toastr: ToastrService,
  private authService: AuthService, private postService: PostService){
  this.commentForm = this.fb.group({
    content: ['', [Validators.required]]
  });

  
}

loggedInTrue = localStorage.getItem('loggedIn')


 ngOnInit() {
   
    this.getUsers();
    this.getPosts();
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
  

  // posts

  getPosts() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
      console.log(posts[0].username);
      console.log(posts[0].createdAt);
    },
    (error) => {
      console.error('Error fetching users:', error.error.message);
    });
  }


  
  clickedPost(clickedID: string) {
    console.log(clickedID);
    // Store the clicked post ID for later use
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
            // other properties...
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

  // commentPostClicked(commentPostClickedID: string) {
    
  //   if (commentPostClickedID) {
  //     this.postService.getPostComments(commentPostClickedID).subscribe(comments => {
  //       this.comments = comments;
  //       console.log(comments);
      
  //     });
  //   } else {
  //     console.error('Post ID is not available.');
  //   }
    
  // }
  
  
  getPostComments(postID: string): void {
    this.postService.getPostComments(postID).subscribe((comments) => {
      // Find the post index
      const postIndex = this.posts.findIndex((post) => post.postID === postID);

      // Update comments for the specific post
      if (postIndex !== -1) {
        this.posts[postIndex].comments = comments;
      }
    });
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

  

  viewProfile(){
    console.log("I am clickable");
    this.router.navigate(['profile'])
  }

  }
  




  


