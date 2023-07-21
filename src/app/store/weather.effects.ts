import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngneat/effects';
import { setProp } from '@ngneat/elf';
import { addEntities, deleteEntities, setEntities } from '@ngneat/elf-entities';
import { catchError, from, of, switchMap, tap } from 'rxjs';

import { OpenWeatherMapApiService } from '../services/open-weather-map-api.service';
import { addCity, removeCity, syncWeatherData } from './weather.actions';
import { citiesStore, syncStore } from './weather.store';

@Injectable({ providedIn: 'root' })
export class WeatherEffects {

    constructor(private openWeatherMapApiService: OpenWeatherMapApiService) { }

    syncWeatherData$ = createEffect((actions) =>
        actions.pipe(
            ofType(syncWeatherData),
            tap(() => syncStore.update(setProp('syncing', true))),
            switchMap(({ force }) => from(this.openWeatherMapApiService.fetchWeather(force))),
            tap(({ synced, cities }) => {
                if (synced) {
                    citiesStore.update(setEntities(cities));
                    syncStore.update(
                        setProp('lastSync', new Date()),
                    );
                }
                syncStore.update(setProp('syncing', false));
            }),
            catchError(() => {
                syncStore.update(setProp('syncing', false));
                return of([])
            }),
        ));
    addCity$ = createEffect((actions) =>
        actions.pipe(
            ofType(addCity),
            tap(({ city }) => citiesStore.update(
                addEntities(city),
            )),
        ));

    removeCity$ = createEffect((actions) =>
        actions.pipe(
            ofType(removeCity),
            tap(({ city }) => citiesStore.update(
                deleteEntities(city.id),
            )),
        ));
}
