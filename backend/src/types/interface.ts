export interface User{
    userID: string,
    fullName: string;
    username: string;
    email: string;
    profileImage: string;
    gender: string;
    role: string;
    CreatedAt: string;
    UpdatedAt: string;
    password: string;
}

  

export  interface Post {
    PostID: string;
    UserID: string;
    Content: string;
    LikesCount: number;
    CreatedAt: string; 
    UpdatedAt: string;
  }
  

  export interface Comment {
    CommentID: string; 
    PostID: string;
    UserID: string;
    ParentCommentID?: string; 
    Content: string;
    LikesCount: number; 
    CreatedAt: string; 
    UpdatedAt: string; 
  }
  

  export interface Follower {
    FollowerID: string; 
    FollowerUserID: string;
    FollowedUserID: string;
    CreatedAt:string; 
  }
  
  
  export interface Like {
    LikeID: string; 
    UserID: string;
    PostID: string; 
    CommentID: string; 
    CreatedAt:string; 
  }
  