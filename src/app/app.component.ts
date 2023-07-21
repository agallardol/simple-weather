import { Component } from "@angular/core";

import { WeatherDataSynchronizerService } from "./services/weather-data-synchronizer";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(private weatherDataSynchronizerService: WeatherDataSynchronizerService) { }
}
