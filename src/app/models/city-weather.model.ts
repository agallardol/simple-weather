import { CityWeatherDailyForecast } from "./city-weather-daily-forecast.model";
import { CityWeatherHourlyForecast } from "./city-weather-hourly-forecast.model";

export interface CityWeather {
    hourlyForecasting: CityWeatherHourlyForecast[],
    dailyForecasting: CityWeatherDailyForecast[],
}
