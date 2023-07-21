import { Component, Input } from '@angular/core';
import { CityWeatherHourlyForecast } from 'src/app/models/city-weather-hourly-forecast.model';

@Component({
  selector: 'app-hourly-forecasting',
  templateUrl: './hourly-forecasting.component.html',
  styleUrls: ['./hourly-forecasting.component.css']
})
export class HourlyForecastingComponent {
  @Input()
  public hourlyForecasting: CityWeatherHourlyForecast[] | undefined = [];
}
