import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubEditorComponent } from './sub-editor.component';

describe('SubEditorComponent', () => {
  let component: SubEditorComponent;
  let fixture: ComponentFixture<SubEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
