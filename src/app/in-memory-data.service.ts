import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 12, name: 'Captian America' },
      { id: 13, name: 'IronMan' },
      { id: 14, name: 'Scarlet Witch' },
      { id: 15, name: 'Hawkaye' },
      { id: 16, name: 'Thor' },
      { id: 17, name: 'Hulk' },
      { id: 18, name: 'Dr. Strange' },
      { id: 19, name: 'Optimus Prime' },
      { id: 20, name: 'Spider-Man' }
    ];
    return {heroes};
  }

  genId(heroes: Hero[]){
    return heroes.length > 0 ? Math.max(...heroes.map(hero => {
      return hero.id
    })) + 1 : 11;
  }
}
