// src/app/services/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../model/quiz';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000/api';  // URL du backend Express

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir le message du backend
  getMessage(): Observable<any> {
    return this.http.get(`${this.baseUrl}/message`);
  }


  getQuiz(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/quiz`);
  }
}
