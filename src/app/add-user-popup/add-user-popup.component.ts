import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-user-popup',
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.css']
})
export class AddUserPopupComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() userAdded = new EventEmitter<User>();

  user: User = { id: '', userName: '', email: '', isAdmin: false, noOfTasks: 0 };

  constructor(private userService: UserService) { }

  save(): void {
    this.userService.addUser(this.user).subscribe((user: User) => {
      this.userAdded.emit(user);
    });
  }

  cancel(): void {
    this.visibleChange.emit(false);
  }
}
