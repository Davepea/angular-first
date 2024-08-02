import { Injectable } from '@angular/core';

interface User {
  id: number;  // Add id property
  email: string;
  userName: string;
  password: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'users';
  private readonly USER_ID_KEY = 'userIdCounter';

  private hardcodedUsers: User[] = [
    { id: 1, email: 'admin@example.com', userName: 'admin', password: 'admin123', isAdmin: true },
    { id: 2, email: 'user@example.com', userName: 'user', password: 'user123', isAdmin: false },
  ];

  private users: User[] = [];

  constructor() {
    this.initializeUsers();
  }

  private initializeUsers(): void {
    const localStorageUsers = this.getLocalStorageUsers();
    this.users = [...this.hardcodedUsers, ...localStorageUsers];
  }

  private getLocalStorageUsers(): User[] {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsersToLocalStorage(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  private getNextUserId(): number {
    const currentId = localStorage.getItem(this.USER_ID_KEY);
    const nextId = currentId ? parseInt(currentId, 10) + 1 : 3; // Start from 3 to account for hardcoded users
    localStorage.setItem(this.USER_ID_KEY, nextId.toString());
    return nextId;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  getCurrentUser() {
    const currentUser = sessionStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }

  isAdmin(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.isAdmin : false;
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
  }

  addUser(newUser: User): void {
    newUser.id = this.getNextUserId(); // Assign an ID to the new user
    const users = this.getLocalStorageUsers();
    users.push(newUser);
    this.saveUsersToLocalStorage(users);
    this.initializeUsers(); // Refresh the users list to include the new user
  }
}
