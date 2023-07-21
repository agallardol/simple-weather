import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions } from '@ngneat/effects-ng';
import { City } from 'src/app/models/city.model';
import { addCity, removeCity } from 'src/app/store/weather.actions';
import { cities$ } from 'src/app/store/weather.selector';

import { AddCityDialogComponent } from '../add-city-dialog/add-city-dialog.component';

@Component({
  selector: 'app-cities-tabs',
  templateUrl: './cities-tabs.component.html',
  styleUrls: ['./cities-tabs.component.css']
})
export class CitiesTabsComponent {
  constructor(
    private dialog: MatDialog,
  ) { }
  public cities$ = cities$;

  public openAddCityDialog(): void {
    this.dialog.open(AddCityDialogComponent, {});
  }
}
