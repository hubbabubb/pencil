import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteComponent } from './note.component';
import {ActivatedRoute, Router} from "@angular/router";
import {of} from "rxjs";

describe('AddEditNoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            'params': of([{
              id: ''
            }])
          }
        },
        {
          provide: Router,
          useValue: of({})
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
