import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent {

  sortBy: 'name'|'power' = 'name';

  heroes = [{
    name: "Emad",
    powers: ['Angular', 'Nodejs'],
    rate: 3.5
  }];

}
