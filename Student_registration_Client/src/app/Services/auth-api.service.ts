import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIService {

  private baseUrl = 'http://localhost:5105/api/Auth';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token); // Store token in localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Retrieve token from localStorage
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null; // Check if token exists
  }
  
}
