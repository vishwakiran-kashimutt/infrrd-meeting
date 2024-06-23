import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  user: any;
  error: any =  {
    errorMessage: ''
  }
  constructor(private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService) {
      this.loginForm
      = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(7)]],
      });
  }
  ngOnInit() {
    localStorage.removeItem('roles')
    localStorage.removeItem('userId')
  }
  
  /**
   * Triggers when user tries to login. Store user ID and validates the user
   */
  onSubmit() {
    const { username, password } = this.loginForm.value;
    this.loginService.getUsers().subscribe({
      next: (response: any)=> {
        const user = response.find((x:any)=> {
          return ((x.name.toLowerCase() == username.toLowerCase()) && (x.password == password))})
              if(user) {
              localStorage.setItem('roles', user.role);
              localStorage.setItem('userId', user.userId)
              this.router.navigate(['/dashboard']);
              this.dataService.getUserDetails(user);
              } else {
                this.error.errorMessage = 'User name OR password is incorrect'
              }
      } 
  })
  }
}
