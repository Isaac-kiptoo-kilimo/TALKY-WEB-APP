export interface User{
    userID: string,
    fullName: string;
    username: string;
    email: string;
    profileImage: string;
    gender: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    password: string;
}


export  interface Post {
    postID: string;
    userID: string;
    caption: string;
    postImage: string;
    createdAt: string; 
    updatedAt: string;
  }
  
  export interface Comment {
    commentID: string; 
    postID: string;
    userID: string;
    content: string;
    createdAt: string; 
    updatedAt: string; 
  }

  export interface Reply {
    replyID: string;
    userID: string;
    commentID: string;
    text: string;
    createdAt: string;
  }
  export interface Follower {
    followerID: string; 
    userID: string;
    followerUserID: string;
    createdAt:string; 
  }
  
  export interface Following {
    followingID: string; 
    userID: string;
    followingUserID: string;
    createdAt:string; 
  }
  
  export interface Like {
    likeID: string; 
    userID: string;
    postID: string; 
    createdAt:string; 
  }

  export interface commentLike {
    likeID: string; 
    userID: string;
    postID: string; 
    commentID: string; 
    createdAt:string; 
  }
  

  