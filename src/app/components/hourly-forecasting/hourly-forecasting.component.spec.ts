import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyForecastingComponent } from './hourly-forecasting.component';

describe('HourlyForecastingComponent', () => {
  let component: HourlyForecastingComponent;
  let fixture: ComponentFixture<HourlyForecastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyForecastingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyForecastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
