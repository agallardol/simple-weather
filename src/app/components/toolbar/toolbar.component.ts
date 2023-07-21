import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions } from '@ngneat/effects-ng';
import { syncWeatherData } from 'src/app/store/weather.actions';
import { syncing$ } from 'src/app/store/weather.selector';

import { AddCityDialogComponent } from '../add-city-dialog/add-city-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  constructor(
    private dialog: MatDialog,
    private actions: Actions,
  ) { }
  public isSyncing$ = syncing$;

  public refresh(): void {
    this.actions.dispatch(syncWeatherData({ force: true }))
  }
  public openAddCityDialog(): void {
    this.dialog.open(AddCityDialogComponent, {});
  }
}
