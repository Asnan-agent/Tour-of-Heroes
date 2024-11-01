import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroUrl = 'api/heroes';
  
  private log(message: string){
    this.messageService.add(`heroMessage: ${message}`)
  }

  constructor(private messageService: MessageService, private http : HttpClient) { }
  
  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroUrl)
      .pipe(
        tap(_ => this.log('fetched Heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error)
      this.log(`${operation} Failed ${error.message}`);
      return of(result as T);
    }
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Fetched Hero id = ${id}`)),
      catchError(this.handleError<Hero>(`gethero by id=${id}`))   
    )
  }

  updateHero(hero: Hero): Observable<Hero>{
    return this.http.put<Hero>(this.heroUrl, hero).pipe(
      tap(_ => this.log(`update Hero id = ${hero.id}`)),
      catchError(this.handleError<Hero>('updated'))
    )
  }
  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroUrl, hero).pipe(
      tap(_ => this.log(`new hero is added with id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(id: number): Observable<Hero>{
    const url = `${this.heroUrl}/${id}`
    return this.http.delete<Hero>(url).pipe(
      tap(_ => this.log(`deleted hero id is ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchTerm(term: string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.heroUrl}?name=${term}`).pipe(
      tap(x => x.length? 
        this.log(`found hero matching "${term}"`) :
        this.log(`no heroes match found "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHero', []))
    );
  }

}
