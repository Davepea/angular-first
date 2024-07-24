import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from '../auth.service';
import { CsvExportService } from '../csv-export.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userCount = 0;
  taskCount = 0;
  tasksByUser: { [key: string]: number } = {};

  userName: string = '';
  userEmail: string = '';

  charts: any = {
    userChart: null,
    taskChart: null
  };

  constructor(private authService: AuthService, private csvExportService: CsvExportService) { }

  ngOnInit(): void {
    this.initializeUserData();
    this.initializeCharts();
  }

  initializeUserData() {
    const currentUser = this.authService.getCurrentUser();
    this.userName = `${currentUser.email.split('@')[0]}`;
    this.userEmail = currentUser.email;
    this.userCount = 10;  // Fetch from a service
    this.taskCount = 20;  // Fetch from a service
    this.tasksByUser = { 'User1': 5, 'User2': 15 };  // Fetch from a service
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
    const data = [
      ['Metric', 'Value'],
      ['Number of Users', this.userCount],
      ['Number of Tasks', this.taskCount],
      ...Object.entries(this.tasksByUser).map(([user, count]) => [user, count])
    ];
    this.csvExportService.exportToCSV(data, 'dashboard-data');
  }
}
