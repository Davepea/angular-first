import { Injectable } from '@angular/core';

interface User {
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private hardcodedUsers: User[] = [
    { email: 'admin@example.com', username: 'admin', password: 'admin123', isAdmin: true },
    { email: 'user@example.com', username: 'user', password: 'user123', isAdmin: false },
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
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsersToLocalStorage(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
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
    const users = this.getLocalStorageUsers();
    users.push(newUser);
    this.saveUsersToLocalStorage(users);
    this.initializeUsers(); // Refresh the users list to include the new user
  }
}
