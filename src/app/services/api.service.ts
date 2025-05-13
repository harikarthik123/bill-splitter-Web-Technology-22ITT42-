import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:5000/api/tours';

  constructor(private http: HttpClient) {}

  // Get all tours
  getTours(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Create a new tour
  createTour(data: { name: string; participants: string[] }): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // Add an expense to a tour
  addExpense(tourId: string, expense: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${tourId}/expenses`, expense);
  }

  // Get summary (balances) for a tour
  getSummary(tourId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${tourId}/summary`);
  }
}
