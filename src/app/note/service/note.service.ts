import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

import {DEMO_DATA, INIT_NOTE, Note} from "../constants/note.constants";

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

    if (storedNotesString) {
      const storedNotes = JSON.parse(storedNotesString)
      this._notes = new BehaviorSubject<Note[]>(storedNotes);
    } else {
      this._notes = new BehaviorSubject<Note[]>(DEMO_DATA);
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
