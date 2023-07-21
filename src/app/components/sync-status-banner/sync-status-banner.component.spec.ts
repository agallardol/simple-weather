import { ComponentFixture, TestBed } from '@angular/core/testing';

import SyncStatusBannerComponent from './sync-status-banner.component';

describe('SyncStatusBannerComponent', () => {
  let component: SyncStatusBannerComponent;
  let fixture: ComponentFixture<SyncStatusBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SyncStatusBannerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SyncStatusBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
