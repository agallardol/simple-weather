import { City } from "../models/city.model";
import { CityMeta } from "../models/city-meta.model";
import cities from './cities.json';

export const DEFAULT_CITIES = new Map<number, City>([
    [3451190, { id: 3451190, meta: cities['3451190'] as unknown as CityMeta }],
    [1816670, { id: 1816670, meta: cities['1816670'] as unknown as CityMeta }],
    [5368361, { id: 5368361, meta: cities['5368361'] as unknown as CityMeta }],
]);

export const CITIES: City[] = Array.from(Object.entries(cities))
    .map(([id, meta]) => {
        return {
            id: parseInt(id),
            meta: meta as CityMeta,
        }
    }).sort((cityA, cityB) => {
        const valueA = `${cityA.meta.city_name}, ${cityA.meta.country_full}`;
        const valueB = `${cityB.meta.city_name}, ${cityB.meta.country_full}`;
        return valueA.localeCompare(valueB);
    });
