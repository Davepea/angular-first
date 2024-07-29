import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksKey = 'tasks';
  private usersKey = 'users';

  constructor() { }

  private getTasksFromStorage(): Task[] {
    const tasksJson = localStorage.getItem(this.tasksKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  private saveTasksToStorage(tasks: Task[]): void {
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
  }

  private getUsersFromStorage(): User[] {
    const usersJson = localStorage.getItem(this.usersKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsersToStorage(users: User[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  private getCurrentUserFromSession(): User | null {
    const userJson = sessionStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  getTasks(): Observable<Task[]> {
    const tasks = this.getTasksFromStorage();
    return of(tasks);
  }

  addTaskToUser(userId: string, taskId: string): Observable<void> {
    const users = this.getUsersFromStorage();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.taskIds = user.taskIds || [];
      user.taskIds.push(taskId);
      this.saveUsersToStorage(users);
    }
    return of();
  }

  removeTaskFromUser(userId: string, taskId: string): Observable<void> {
    const users = this.getUsersFromStorage();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.taskIds = user.taskIds || [];
      user.taskIds = user.taskIds.filter(id => id !== taskId);
      this.saveUsersToStorage(users);
    }
    return of();
  }
}
