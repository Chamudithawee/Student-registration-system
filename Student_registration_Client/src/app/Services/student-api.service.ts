import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../Models/Student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentAPIService {

  private apiUrl = 'http://localhost:5105/api/Student';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  addStudent(formData: FormData): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, formData);
  }

  updateStudent(id: number, formData: FormData): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, formData);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
