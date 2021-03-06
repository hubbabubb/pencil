import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteHeaderComponent } from './note-header.component';

describe('HeaderComponent', () => {
  let component: NoteHeaderComponent;
  let fixture: ComponentFixture<NoteHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
