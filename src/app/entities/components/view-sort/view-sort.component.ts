import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../../interfaces/hero.interface";
import {MainService} from "../../services/main.service";
import {MatDialog} from '@angular/material/dialog';
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-view-sort',
  templateUrl: './view-sort.component.html',
  styleUrls: ['./view-sort.component.scss']
})
export class ViewSortComponent implements OnInit {
  @Input() heroes: Hero[] = [];
  @Input() powers: string[] = []
  sortForm!: FormGroup;

  constructor(private _mainService: MainService, public dialog: MatDialog, private fb: FormBuilder) {
    this._createForm()
  }

  private _createForm() {
    this.sortForm = this.fb.group({
      sortFrom: [''],
      sortTo: [''],
      sortPower: [''],
      sortName: ['']
    })
  }

  sortFrom!: number;
  sortTo!: number;
  sortPower: string = "";
  sortName: string = "";
  tempHeroes: Hero[] = [];

  ngOnInit(): void {
    this._mainService.getHeroes(this.heroes);
    this._mainService.heroes$.subscribe(res => {this.tempHeroes = JSON.parse(JSON.stringify(res)) } )
  }

  public sort(): void {
    this.heroes = JSON.parse(JSON.stringify(this.tempHeroes));
    this.sortFrom = this.sortForm.controls["sortFrom"].value;
    this.sortTo = this.sortForm.controls["sortTo"].value
    this.sortName = this.sortForm.controls["sortName"].value
    this.sortPower = this.sortForm.controls["sortPower"].value
    //если поля сортировки пусты
    if (!this.sortName && !this.sortTo && !this.sortFrom && !this.sortPower) {
      //выводим всеъ героев
      this.heroes = JSON.parse(JSON.stringify(this.tempHeroes));
    }
    else {
      //от
      if (this.sortFrom) {
        for(let i = 0; i < this.heroes.length; i++) {
          if (this.heroes[i].lvl < this.sortFrom) {
            this.heroes.splice(i, 1);
            i--;
          }
        }
      }
      //до
      if (this.sortTo) {
        for(let i = 0; i < this.heroes.length; i++) {
          if (this.heroes[i].lvl > this.sortTo) {
            this.heroes.splice(i, 1);
            i--;
          }
        }
      }
      //имя
      if (this.sortName) {
        for(let i = 0; i < this.heroes.length; i++) {
          if (this.heroes[i].name != this.sortName) {
            this.heroes.splice(i, 1);
            i--;
          }
        }
      }

      //сила
      if (this.sortPower) {
        for(let i = 0; i < this.heroes.length; i++) {
          let k: number = 0;
          for (let j = 0; j < this.heroes[i].power.length; j++) {
            if (this.heroes[i].power[j] == this.sortPower) {
              k++;
            }
          }
          if ( k == 0) {
            this.heroes.splice(i, 1);
            i--;
          }
        }
      }
    }
  }

  public levelSort(): void {
    for (let i = 0; i < this.heroes.length; i ++) {
      for (let j = 0; j < this.heroes.length - 1; j++) {
        if (this.heroes[i].lvl < this.heroes[j].lvl) {
          let tempH: Hero = JSON.parse(JSON.stringify(this.heroes[i]));
          this.heroes[i] = JSON.parse(JSON.stringify(this.heroes[j]));
          this.heroes[j] = JSON.parse(JSON.stringify(tempH));
          console.log("Changed: ", i, j);
        }
      }
    }
  }

  public resetFilter() {
    this.sortForm.reset();
    this.heroes = JSON.parse(JSON.stringify(this.tempHeroes));
  }
  // нижний блок ----------------------------------------------------------------------------------------------------
  deleteHero( hero : Hero) {
    for (let i: number = 0; i < this.heroes.length; i++) {
      if (this.heroes[i].id == hero.id) {
        console.log("Delete", this.heroes[i]);
        console.log("Position", i);
        this._mainService.deleteHeroes(this.heroes[i]);
        this.heroes.splice(i, 1)
        this.tempHeroes.splice(i, 1)
      }
    }
  }

  openDialog(hero : Hero) {
    this.dialog.open(EditDialogComponent, {
        data: {
          dialogHero: hero,
          powers: this.powers
        }
    });
  }
}
