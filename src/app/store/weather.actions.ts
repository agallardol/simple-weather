import { createAction, props } from "@ngneat/effects";

import { City } from "../models/city.model";

export const syncWeatherData = createAction('sync weather data', props<{ force?: boolean }>());

export const addCity = createAction('add city', props<{ city: City }>());

export const removeCity = createAction('remove city', props<{ city: City }>());
