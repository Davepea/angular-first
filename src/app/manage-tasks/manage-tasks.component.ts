import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.css']
})
export class ManageTasksComponent implements OnInit {
  tasks: Task[] = [];
  selectedTasks: Task[] = [];
  displayCreateTaskDialog = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  showCreateTaskDialog(): void {
    this.displayCreateTaskDialog = true;
  }

  hideCreateTaskDialog(): void {
    this.displayCreateTaskDialog = false;
  }

  onTaskAdded(): void {
    this.loadTasks();
  }

  anyTaskSelected(): boolean {
    return this.selectedTasks.length > 0;
  }

  deleteSelectedTasks(): void {
    if (this.selectedTasks.length > 0) {
      this.taskService.deleteTasks(this.selectedTasks).subscribe(() => {
        this.loadTasks();
        this.selectedTasks = [];
      });
    }
  }

  importTasksFromCSV(): void {
    // Implement CSV import functionality here
  }

  exportTasksToCSV(): void {
    this.taskService.exportTasksToCSV(this.tasks);
  }
}
