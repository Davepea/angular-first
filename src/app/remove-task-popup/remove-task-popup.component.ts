import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-remove-task-popup',
  templateUrl: './remove-task-popup.component.html',
  styleUrls: ['./remove-task-popup.component.css'],
})
export class RemoveTaskPopupComponent {
  @Input() visible: boolean = false;
  @Input() user: User | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() taskRemoved = new EventEmitter<void>();

  tasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  save(): void {
    if (this.user && this.selectedTask) {
      this.taskService
        .removeTaskFromUser(this.user.id, this.selectedTask.id)
        .subscribe(() => {
          this.taskRemoved.emit(); // No arguments here
        });
    }
  }

  cancel(): void {
    this.visibleChange.emit(false);
  }
}
