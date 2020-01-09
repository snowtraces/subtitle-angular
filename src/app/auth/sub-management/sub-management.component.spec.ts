import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubManagementComponent } from './sub-management.component';

describe('SubManagementComponent', () => {
  let component: SubManagementComponent;
  let fixture: ComponentFixture<SubManagementComponent>;

  beforeEach(async(() => {
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
