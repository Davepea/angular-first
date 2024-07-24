import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-add-task-popup',
  templateUrl: './add-task-popup.component.html',
  styleUrls: ['./add-task-popup.component.css']
})
export class AddTaskPopupComponent {
  @Input() visible: boolean = false;
  @Input() user: User | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() taskAdded = new EventEmitter<void>();

  tasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  save(): void {
    if (this.user && this.selectedTask) {
      this.taskService.addTaskToUser(this.user.id, this.selectedTask.id).subscribe(() => {
        this.taskAdded.emit();
      });
    }
  }

  cancel(): void {
    this.visibleChange.emit(false);
  }
}
