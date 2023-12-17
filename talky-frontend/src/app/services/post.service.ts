import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentDetails, Post, PostDetails } from '../interface/post';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  createPost (post: PostDetails){
    return this.http.post('http://localhost:3700/posts/create', post)
    .pipe(
      catchError(error => {
        console.error('Error creating post:', error);
        throw error; 
      })
    );
  }

getPosts(): Observable<Post[]>{
  return this.http.get<Post[]>('http://localhost:3700/posts/all',{
    headers: {
      'Content-type': 'application/json',
    },
  });
}


  
  createComment(comment:any): Observable<any>{
    return this.http.post('http://localhost:3700/posts/addComment/', comment)

  }
  
  getPostComments(postID:string): Observable<CommentDetails[]>{
    console.log(postID);
    
    return this.http.get<CommentDetails[]>(`http://localhost:3700/posts/getpostcomments/${postID}`,{
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

  

  getComments(){
    return this.http.get('http://localhost:3700/posts/allComments',{
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

  followingPosts(following_user_id:string){
    return this.http.get(`http://localhost:3700/post/${following_user_id}`)

  }
}

