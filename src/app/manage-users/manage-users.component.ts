import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  selectedUsers: User[] = [];
  selectedUser: User | null = null;
  isAddUserPopupVisible = false;
  isAddTaskPopupVisible = false;
  isRemoveTaskPopupVisible = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  showAddUserPopup(): void {
    this.isAddUserPopupVisible = true;
  }

  showAddTaskPopup(user: User): void {
    this.selectedUser = user;
    this.isAddTaskPopupVisible = true;
  }

  showRemoveTaskPopup(user: User): void {
    this.selectedUser = user;
    this.isRemoveTaskPopupVisible = true;
  }

  onUserAdded(user: User): void {
    this.userService.addUser(user).subscribe((newUser: User) => {
      this.users.push(newUser);
      this.isAddUserPopupVisible = false;
    });
  }

  onTaskAdded(): void {
    this.loadUsers();
    this.isAddTaskPopupVisible = false;
  }

  onTaskRemoved(): void {
    this.loadUsers();
    this.isRemoveTaskPopupVisible = false;
  }

  anyUserSelected(): boolean {
    return this.selectedUsers.length > 0;
  }

  deleteSelectedUsers(): void {
    this.userService.deleteUsers(this.selectedUsers).subscribe(() => {
      this.loadUsers();
      this.selectedUsers = [];
    });
  }

  importUsersFromCSV(): void {
    // Implement CSV import functionality here
  }

  exportUsersToCSV(): void {
    this.userService.exportUsersToCSV(this.users);
  }
}
