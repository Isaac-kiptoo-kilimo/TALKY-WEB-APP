export interface User {
    userID: string;
    fullName: string;
    username: string;
    email: string;
    password: string;
    role: string;
    profileImage: string,
    followStatus: string;
}


  export interface LoginResponse {
    user: User | undefined;
    token: string;
    userID:string;
    username: string
  }

  export interface userLogin {
    email: string,
    password : string
}


export interface UserDetails {
  userID:string;
  fullName: string;
  username: string;
  email: string;
  role:string;
  profileImage: string
}

export interface updatedUserData {
  userID:string;
  fullName: string;
  username: string;
 profileImage: string;
};

export interface Follower {
  followerID: string; 
  followerUserID: string;
  followingUserID: string;
}


export interface UserFollowStatus {
  userID: string;
  isFollowing: boolean;
}