import { CityMeta } from "./city-meta.model";
import { CityWeather } from "./city-weather.model";

export interface City {
    id: number,
    meta: CityMeta,
    weather?: CityWeather,
}
