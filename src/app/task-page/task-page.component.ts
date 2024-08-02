import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../../models/task.model';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css'],
})
export class TaskPageComponent implements OnInit {
  tasks: Task[] = [];
  isCardView = true;

  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.tasks = this.taskService.getTasksForCurrentUser(currentUser.id);
    }
  }

  toggleView(): void {
    this.isCardView = !this.isCardView;
  }
}
