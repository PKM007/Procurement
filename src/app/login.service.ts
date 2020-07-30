import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginstatus = false;
  type: any;

  constructor(private router: Router,
              private http: HttpClient) { }

  login(email, password) {


    let params = new HttpParams();
    params = params.set('email', email);
    params = params.set('password', password);
    params = params.set('action', 'login');


    this.http.get('http://localhost/My Project/ionic2php/login.php', { params: params}).subscribe((data: any) => {
      console.log(data);
      var receivedType = data[0];
      localStorage.setItem('type', receivedType['type']);
      var status = 'true';
      localStorage.setItem('loginStatus', status);
      this.type = receivedType['type'];
      this.loginstatus = true;
      this.router.navigate(['/home']);
  }, error => {
    console.log(error);
    alert('Oops something went wrong, please try again');
    });

  }

  logout() {
    this.loginstatus = false;
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('type');
    this.router.navigate(['/login']);
  }
}
