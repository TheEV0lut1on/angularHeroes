import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppComponent } from './app.component';
import { AddNewComponent } from './entities/components/add-new/add-new.component';
import { ViewSortComponent } from './entities/components/view-sort/view-sort.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule }   from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MainService } from "./entities/services/main.service";
import { EditDialogComponent } from './entities/components/edit-dialog/edit-dialog.component';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    AppComponent,
    AddNewComponent,
    ViewSortComponent,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
