import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadphotoService {

  constructor(private http: HttpClient) { }
  
  // uploadImage(data: FormData): Observable<any> {
  //   return this.http.post('https://api.cloudinary.com/dyisqzh7l/image/upload', data)
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error uploading image:', error);
  //         throw error; // Rethrow the error to be caught by the caller
  //       })
  //     );
  // }
  uploadImage (vals:any):Observable<any>{
    let data = vals;
    return this.http.post('https://api.cloudinary.com/v1_1/dyisqzh7l/image/upload', data)

  }

}
