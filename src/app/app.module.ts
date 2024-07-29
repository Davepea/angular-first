import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ChartModule } from 'primeng/chart';  // Add this import
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { CardComponent } from './card/card.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CsvExportService } from './csv-export.service';  // Service for CSV export
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table'; // Import PrimeNG Table module
import { SignupComponent } from './signup/signup.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AddUserPopupComponent } from './add-user-popup/add-user-popup.component';
import { AddTaskPopupComponent } from './add-task-popup/add-task-popup.component';
import { RemoveTaskPopupComponent } from './remove-task-popup/remove-task-popup.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskPageComponent } from './task-page/task-page.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskListComponent } from './task-list/task-list.component';
import { LayoutComponent } from './layout/layout.component';
import { ToggleButtonModule } from 'primeng/togglebutton';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CardComponent,
    SideBarComponent,
    SignupComponent,
    TopBarComponent,
    ManageUsersComponent,
    AddUserPopupComponent,
    AddTaskPopupComponent,
    RemoveTaskPopupComponent,
    TaskPageComponent,
    TaskCardComponent,

    TaskListComponent,
    LayoutComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    ToggleButtonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    CardModule,
    MessageModule,
    ChartModule,

    DropdownModule,
    DialogModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard, AdminGuard, CsvExportService],  // Add CsvExportService
  bootstrap: [AppComponent]
})
export class AppModule { }
