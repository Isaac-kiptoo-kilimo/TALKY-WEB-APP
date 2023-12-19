import { Injectable } from '@angular/core';
import { Follower, User, UserDetails, updatedUserData } from '../interface/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:3700/users/checkUserDetails/';
  userID!: UserDetails;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // getUsers(loggedInUserID: string): Observable<User[]> {
  //   const token = localStorage.getItem('token') as string;
  //   return this.http.get<User[]>(`http://localhost:3700/users/all/${loggedInUserID}`, {
  //     headers: {
  //       'Content-type': 'application/json',
  //       token: token,
  //     },
  //   });
  // }

  getUsers(loggedInUserID: string): Observable<User[]> {
    const token = localStorage.getItem('token') as string;
    
    return this.http.get<User[]>(`http://localhost:3700/users/all/${loggedInUserID}`, {
      headers: {
        'Content-type': 'application/json',
        token: token,
      }
    });
  }



  checkDetails(): Observable<User> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: token,
    });

    return this.http
      .get<any>(this.apiUrl, { headers })
      .pipe(map((data) => data.info));
  }


updateUserById(updatedUser:updatedUserData): Observable<any> {
  return this.authService.getUserDetails().pipe(
    switchMap((user) => {
      console.log(user[0].userID);
      let userID=user[0].userID
      const token = localStorage.getItem('token') || '';
      console.log(token);

      const url = `http://localhost:3700/users/update/${userID}`;

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          token: token,
        });


        return this.http.put(url, updatedUser, { headers });
      })
    );
  }


// updateUser(user: any, token: string): Observable<any> {
//   const url = `${this.baseUrl}`;
//   return this.http.put(url, user, {
//     headers: this.getHeadersWithToken(token),
//   });
// }

deleteUser(userID: string): Observable<any> {
  return this.http.delete(`http://localhost:3700/users/delete/${userID}`)
 
}
 

  initializePasswordReset(user:User){
    this.http.post('http://localhost:3700/users/initiate-password-reset/',user).subscribe(res=>{
      return res
    })
  }

  resetPassword(user:User){
    this.http.post('http://localhost:3700/users/reset-password/',user).subscribe(res=>{
      console.log(res);
      
      return res
    })
  }


  followUnfollowUser(data : Follower): Observable<any> {
    
    return this.http.post('http://localhost:3700/users/followUnfollowUser/', data);
  }



  getFollowers(userID: string): Observable<any> {
    
    return this.http.get(`http://localhost:3700/users/getFollowings/${userID}`);
  }

  getFollowings(userID: string): Observable<any> {
    
    return this.http.get(`http://localhost:3700/users/getFollowers/${userID}`);
  }
}
