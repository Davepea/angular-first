import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  deleteUsers(users: User[]): Observable<void> {
    const ids = users.map(user => user.id);
    return this.http.delete<void>(`${this.apiUrl}?ids=${ids.join(',')}`);
  }

  exportUsersToCSV(users: User[]): void {
    // Implement CSV export functionality here
  }
}