import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitleDetailComponent } from './subtitle-detail.component';

describe('SubtitleDetailComponent', () => {
  let component: SubtitleDetailComponent;
  let fixture: ComponentFixture<SubtitleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtitleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtitleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
