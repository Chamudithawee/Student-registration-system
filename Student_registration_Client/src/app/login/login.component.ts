import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAPIService } from '../Services/auth-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials = { email: '', password: '' };

  constructor(private authService: AuthAPIService, private router: Router) { }

  login() {
    this.authService.login(this.credentials).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/students']);
    }, error => {
      console.error('Login failed', error);
    });
  }
}
