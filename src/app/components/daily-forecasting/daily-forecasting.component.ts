import { Component, Input } from '@angular/core';
import { CityWeatherDailyForecast } from 'src/app/models/city-weather-daily-forecast.model';

@Component({
  selector: 'app-daily-forecasting',
  templateUrl: './daily-forecasting.component.html',
  styleUrls: ['./daily-forecasting.component.css']
})
export class DailyForecastingComponent {
  @Input()
  public dailyForecasting: CityWeatherDailyForecast[] | undefined = [];
}
