import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginstatus = false;
  type: any;

  constructor(private router: Router) { }

  login(email, password, type) {
    localStorage.setItem('type', type);
    var status = 'true';
    localStorage.setItem('loginStatus', status);
    this.type = type;
    this.loginstatus = true;
    this.router.navigate(['/home']);
  }

  logout() {
    this.loginstatus = false;
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('type');
    this.router.navigate(['/login']);
  }
}
