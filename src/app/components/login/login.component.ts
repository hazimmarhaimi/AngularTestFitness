// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule] // Add CommonModule to imports
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Simulate admin login (replace with real backend authentication)
      if (email === 'admin@fitness.com' && password === 'admin123') {
        // Store login state and admin name in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('adminName', 'Admin User');
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid email or password.';
      }
    }
  }
}
