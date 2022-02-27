import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

import {ContentType, INIT_NOTE, Note} from "../constants/note.constants";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private _notes: BehaviorSubject<Note[]>;

  constructor() {
    this.setNotes();
  }

  saveNote(note: Note): void {
    const newNotes = this._notes.getValue();
    newNotes.push(note);
    this.saveNotes(newNotes);
  }

  saveNotes(newNotes: Note[]) {
    localStorage.setItem('notes', JSON.stringify(newNotes));
    this._notes.next(newNotes);
  }

  updateNote(note: Note): void {
    const notesArray = this._notes.getValue();

    if (note) {
      const index = notesArray.indexOf(note);

      notesArray[index] = note;
    }

    this.saveNotes(notesArray);
  }

  private setNotes(): void {
    const storedNotesString = localStorage.getItem('notes');

    //TODO: DEMO DATA - Should remove
    const demoData: Note[] = [
      {
        id: '01fdsfdsf343fgdfd',
        title: 'Test title one',
        contents: [
          {
          id: 0,
          content: 'Lorem ipsum dolor sit amet, ',
          type: ContentType.TEXT,
          checked: false
        },{
          id: 1,
          content: 'consectetuer adipiscing elit, ',
          type: ContentType.TEXT,
          checked: false
        },{
          id: 2,
          content: 'mod tincidunt ut laoreet dolore ',
          type: ContentType.TEXT,
          checked: false
        },{
          id: 3,
          content: 'Todo 1',
          type: ContentType.TODO,
          checked: false
        },{
          id: 4,
          content: 'Todo 2',
          type: ContentType.TODO,
          checked: true
        },
        ],
        creationDate: new Date(),
        checked: true
      },{
        id: 'dgdfgdf56456456',
        title: 'Test title two',
        contents: [
          {
          id: 0,
          content: 'Lorem ipsum dolor sit amet, ',
          type: ContentType.TEXT,
          checked: false
        },{
          id: 1,
          content: 'consectetuer adipiscing elit, ',
          type: ContentType.TEXT,
          checked: false
        },{
          id: 2,
          content: 'mod tincidunt ut laoreet dolore ',
          type: ContentType.TEXT,
          checked: false
        },{
          id: 3,
          content: 'Todo 1',
          type: ContentType.TODO,
          checked: false
        },{
          id: 4,
          content: 'Todo 2',
          type: ContentType.TODO,
          checked: true
        },
        ],
        creationDate: new Date(),
        checked: false
      },
    ];

    if (storedNotesString) {
      const storedNotes = JSON.parse(storedNotesString)
      this._notes = new BehaviorSubject<Note[]>(storedNotes);
    } else {
      this._notes = new BehaviorSubject<Note[]>(demoData);
    }
  }

  get notes(): Observable<Note[]> {
    return this._notes.asObservable();
  }

  getNoteById(id: string): Note {
    const note = this._notes.getValue().find(note => note.id === id);

    return note ? note : INIT_NOTE;
  }
}
