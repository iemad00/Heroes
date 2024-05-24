import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroProfileComponent } from '../hero-profile/hero-profile.component';
import { HeroDetailsComponent } from '../hero-profile/hero-details/hero-details.component';

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
      id: 1,
      name: "Emad",
      powers: ['Angular', 'Nodejs', 'Python'],
      rate: 3.5
    },
    {
      id: 2,
      name: "Super Man",
      powers: ['Fly', 'Power', 'Nodejs', 'React', 'Strong'],
      rate: 5
    },
    {
      id: 3,
      name: "Ahmen Man",
      powers: ['Fly', 'Power'],
      rate: 5
    }
  ];

  constructor(private dialog: MatDialog){}

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


  heroDetails(heroId: number){
    this.dialog.open(HeroDetailsComponent, {
      width: '400px'
    })
  }

}
