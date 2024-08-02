import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-add-task-popup',
  templateUrl: './add-task-popup.component.html',
  styleUrls: ['./add-task-popup.component.css']
})
export class AddTaskPopupComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() user: User | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() taskAdded = new EventEmitter<void>();

  tasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      console.log('Fetched tasks:', tasks); // Debugging log
      this.tasks = tasks;
    });
  }

  save(): void {
    if (this.user && this.selectedTask) {
      console.log('Saving task:', this.selectedTask); // Debugging log
      this.taskService.addTaskToUser(this.user.id, this.selectedTask.id).subscribe(() => {
        console.log('Task added successfully'); // Debugging log
        this.taskAdded.emit();
        this.visible = false; // Close the dialog on success
        this.visibleChange.emit(this.visible); // Notify parent component
      }, error => {
        console.error('Error adding task:', error); // Debugging log
      });
    }
  }

  cancel(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible); // Notify parent component
  }
}
