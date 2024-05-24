import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {

  @Input() hero?: any;
  @Input() admin?: any;
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any){
    if (data)
      this.hero = data;
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}
