// src/app/pages/membership/membership.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class MembershipComponent implements OnInit {
  membershipForm: FormGroup;
  membershipTypes: string[] = [];
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.membershipForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      membershipType: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Load membership types
    this.membershipTypes = this.userService.getMembershipTypes();
  }

  onSubmit() {
    if (this.membershipForm.valid) {
      try {
        this.userService.addMembership(this.membershipForm.value);
        console.log('Membership saved:', this.membershipForm.value);
        this.router.navigate(['/users']); // Redirect to user management page
      } catch (error: any) {
        this.errorMessage = error.message || 'Error saving membership';
      }
    }
  }

  onCancel() {
    this.router.navigate(['/users']);
  }
}
