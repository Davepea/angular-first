import { Injectable } from '@angular/core';

interface User {
  email: string;
  password: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { email: 'admin@example.com', password: 'admin123', isAdmin: true },
    { email: 'user@example.com', password: 'user123', isAdmin: false },
    // Add more users here
  ];

  constructor() { }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  }

  isAdmin(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser.isAdmin;
  }
  logout(): void {
    sessionStorage.removeItem('currentUser');
  }
}
