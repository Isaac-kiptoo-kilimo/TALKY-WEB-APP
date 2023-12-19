import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentDetails, Post, PostDetails } from '../interface/post';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3700/users';

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
  updateComment(commentID: string, updatedComment: any): Observable<any> {
    console.log(updatedComment);
    console.log(commentID);
    
    
    return this.http.put(`http://localhost:3700/posts/updatecomment/${commentID}`, updatedComment);
  }

  deleteComent(commentID: string): Observable<any> {
    return this.http.delete(`http://localhost:3700/posts/deletecomment/${commentID}`)
   
  }

  
}

