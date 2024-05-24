import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHero } from '../interfaces/hero';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, switchMap, throwError } from 'rxjs';
import { IUser } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000/'

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient,
    private router: Router,
     private toastr: ToastrService) { }

  signIn(credentials: IUser){
    this.loadingSubject.next(true);

    this.http.get(`${this.url}user?email=${credentials.email}`).subscribe((users: any) => {
      this.loadingSubject.next(false);

      if(!(users.length>0 && users[0].password == credentials.password))
        return this.toastr.error("Email or Password is not correct!")

      sessionStorage.setItem('userId', users[0].id);
      this.router.navigate(['/heroes'])
      this.toastr.success("You have signed in successfully")
      return users;
    }, err=>{
      this.loadingSubject.next(false);
    })
  }


  signOut(){
    sessionStorage.removeItem('userId');
    this.router.navigate(['/heroes'])
  }

}
