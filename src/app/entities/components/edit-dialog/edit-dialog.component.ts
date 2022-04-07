import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Hero} from "../../interfaces/hero.interface";
import {FormArray, FormControl, FormGroup, Validators, FormBuilder} from "@angular/forms";
import {MainService} from "../../services/main.service";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})

export class EditDialogComponent implements OnInit {

  editHeroForm!: FormGroup;
  public dialogHero!: Hero;
  public dialogPowers!: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private _mainService: MainService, private fb: FormBuilder
  ) {
    this.dialogHero = this.data.dialogHero;
    this.dialogPowers= this.data.powers;
  }

  ngOnInit(): void {
    // @ts-ignore
    console.log(this.dialogHero);
    this._createForm()
  }

  private _createForm() {
    this.editHeroForm = this.fb.group({
      heroName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[А-Яа-яA-Za-z]/)]],
      heroStrength: ['', [Validators.required, Validators.min(0), Validators.max(9999), Validators.pattern(/^[0-9]/)]],
      heroLevel: ['', [Validators.required, Validators.min(0), Validators.max(9999), Validators.pattern(/^[0-9]/)]],
      multiPowers: this.fb.array([""])
    })
  }

  public getFormsControls() : FormArray{
    return this.editHeroForm.controls['multiPowers'] as FormArray;
  }

  public newPowerControl() {
    console.log(this.editHeroForm.controls['multiPowers'].value);
    (<FormArray>this.editHeroForm.controls['multiPowers']).push(new FormControl("") );
  }

  public editHero(editedHero: Hero) {
    if(this.editHeroForm.valid && this.editHeroForm.controls["multiPowers"].value.length > 1) {
      editedHero.name = this.editHeroForm.get("heroName")?.value;
      editedHero.strength = this.editHeroForm.get("heroStrength")?.value;
      editedHero.lvl = this.editHeroForm.get("heroLevel")?.value;
      editedHero.power = this.editHeroForm.get("multiPowers")?.value;

      //преобразуем массив способностей
      editedHero.power.splice(editedHero.power.length-1);
      for(let i = 0; i < editedHero.power.length - 1; i++) {
        for(let j = i + 1; j < editedHero.power.length; j++) {
          if(editedHero.power[i] == editedHero.power[j]) {
            let del = editedHero.power.splice(j, 1);
            j--;
          }
        }
      }

      console.log(editedHero);
      this._mainService.putHeroes(editedHero);
    }

  }
}
