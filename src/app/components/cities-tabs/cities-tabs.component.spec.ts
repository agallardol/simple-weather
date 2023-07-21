import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesTabsComponent } from './cities-tabs.component';

describe('CitiesTabsComponent', () => {
  let component: CitiesTabsComponent;
  let fixture: ComponentFixture<CitiesTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitiesTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitiesTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
