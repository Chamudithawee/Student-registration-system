import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAPIService } from '../../Services/auth-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthAPIService, private router: Router) { }

  login() {
    this.authService.login(this.credentials).subscribe(response => {
      console.log('Login successful', response);
      this.router.navigate(['/students']);
    }, error => {
      console.error('Login failed', error);
      if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message;
      } else {
        this.errorMessage = 'Unknown error occurred';
      }
    });
  }
}
