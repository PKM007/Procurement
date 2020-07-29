import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface myData {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInStatus = false;

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean){
    this.loggedInStatus = value;
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  getUserDetails(username, password) {
    // post these details to API Server return user info if correct
    return this.http.post<myData>('http://localhost/My Project/ionic2php/login.php', {
      username,
      password
    });

  }
}
