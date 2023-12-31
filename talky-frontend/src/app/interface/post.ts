
export interface PostDetails {
  postID: string;
  userID: string;
  caption: string;
  createdAt: string;
  mediaFile: string;
}


export interface Post {
  comments: any;
  postID: string;
  userID: string;
  username: string;
  fullName: string;
  profileImage: string;
  caption: string;
  createdAt: Date;
  mediaFile: string;
  likesCount: number;
  postLikesCount: number;
}
export interface Like {
  postID: string;
  userID: string;
  caption: string;
  createdAt: string;
}

export interface Comment {
  postID: string;
  userID: string;
  content: string;
}

export interface updatedComment {
  userID: string;
  content: string;
}

export interface CommentDetails {
  postID: string;
  userID: string;
  commentID: string;
  username: string;
  fullName: string;
  profileImage: string;
  caption: string;
  createdAt: Date;
  mediaFile: string;
  content: string;
}


export interface PostWithComments extends Post {
  comments: CommentDetails[];
}


export interface Reply {
  replyID: string
  userID: string
  commentID: string
  text: string
  createdAt: string
}