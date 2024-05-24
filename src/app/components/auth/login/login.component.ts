import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loading: boolean = false;

  signInForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.loading$.subscribe(loading => {
      this.loading = loading;
    });
  }


  signIn(){
    this.authService.signIn(this.signInForm.value as IUser);
  }
}
