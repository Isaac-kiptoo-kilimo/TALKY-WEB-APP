import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comment, CommentDetails, Post, PostDetails, updatedComment } from 'src/app/interface/post';
import { Follower, User, UserDetails, UserFollowStatus } from 'src/app/interface/user';
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
  visible : boolean =true  
  commentForm!: FormGroup;
  filter=''
  hide: boolean=true
  userID! : string;
  postUserID! : string;
  users: User[]=[];
  posts!: Post[];
  comments: CommentDetails[]=[];
  comPostID!: string;
  commentID: string='';
  updateCommentID :string ='';
  following!: string
  isFollowing = false;
  
  // postDetails!: PostDetails;
  clickedPostID! : string
  CommentclickedPostID! : string
  userDetails!: UserDetails ;
  showProfileDropdown: boolean = false;
  postUsername!: string;
  updateCommentForm! : FormGroup
  selectedPost: any;
  currentUserID: string='';
  followStatusMap: { [userID: string]: string } = {};
  postID!: string;
  likeCount!: number;
  isLiked!: boolean;


constructor(private router:Router, private fb:FormBuilder,
  private userService: UserService,    private toastr: ToastrService,
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
   
    this.getUsers();
    this.getPosts();
    this.getFollowings()
    this.getFollowers()
    this.getLikeInfo();
    
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
  let loggedInUserID = localStorage.getItem('userID');

  if (loggedInUserID !== null) {
    console.log(loggedInUserID);

    this.userService.getUsers(loggedInUserID).subscribe(
      (response) => {
        console.log(response);
        
        this.users = response;

        this.users.map(user=>{
          user.followStatus=this.followStatus
          console.log(user.followStatus);
          
        })
        
      },
      (error) => {
        console.error('Error fetching users:', error.error.message);
      }
    );
  } else {
    console.error('User ID is null.');
  }
}



  loadUsers(): void {
    let loggedInUserID = localStorage.getItem('userID');

    if (loggedInUserID !== null) {
      console.log(loggedInUserID);
  
      this.userService.getUsers(loggedInUserID).subscribe(
        (response) => {
          this.users = response;
        },
        (error) => {
          console.error('Error fetching users:', error.error.message);
        }
      );
    } else {
      console.error('User ID is null.');
    }
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


  showAllComments(post: Post): void {
    this.selectedPost = post;
    console.log(this.selectedPost);
    
    this.hidden = !this.hidden;
  }


 getAllPostComments(post: any): void {
  this.postService.getPostComments(post.postID).subscribe((comments) => {
    post.comments = comments;
    console.log(this.selectedPost.comments[0]?.profileImage);

  });
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


  viewProfile(){
    console.log("I am clickable");
    this.router.navigate(['profile'])
  }


  followers = []
  getFollowers() {
    const userID = localStorage.getItem('userID') ?? ''
    this.userService.getFollowers(userID).subscribe(
      (response) => {
        console.log('Followers:', response);
        this.followers = response
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

  toggleFollow(followerID: string) {
    console.log(followerID);
  
    this.followUnfollowUser(followerID);
  }
  
  followUnfollowUser(followedUserID: string) {
    let followingID = localStorage.getItem('userID');
  
    const data: any = {
      followingUserID: followingID,
      followedUserID: followedUserID,
    };
  
    console.log(data);
  
    this.userService.followUnfollowUser(data).subscribe(
      (response) => {
        console.log('Follow/Unfollow success:', response);
  console.log(response);
  
        // Assuming you have a userService method to get users, modify it accordingly
        this.userService.getUsers(this.userID).subscribe(
          (usersResponse) => {
            console.log(usersResponse);
  
            this.users = usersResponse;
  
            this.users.forEach((user) => {

              if(this.userID){
                user.followStatus = response.isFollowing ? 'Following' : 'Follow';
              console.log(user.followStatus);
              }
              const userFollowStatus = response.find((item:UserFollowStatus) => item.userID === user.userID);
              console.log(userFollowStatus);
            
            });
          },
          (error) => {
            console.error('Error fetching users:', error);
          }
        );
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
 
 
   getLikeInfo() {
    this.postService.getLikesForPost(this.postID).subscribe((likes) => {
      this.isLiked = likes.some((like:any) => like.userID === this.userID); // Replace 'your-userID' with the actual user ID
      this.getLikeCount();
    });
  }

  getLikeCount() {
    this.postService.getLikeCountForPost(this.postID).subscribe((count) => {
      this.likeCount = count;
    });
  }
  likePost() {
    this.postService
      .likePost({ userID: this.userID, postID: this.postID }) // Replace 'your-userID' with the actual user ID
      .subscribe(() => {
        this.isLiked = true;
        this.getLikeCount();
      });
  }

  unlikePost() {
    this.postService
      .unlikePost({ userID: this.userID, postID: this.postID }) // Replace 'your-userID' with the actual user ID
      .subscribe(() => {
        this.isLiked = false;
        this.getLikeCount();
      });
  }


  }
  




  


