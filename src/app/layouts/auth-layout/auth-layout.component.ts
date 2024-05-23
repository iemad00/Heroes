import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {

  constructor() {}

 ngOnInit() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
 }
 ngOnDestroy() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
 }
}
