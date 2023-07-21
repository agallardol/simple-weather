import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyForecastingComponent } from './daily-forecasting.component';

describe('DailyForecastingComponent', () => {
  let component: DailyForecastingComponent;
  let fixture: ComponentFixture<DailyForecastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyForecastingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyForecastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
