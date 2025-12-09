import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  // Login: guarda el token en localStorage
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

  // Logout: elimina el token
  logout() {
    localStorage.removeItem('token');
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Saber si el usuario está logueado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Headers con el token para peticiones protegidas
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, {username, password, email});
  }

}
