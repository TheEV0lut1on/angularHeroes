import { Component } from '@angular/core';
import {Hero} from "./entities/interfaces/hero.interface";
import {MainService} from "./entities/services/main.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Heroes';
  powersApp: string[] = ["Fire", "Ice", "Water", "Ground"]
  heroes: Hero[] = [];

  constructor(private _mainService: MainService) {}

  ngOnInit () {
    this._mainService.getHeroes(this.heroes);
    this._mainService.heroes$.subscribe( res => {
      this.heroes = res;
    });
  }
}
