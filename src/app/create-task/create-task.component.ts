import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';  // Adjust the import path as necessary
import { UserService } from '../services/user.service';  // Adjust the import path as necessary
import { Task } from '../../models/task.model';  // Adjust the import path as necessary
import { User } from '../../models/user.model';  // Adjust the import path as necessary

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  @Input() display: boolean = false; // Input is boolean
  @Output() hide = new EventEmitter<void>(); // Output is EventEmitter

  task: Task = {
    id: '',
    name: '',
    description: '',
    userIds: [],
  };
  users: User[] = []; // To store users from the service
  selectedUsers: string[] = []; // To store selected user IDs

  constructor(private taskService: TaskService, private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      console.log('Loaded users:', users); // Verify data loading
      this.users = users;
    });
  }

  createTask() {
    this.task.id = Date.now().toString(); // Generate a unique string ID for the task
    this.task.userIds = this.selectedUsers; // Assign selected user IDs to task.userIds
    this.taskService.addTask(this.task).subscribe(() => {
      this.userService.assignTasksToUsers(this.task.id, this.selectedUsers).subscribe(() => {
        this.resetForm();
        this.onHide(); // Hide the dialog after saving
      });
    });
  }

  onHide() {
    this.hide.emit(); // Emit the hide event
  }

  resetForm() {
    this.task = { id: '', name: '', description: '', userIds: [] }; // Reset the form
    this.selectedUsers = []; // Reset selected users
  }
}
