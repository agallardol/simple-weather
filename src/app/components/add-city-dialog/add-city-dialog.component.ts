import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions } from '@ngneat/effects-ng';
import { firstValueFrom, map, Observable, startWith } from 'rxjs';
import { City } from 'src/app/models/city.model';
import { addCity, removeCity, syncWeatherData } from 'src/app/store/weather.actions';
import { cities$ } from 'src/app/store/weather.selector';
import { CITIES } from 'src/app/utils/city-data';

@Component({
  selector: 'app-add-city-dialog',
  templateUrl: './add-city-dialog.component.html',
  styleUrls: ['./add-city-dialog.component.css']
})
export class AddCityDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AddCityDialogComponent>,
    private actions: Actions,
  ) {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.meta?.city_name;
        return name ? this._filter(name as string) : this.cities.slice(0, 10);
      }),
      map(value => value.slice(0, 10))
    );
    this.dialogRef.afterClosed().subscribe(() => {
      this.actions.dispatch(syncWeatherData({ force: true }));
    });
  }

  @ViewChild('cityInput')
  cityInput!: ElementRef<HTMLInputElement>;

  @ViewChild('autocompleteTrigger')
  autocompleteTrigger!: MatAutocompleteTrigger;

  control = new FormControl<string | City>('');
  cities: City[] = CITIES;
  filteredOptions: Observable<City[]>;
  selectedCities = cities$;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase().trim();
    return this.cities.filter(option => option.meta.city_name.toLowerCase().includes(filterValue));
  }

  displayFn(city: City): string {
    return city ? `${city?.meta?.city_name}, ${city?.meta?.country_full}` : '';
  }

  closeDialog() {
    this.dialogRef.close();
  }


  async selected(event: MatAutocompleteSelectedEvent): Promise<void> {
    const city = event.option.value as City;
    const isSelected = await firstValueFrom(this.isSelected(city));
    if (isSelected) {
      this.removeCity(city);
    } else {
      this.addCity(city);
    }
    this.cityInput.nativeElement.value = '';
    this.control.setValue(null);

    requestAnimationFrame(() => {
      this.openAuto(this.autocompleteTrigger);
    })
  }

  addCity(city: City): void {
    this.actions.dispatch(addCity({ city }));
  }

  removeCity(city: City): void {
    this.actions.dispatch(removeCity({ city }));
  }

  openAuto(trigger: MatAutocompleteTrigger) {
    trigger.openPanel();
    this.cityInput.nativeElement.focus();
  }

  isSelected(city: City): Observable<boolean> {
    return this.selectedCities.pipe(
      map((cities) => {
        return cities.findIndex(c => city.id === c.id) !== -1;
      }),
    );
  }
}
