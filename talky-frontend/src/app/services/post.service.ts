import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostDetails } from '../interface/post';
import { catchError } from 'rxjs';

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
        throw error; // Rethrow the error to be caught by the caller
      })
    );
  }



  
  createComment(comment:Comment){
    return this.http.post('http://localhost:3700/post/comment', comment)

  }

  followingPosts(following_user_id:string){
    return this.http.get(`http://localhost:3700/post/${following_user_id}`)

  }
}
