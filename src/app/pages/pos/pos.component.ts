import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css'],
  imports: [CommonModule, FormsModule, ZXingScannerModule],
})
export class PosComponent implements OnInit {
  scannerEnabled: boolean = true;
  membershipDetails: any = null;
  errorMessage: string | null = null;
  walkInUser: boolean = false;
  walkInName: string = '';
  products: any[] = [];
  cart: any[] = [];
  scanningProduct: boolean = false;
  totalAmount: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Load products
    this.userService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Error loading products';
        // Fallback to mock data
        this.products = this.userService.getProductsMock();
      },
    });
  }

  onCodeResult(result: string) {
    if (this.scanningProduct) {
      // Handle product scanning
      this.userService.getProductByBarcodeMock(result).subscribe({
        next: (product) => {
          this.cart.push(product);
          this.totalAmount = this.cart.reduce(
            (sum, item) => sum + item.price,
            0
          );
          this.scanningProduct = false;
        },
        error: (err) => {
          this.errorMessage = err.message || 'Product not found';
          this.scanningProduct = false;
        },
      });
    } else {
      // Handle membership QR code scanning
      this.scannerEnabled = false;
      this.userService.getMembershipByQrCodeMock(result).subscribe({
        next: (membership) => {
          this.membershipDetails = membership;
          this.walkInUser = false;
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = err.message || 'Membership not found';
          this.membershipDetails = null;
        },
      });
    }
  }

  proceedAsWalkIn() {
    this.walkInUser = true;
    this.membershipDetails = null;
    this.errorMessage = null;
    this.scannerEnabled = false;
  }

  confirmWalkIn() {
    if (this.walkInName.trim()) {
      this.membershipDetails = {
        name: this.walkInName,
        email: 'N/A',
        membershipType: 'Walk-In',
        expiryDate: 'N/A',
      };
      this.walkInUser = false;
      this.errorMessage = null;
    } else {
      this.errorMessage = 'Please enter a name for the walk-in user';
    }
  }

  cancelWalkIn() {
    this.walkInUser = false;
    this.walkInName = '';
    this.scannerEnabled = true;
    this.errorMessage = null;
  }

  scanProduct() {
    this.scanningProduct = true;
    this.scannerEnabled = true;
    this.errorMessage = null;
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.totalAmount = this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  checkout() {
    // For now, just log the transaction (can integrate with API later)
    console.log('Checkout:', {
      user: this.membershipDetails,
      cart: this.cart,
      totalAmount: this.totalAmount,
    });
    alert('Checkout successful! Total: $' + this.totalAmount.toFixed(2));
    this.reset();
  }

  reset() {
    this.membershipDetails = null;
    this.walkInUser = false;
    this.walkInName = '';
    this.cart = [];
    this.totalAmount = 0;
    this.scanningProduct = false;
    this.scannerEnabled = true;
    this.errorMessage = null;
  }
}
