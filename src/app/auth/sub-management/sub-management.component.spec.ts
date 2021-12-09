import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubManagementComponent } from './sub-management.component';

describe('SubManagementComponent', () => {
  let component: SubManagementComponent;
  let fixture: ComponentFixture<SubManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
