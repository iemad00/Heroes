import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public hero: any){}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}
