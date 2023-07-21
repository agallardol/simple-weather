import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { differenceInMinutes } from "date-fns";
import { groupBy, maxBy, minBy } from 'lodash';
import { firstValueFrom } from "rxjs";

import { City } from "../models/city.model";
import { CityMeta } from "../models/city-meta.model";
import { CityWeatherDailyForecast } from "../models/city-weather-daily-forecast.model";
import { CityWeatherHourlyForecast } from "../models/city-weather-hourly-forecast.model";
import { OpenWeatherMapApiForecastResponse } from "../models/open-weather-map-api-forecast-response.model";
import { cities$, lastSync$ } from "../store/weather.selector";

@Injectable()
export class OpenWeatherMapApiService {

    private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5';

    constructor(private httpClient: HttpClient) { }

    private getForecastForCity(meta: CityMeta): Promise<OpenWeatherMapApiForecastResponse> {
        const path = `${this.BASE_URL}/forecast`;
        const params = new HttpParams({
            fromObject: {
                lat: meta.lat,
                lon: meta.lon,
                units: 'metric',
            }
        })
        return firstValueFrom(this.httpClient.get<OpenWeatherMapApiForecastResponse>(path, { params }));
    }

    private buildIconUrl(icon: string): string {
        return `https://openweathermap.org/img/wn/${icon}@2x.png`;
    }

    private getMiddleIndex(length: number): number {
        return Math.max(0, Math.floor((length + 1) / 2) - 1);
    }

    private responseToHourlyForecast(weather: OpenWeatherMapApiForecastResponse): CityWeatherHourlyForecast[] {
        const nextHours = weather.list
            .slice(0, 10)
            .map(forecast => {
                const [weatherInfo] = forecast.weather;
                return {
                    time: new Date(forecast.dt * 1000),
                    temperature: forecast.main.temp,
                    humidity: forecast.main.humidity,
                    iconUrl: this.buildIconUrl(weatherInfo.icon),
                };
            });
        return nextHours;
    }

    private responseToDailyForecast(weather: OpenWeatherMapApiForecastResponse): CityWeatherDailyForecast[] {
        const forecastByHourByDay: OpenWeatherMapApiForecastResponse['list'][] = Array.from(Object.values(groupBy(weather.list, forecast => new Date(forecast.dt * 1000).getDate())));
        const forecastByDay = forecastByHourByDay.map(forecast => {
            const [firstForecast] = forecast;
            const time = new Date(firstForecast.dt * 1000);
            const middleForecast = forecast[this.getMiddleIndex(forecast.length)];
            const weatherInfo = middleForecast.weather[this.getMiddleIndex(middleForecast.weather.length)]
            const resume = `${weatherInfo.main}, ${weatherInfo.description}`;
            const minTemperature = minBy(forecast, value => value.main.temp_min)?.main.temp_min ?? NaN;
            const maxTemperature = maxBy(forecast, value => value.main.temp_max)?.main.temp_max ?? NaN;
            const iconUrl = this.buildIconUrl(weatherInfo.icon);
            return { time, resume, minTemperature, maxTemperature, iconUrl };
        });
        return forecastByDay.filter(forecast => new Date(forecast.time).getDate() !== new Date().getDate());
    }

    public async fetchWeather(force = false): Promise<{ synced: boolean, cities: City[] }> {
        const lastSync = await firstValueFrom(lastSync$);
        const updated = !!lastSync && differenceInMinutes(new Date(), lastSync) <= 10;
        const cities = await firstValueFrom(cities$);
        if (!force && updated) {
            return { synced: false, cities };
        }
        const updateWeatherRequests = cities.map(async (city) => {
            const updatedCity: City = { ...city };
            const forecast = await this.getForecastForCity(city.meta);
            updatedCity.weather = {
                hourlyForecasting: this.responseToHourlyForecast(forecast),
                dailyForecasting: this.responseToDailyForecast(forecast),
            };
            return updatedCity;
        });
        try {
            return { synced: true, cities: await Promise.all(updateWeatherRequests) };
        }
        catch (e) {
            return { synced: false, cities };
        }
    }
}
