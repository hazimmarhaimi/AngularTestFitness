// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Mock user data (replace with API calls in a real app)
  private apiUrl = 'http://localhost:5000/api'; // Replace with your API URL
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@fitness.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@fitness.com',
      role: 'User',
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@fitness.com',
      role: 'User',
      status: 'Active',
    },
  ];
  private memberships: any[] = [
    {
      id: 1,
      qrCode: 'QR12345',
      name: 'Alice Brown',
      email: 'alice@fitness.com',
      membershipType: 'Premium',
      expiryDate: '2025-12-31',
    },
    {
      id: 2,
      qrCode: 'QR67890',
      name: 'Bob Smith',
      email: 'bob@fitness.com',
      membershipType: 'Basic',
      expiryDate: '2025-06-30',
    },
  ]; // Mock membership data
  private products: any[] = [
    { id: 1, barcode: 'PROT001', name: 'Protein Bar - Chocolate', price: 3.99 },
    { id: 2, barcode: 'SNACK001', name: 'Energy Snack - Almond', price: 2.49 },
  ]; //

  constructor(private http: HttpClient) {
    // Initialize mock memberships (replace with API call in a real app)
    this.memberships = [];
  }

  // Fetch membership details by QR code
  getMembershipByQrCode(qrCode: string): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/memberships/qr/${qrCode}`)
      .pipe(catchError(this.handleError));
  }

  // Mock method for testing (remove when using API)
  getMembershipByQrCodeMock(qrCode: string): any {
    const membership = this.memberships.find((m) => m.qrCode === qrCode);
    if (!membership) {
      throw new Error('Membership not found');
    }
    return membership;
  }
  // Fetch all products
  getProducts(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/products`)
      .pipe(catchError(this.handleError));
  }

  // Mock method for testing (remove when using API)
  getProductsMock(): any[] {
    return this.products;
  }
  // Fetch product by barcode
  getProductByBarcode(barcode: string): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/products/barcode/${barcode}`)
      .pipe(catchError(this.handleError));
  }

  // Mock method for testing (remove when using API)
  getProductByBarcodeMock(barcode: string): any {
    const product = this.products.find((p) => p.barcode === barcode);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  // Membership settings (mock data for membership types)
  getMembershipTypes(): string[] {
    return ['Basic', 'Premium', 'Elite'];
  }

  // Get all memberships
  getMemberships(): any[] {
    return this.memberships;
  }

  // Save a new membership
  addMembership(membership: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/memberships`, membership)
      .pipe(catchError(this.handleError));
  }

  getUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  addUser(user: any) {
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updatedUser: any) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser, id };
      return this.users[index];
    }
    throw new Error(`User with ID ${id} not found`);
  }

  deleteUser(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  // API methods (for future use)
  addMembershipApi(membership: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/memberships`, membership)
      .pipe(catchError(this.handleError));
  }

  getMembershipTypesApi(): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.apiUrl}/membership-types`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(
      () => new Error('An error occurred while communicating with the server')
    );
  }
}
