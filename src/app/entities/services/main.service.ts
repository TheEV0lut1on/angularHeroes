import {Injectable, Input} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Hero} from "../interfaces/hero.interface";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class MainService {

  private _heroes$$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  public heroes$: Observable<Hero[]> = this._heroes$$.asObservable();

  constructor( private _http: HttpClient ) {
  }

   public postHeroes( hero: Hero ): void {
     this._http.post<Hero>("http://127.0.0.1:3000/items", hero).subscribe();
   }

   public getHeroes(heroes: Hero[]): void {
      this._http.get<Hero[]>("http://127.0.0.1:3000/items").subscribe(res => this._heroes$$.next(res));
   }

   public deleteHeroes(hero: Hero): void {
      this._http.delete<Hero>(`http://127.0.0.1:3000/items/${hero.id}`).subscribe();
   }

   public putHeroes(hero: Hero): void {
     this._http.put<Hero>(`http://127.0.0.1:3000/items/${hero.id}`, hero).subscribe();
   }


}
