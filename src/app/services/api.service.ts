import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private backendUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }
}
