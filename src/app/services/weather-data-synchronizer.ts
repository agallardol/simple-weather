import { Injectable } from "@angular/core";
import { Actions } from "@ngneat/effects-ng";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { timer } from "rxjs";

import { syncWeatherData } from "../store/weather.actions";

@UntilDestroy()
@Injectable()
export class WeatherDataSynchronizerService {
    private FETCH_INTERVAL_MS = 10 * 60 * 1000;
    constructor(private actions: Actions) {
        timer(0, this.FETCH_INTERVAL_MS).pipe(untilDestroyed(this)).subscribe(() => this.actions.dispatch(syncWeatherData({ force: false })));
    }
}
