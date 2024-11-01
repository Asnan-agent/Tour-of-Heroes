import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroService.getHeroes().subscribe(res => {
      this.heroes = res;
    })
  }
  add(name:string){
    name = name.trim();
    if(!name){
      return;
    }
    this.heroService.addHero({name} as Hero).subscribe(hero =>{
      this.heroes.push(hero);
    })
  }

  deleteHero(hero: Hero){
    this.heroes = this.heroes.filter(x => x !== hero);
    this.heroService.deleteHero(hero.id).subscribe()
  }
}
