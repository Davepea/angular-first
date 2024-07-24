import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTaskToUser(userId: string, taskId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add`, { userId, taskId });
  }

  removeTaskFromUser(userId: string, taskId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/remove`, { userId, taskId });
  }
}
