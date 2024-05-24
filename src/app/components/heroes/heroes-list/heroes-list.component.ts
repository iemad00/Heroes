import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent implements OnInit {

  sortBy: 'name'|'power' = 'name';
  filteredHeroes: any[] = [];

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

  ngOnInit(): void {
    this.filteredHeroes = this.heroes;
    this.sortHeros(this.sortBy);
  }

  search(event: any){
    this.filteredHeroes = this.heroes.filter(hero => hero.name.toLowerCase().includes(event.target.value))
    this.sortHeros(this.sortBy);
  }

  sortHeros(soryBy: 'name'|'power'): void {
    this.sortBy = soryBy;
    this.filteredHeroes = this.filteredHeroes.sort((a, b) => {
      return this.sortBy === 'name' ? a.name.localeCompare(b.name) : b.powers.length - a.powers.length;
    });
  }
}
