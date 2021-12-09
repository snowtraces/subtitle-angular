import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApiManagementComponent } from './api-management.component';

describe('ApiManagementComponent', () => {
  let component: ApiManagementComponent;
  let fixture: ComponentFixture<ApiManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
