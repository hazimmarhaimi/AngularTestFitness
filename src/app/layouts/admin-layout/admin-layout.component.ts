import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  NavigationEnd,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
})
export class AdminLayoutComponent {
  adminName: string | null = null;
  pageTitle: string = 'Admin Dashboard';

  constructor(private router: Router) {
    this.adminName = localStorage.getItem('adminName') || 'Admin';

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/dashboard') {
          this.pageTitle = 'Admin Dashboard';
        } else if (event.urlAfterRedirects === '/users') {
          this.pageTitle = 'User Management';
        } else if (event.urlAfterRedirects.startsWith('/user-form')) {
          this.pageTitle = event.urlAfterRedirects.includes('user-form/')
            ? 'Edit User'
            : 'Add New User';
        } else if (event.urlAfterRedirects === '/membership') {
          this.pageTitle = 'Add Membership';
        } else if (event.urlAfterRedirects === '/pos') {
          this.pageTitle = 'Point of Sale';
        } else {
          this.pageTitle = 'Admin Panel';
        }
      });
  }

  logout() {
    localStorage.removeItem('adminName');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
