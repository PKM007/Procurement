import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any;
  password: any;
  type: any;

  accountType = [
    'Requestor',
    'Supplier',
    'Approver'
  ]

  constructor(private Auth: AuthService, private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    this.Auth.getUserDetails(username, password).subscribe(data => {
      if(data.success){
        this.router.navigate(['admin']);
        this.Auth.setLoggedIn(true);
      }
      else{
        window.alert(data.message);
      }
    });
    console.log(username, password);
  }


  login()
  {
    this.loginService.login(this.email, this.password, this.type);
  }

}
