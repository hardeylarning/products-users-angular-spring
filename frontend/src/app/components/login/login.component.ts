import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  responseData = null

  email:string = ''
  password:string = ''

  constructor(private authService: UserService, private router: Router) { }

  ngOnInit(): void {

  }

  

  login() {
    this.authService.login(this.email, this.password).subscribe((res: any) => {
      if (res != null) {
        this.responseData = res
        localStorage.setItem('token', res.token) 
        this.router.navigate(['/users'])
      }
    })
  }

  

}
