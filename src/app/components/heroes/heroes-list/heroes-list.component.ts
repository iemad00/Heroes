import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent {

  sortBy: 'name'|'power' = 'name';

  heroes = [
    {
    name: "Emad",
    powers: ['Angular', 'Nodejs', 'Python'],
    rate: 3.5
    },
    {
      name: "Super Man",
      powers: ['Fly', 'Power', 'Nodejs', 'React', 'Strong'],
      rate: 5
    },

    {
      name: "Ahmen Man",
      powers: ['Fly', 'Power'],
      rate: 5
    }
  ];


  get filteredHeroes() {
    return this.heroes.sort((a, b) => {
      return this.sortBy === 'name' ? a.name.localeCompare(b.name) : b.powers.length - a.powers.length;
    });
  }
}
