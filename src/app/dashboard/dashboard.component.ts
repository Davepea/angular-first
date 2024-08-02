import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from '../auth.service';
import { CsvExportService } from '../csv-export.service';
import { UserService } from '../services/user.service'; // Import UserService
import { User } from '../../models/user.model'; // Import User model

interface TasksByUser {
  [key: string]: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userCount = 0;
  taskCount = 0;
  tasksByUser: TasksByUser = {};

  userName: string = '';
  userEmail: string = '';

  charts: any = {
    userChart: null,
    taskChart: null
  };

  constructor(
    private authService: AuthService,
    private csvExportService: CsvExportService,
    private userService: UserService // Inject UserService
  ) { }

  ngOnInit(): void {
    this.initializeUserData();
  }

  initializeUserData() {
    const currentUser = this.authService.getCurrentUser();
    this.userName = `${currentUser.email.split('@')[0]}`;
    this.userEmail = currentUser.email;

    this.userService.getUsers().subscribe((users: User[]) => {
      this.userCount = users.length;
      this.taskCount = users.reduce((total, user) => total + user.noOfTasks, 0);
      this.tasksByUser = users.reduce((acc: TasksByUser, user: User) => {
        acc[user.userName] = user.noOfTasks;
        return acc;
      }, {});
      this.initializeCharts();
    });
  }

  initializeCharts() {
    this.charts.userChart = new Chart('userChart', {
      type: 'bar',
      data: {
        labels: ['Users'],
        datasets: [{
          label: 'Number of Users',
          data: [this.userCount],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      }
    });

    this.charts.taskChart = new Chart('taskChart', {
      type: 'pie',
      data: {
        labels: Object.keys(this.tasksByUser),
        datasets: [{
          label: 'Tasks by User',
          data: Object.values(this.tasksByUser),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      }
    });
  }

  exportToCSV() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.userService.exportUsersToCSV(users);
    });
  }
}
