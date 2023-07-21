import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideEffects, provideEffectsManager } from "@ngneat/effects-ng";

import { AppComponent } from "./app.component";
import { AddCityDialogComponent } from './components/add-city-dialog/add-city-dialog.component';
import { CitiesTabsComponent } from './components/cities-tabs/cities-tabs.component';
import { DailyForecastingComponent } from './components/daily-forecasting/daily-forecasting.component';
import { HourlyForecastingComponent } from './components/hourly-forecasting/hourly-forecasting.component';
import { SyncStatusBannerComponent } from './components/sync-status-banner/sync-status-banner.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { OpenWeatherMapApiInterceptor } from "./interceptors/open-weather-map-api.interceptor";
import { OpenWeatherMapApiService } from "./services/open-weather-map-api.service";
import { WeatherDataSynchronizerService } from "./services/weather-data-synchronizer";
import { WeatherEffects } from "./store/weather.effects";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CitiesTabsComponent,
    HourlyForecastingComponent,
    DailyForecastingComponent,
    SyncStatusBannerComponent,
    AddCityDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule,
  ],
  providers: [
    provideEffectsManager(),
    provideEffects(WeatherEffects),
    WeatherDataSynchronizerService,
    OpenWeatherMapApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OpenWeatherMapApiInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }

