import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAPIService } from '../../Services/auth-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user = { email: '', password: '', confirmPassword: '' };
  errorMessage: string = '';

  constructor(private authService: AuthAPIService, private router: Router) { }

  register() {
    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    
    this.authService.register(this.user).subscribe(response => {
      this.router.navigate(['/login']);
    }, error => {
      console.error('Registration failed', error);
    });

  }
}
