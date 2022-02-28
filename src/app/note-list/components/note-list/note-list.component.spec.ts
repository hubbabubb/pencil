import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteListComponent } from './note-list.component';

describe('NoteListComponent', () => {
  let component: NoteListComponent;
  let fixture: ComponentFixture<NoteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
