import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteListElementComponent } from './note-list-element.component';

describe('NoteListElementComponent', () => {
  let component: NoteListElementComponent;
  let fixture: ComponentFixture<NoteListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteListElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
