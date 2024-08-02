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

  user: User = { id: '', userName: '', email: '', isAdmin: false, noOfTasks: 0, password: '' };

  constructor(private userService: UserService) { }

  save(): void {
    console.log('User before save:', this.user); // Check the isAdmin value here
    this.userService.addUser(this.user).subscribe((user: User) => {
      console.log('User after save:', user); // Verify if the server response is as expected
      this.userAdded.emit(user);
      this.cancel(); // Close the dialog after saving
    });
  }


  cancel(): void {
    this.visibleChange.emit(false);
  }
}
