import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, User, UserDetails } from '../interface/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3700/users';
  registerUser(user:User){
    this.http.post(`${this.apiUrl}/register/`,user).subscribe(res=>{
      return res
    })
  }


  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/`, user).pipe(
      tap((result) => {
        
        const token = result.token;

       
        localStorage.setItem('token', token);
      })
    );
  }

  getUserDetails(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });

    return this.http.get<UserDetails[]>('http://localhost:3700/users/userDetails/', { headers });
  }

  

  isLoggedIn(): boolean {
   
    return !!localStorage.getItem('token');
  }
}
