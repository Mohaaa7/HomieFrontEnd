import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, {username, password});
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, {username, password, email});
  }

}
