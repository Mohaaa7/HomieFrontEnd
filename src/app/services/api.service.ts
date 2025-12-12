import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return new Observable(observer => {
      this.http.post(`${this.API_URL}/login`, { username, password }).subscribe({
        next: (res: any) => {
          if (res.access_token) {
            localStorage.setItem('token', res.access_token);
          }
          observer.next(res);
        },
        error: err => observer.error(err)
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, {username, password, email});
  }

  predictPrice(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/predictPrice`, data);
  }

  addVivienda(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/addVivienda`, data, { headers: this.getAuthHeaders() });
  }

  showViviendas(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/guardados/${id}`, { headers: this.getAuthHeaders() });
  }

  deleteVivienda(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/deleteVivienda/${id}`, { headers: this.getAuthHeaders() });
  }

}
