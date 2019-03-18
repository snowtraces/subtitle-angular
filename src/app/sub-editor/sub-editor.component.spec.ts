import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubEditorComponent } from './sub-editor.component';

describe('SubEditorComponent', () => {
  let component: SubEditorComponent;
  let fixture: ComponentFixture<SubEditorComponent>;

  beforeEach(async(() => {
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
