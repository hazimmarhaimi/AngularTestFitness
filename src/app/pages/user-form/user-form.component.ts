// src/app/pages/user-form/user-form.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId: number | null = null;

  // Sample roles and statuses (replace with real data from a service)
  roles = ['Admin', 'User'];
  statuses = ['Active', 'Inactive'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Check if we're in edit mode by looking for an ID in the route
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.isEditMode = true;
      this.loadUserData(this.userId);
    }
  }

  loadUserData(id: number) {
    // Simulate fetching user data (replace with real service call)
    const user = this.userService.getUserById(id);
    if (user) {
      this.userForm.patchValue(user);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.isEditMode) {
        this.userService.updateUser(this.userId!, this.userForm.value);
      } else {
        this.userService.addUser(this.userForm.value);
      }
      this.router.navigate(['/users']);
    }
  }

  onCancel() {
    this.router.navigate(['/users']);
  }
}
