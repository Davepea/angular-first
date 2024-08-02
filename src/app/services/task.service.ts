import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../../models/user.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private localStorageKey = 'tasks';

  tasks: Subject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private userService: UserService) {}

  loadTasks(): void {
    const tasks = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    this.tasks.next(tasks);
  }

  getTasks(): Task[] {
    const tasks = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    return tasks;
  }

  getTasksForCurrentUser(userId: string): Task[] {
    const tasks = this.getTasks();
    return tasks.filter(task => task.userIds.includes(userId));
  }

  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
    this.tasks.next(tasks);
  }

  deleteTasks(tasksToDelete: Task[]): Observable<void> {
    let tasks = this.getTasks();
    const tasksToDeleteIds = tasksToDelete.map(task => task.id);
    tasks = tasks.filter((task: Task) => !tasksToDeleteIds.includes(task.id));
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
    this.tasks.next(tasks);
    return of();
  }


  addTaskToUser(userId: string, taskId: string): Observable<void> {
    return this.userService.getUsers().pipe(
      switchMap((users) => {
        const user = users.find((user: User) => user.id === userId);
        if (user) {
          user.taskIds = user.taskIds || [];
          if (!user.taskIds.includes(taskId)) {
            user.taskIds.push(taskId);
            this.userService.updateUser(user).subscribe();
          }
        }
        return of();
      })
    );
  }

  removeTaskFromUser(userId: string, taskId: string): Observable<void> {
    return this.userService.getUsers().pipe(
      switchMap((users) => {
        const user = users.find((user: User) => user.id === userId);
        if (user) {
          user.taskIds = user.taskIds || [];
          user.taskIds = user.taskIds.filter((id: string) => id !== taskId);
          this.userService.updateUser(user).subscribe();
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
    const rows = tasks.map((task) =>
      [task.name, task.description, task.userIds.length].join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  }
}
