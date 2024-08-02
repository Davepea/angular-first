import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private localStorageKey = 'users';
  private idCounterKey = 'userIdCounter';

  constructor() {}

  private getNextId(): string {
    const currentCounter = Number(localStorage.getItem(this.idCounterKey)) || 0;
    const newCounter = currentCounter + 1;
    localStorage.setItem(this.idCounterKey, newCounter.toString());
    return newCounter.toString();
  }

  getUsers(): Observable<User[]> {
    const users = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '[]'
    );
    return of(users);
  }

  addUser(user: User): Observable<User> {
    const users = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '[]'
    );
    user.id = this.getNextId();
    user.noOfTasks = user.taskIds ? user.taskIds.length : 0;
    users.push(user);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    return of(user);
  }

  deleteUsers(usersToDelete: User[]): Observable<void> {
    let users = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    users = users.filter(
      (user: User) => !usersToDelete.some((u) => u.id === user.id)
    );
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    return of();
  }

  updateUser(user: User): Observable<void> {
    let users = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    users = users.map((u: User) => (u.id === user.id ? user : u));
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    return of();
  }

  assignTasksToUsers(taskId: string, userIds: string[]): void {
    let users = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    users = users.map((user: User) => {
      if (userIds.includes(user.id)) {
        if (!user.taskIds) {
          user.taskIds = [];
        }
        if (!user.taskIds.includes(taskId)) {
          user.taskIds.push(taskId);
        }
        user.noOfTasks = user.taskIds.length;
      }
      return user;
    });
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  exportUsersToCSV(users: User[]): void {
    const csvData = this.convertToCSV(users);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'users.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private convertToCSV(users: User[]): string {
    const headers = ['User Name', 'Email', 'Is Admin', 'No of Tasks'];
    const rows = users.map((user) =>
      [user.userName, user.email, user.isAdmin, user.noOfTasks].join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  }
}
