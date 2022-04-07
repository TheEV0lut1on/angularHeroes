import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../../interfaces/hero.interface";
import {FormArray, FormControl, FormGroup, Validators, FormBuilder, Validator} from "@angular/forms";
import {MainService} from "../../services/main.service";

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})

export class AddNewComponent implements OnInit {
  @Input() powers: string[] = [];
  @Input() heroes: Hero[] = [];
  newPower: string = "";

  newHeroForm!: FormGroup;

  constructor(private _mainService: MainService, private fb: FormBuilder) {
    this._createForm()
  }

  ngOnInit(): void {
  }

  private _createForm() {
    this.newHeroForm = this.fb.group({
      heroName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[А-Яа-яA-Za-z]/)]],
      heroStrength: ['', [Validators.required, Validators.min(0), Validators.max(9999), Validators.pattern(/^[0-9]/)]],
      heroLevel: ['', [Validators.required, Validators.min(0), Validators.max(9999), Validators.pattern(/^[0-9]/)]],
      multiPowers: this.fb.array([""])
    })
  }

  getFormsControls() : FormArray{
    return this.newHeroForm.controls['multiPowers'] as FormArray;
  }

  addNewHero(): any {
    //проверяем форму на заполненность
    if (this.newHeroForm.valid && this.newHeroForm.controls["multiPowers"].value.length > 1) {
      const newHero: Hero = {
        name: this.newHeroForm.value.heroName,
        strength: +this.newHeroForm.value.heroStrength,
        lvl: +this.newHeroForm.value.heroLevel,
        power: this.newHeroForm.controls['multiPowers'].value
      }
      //преобразуем массив способностей
      newHero.power.splice(newHero.power.length-1);
      for(let i = 0; i < newHero.power.length - 1; i++) {
        for(let j = i + 1; j < newHero.power.length; j++) {
          if(newHero.power[i] == newHero.power[j]) {
            let del = newHero.power.splice(j, 1);
            j--;
          }
        }
      }
      this.heroes.push(newHero);
      this._mainService.postHeroes(newHero);
      this._mainService.getHeroes(this.heroes);
      this.newHeroForm.reset();
      this.newHeroForm.controls['multiPowers'] = new FormArray([new FormControl("")]);
    }
    else {
      this.newHeroForm.get("heroName")?.markAsTouched();
      this.newHeroForm.get("heroLevel")?.markAsTouched();
      this.newHeroForm.get("heroStrength")?.markAsTouched();
      this.newHeroForm.get("heroPowers")?.markAsTouched();

    }
  }

  newPowerControl() {
    console.log(this.newHeroForm.controls['multiPowers'].value);
    (<FormArray>this.newHeroForm.controls['multiPowers']).push(new FormControl("") );
  }

  addNewPower(): any {
    if (this.newPower.trim()) {
      this.powers.push(this.newPower.trim());
      this.newPower = "";
      console.log('Powers list',this.powers);
    }
  }
}
