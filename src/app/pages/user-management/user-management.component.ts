import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
  imports: [CommonModule],
})
export class UserManagementComponent {
  // Sample user data (replace with real data from a service later)
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {
    this.users = this.userService.getUsers();
  }

  addUser() {
    // Placeholder for adding a new user
    this.router.navigate(['/user-form']);
    // In a real app, navigate to a form or open a modal
  }

  viewUser(id: number) {
    this.router.navigate(['/user-form', id]);
    // Navigate to user details page or open a modal
  }

  editUser(id: number) {
    this.router.navigate(['/user-form', id]);
    // Navigate to edit form or open a modal
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    // In a real app, call a service to delete the user from the backend
  }
}
