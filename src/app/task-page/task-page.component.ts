// src/app/task-page/task-page.component.ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {
  tasks: Task[] = [];
  isCardView = true;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loading = true;

loadTasks(): void {
  this.taskService.getTasks().subscribe({
    next: (tasks: Task[]) => {
      this.tasks = tasks;
      this.loading = false;
    },
    error: (err) => {
      console.error('Failed to load tasks', err);
      this.loading = false;
      // Optionally, handle the error
    }
  });
}



  toggleView(): void {
    this.isCardView = !this.isCardView;
  }
}
