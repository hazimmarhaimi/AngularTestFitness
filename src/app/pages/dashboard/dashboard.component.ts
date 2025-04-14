// src/app/pages/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  adminName: string | null = null;

  constructor(private router: Router) {
    // Simulate fetching admin name (e.g., from a service or localStorage)
    this.adminName = localStorage.getItem('adminName') || 'Admin';
  }

  logout() {
    // Clear admin session (e.g., localStorage)
    localStorage.removeItem('adminName');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
