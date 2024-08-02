import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../../models/user.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localStorageKey = 'tasks';

  constructor(private userService: UserService) { }

  getTasks(): Observable<Task[]> {
    const tasks = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    return of(tasks);
  }

  addTask(task: Task): Observable<Task> {
    const tasks = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    tasks.push(task);
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
    return of(task);
  }

  deleteTasks(tasksToDelete: Task[]): Observable<void> {
    let tasks = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    tasks = tasks.filter((task: Task) => !tasksToDelete.includes(task));
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
    return of();
  }

  addTaskToUser(userId: string, taskId: string): Observable<void> {
    return this.userService.getUsers().pipe(
      switchMap(users => {
        const user = users.find((user: User) => user.id === userId);
        if (user) {
          user.taskIds = user.taskIds || [];
          if (!user.taskIds.includes(taskId)) {
            user.taskIds.push(taskId);
            console.log('Updating user with new task:', user); // Debugging log
            this.userService.updateUser(user).subscribe(() => {
              console.log('User updated successfully:', user); // Debugging log
            }, error => {
              console.error('Error updating user:', error); // Debugging log
            });
          }
        } else {
          console.warn('User not found:', userId); // Debugging log
        }
        return of();
      })
    );
  }

  removeTaskFromUser(userId: string, taskId: string): Observable<void> {
    return this.userService.getUsers().pipe(
      switchMap(users => {
        const user = users.find((user: User) => user.id === userId);
        if (user) {
          user.taskIds = user.taskIds || [];
          user.taskIds = user.taskIds.filter((id: string) => id !== taskId);
          console.log('Removing task from user:', user); // Debugging log
          this.userService.updateUser(user).subscribe(() => {
            console.log('User updated successfully:', user); // Debugging log
          }, error => {
            console.error('Error updating user:', error); // Debugging log
          });
        } else {
          console.warn('User not found:', userId); // Debugging log
        }
        return of();
      })
    );
  }

  exportTasksToCSV(tasks: Task[]): void {
    const csvData = this.convertToCSV(tasks);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'tasks.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private convertToCSV(tasks: Task[]): string {
    const headers = ['Task Name', 'Task Description', 'No of Users'];
    const rows = tasks.map(task => [task.name, task.description, task.userIds.length].join(','));
    return [headers.join(','), ...rows].join('\n');
  }
}
