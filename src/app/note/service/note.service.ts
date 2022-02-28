import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

import {DEMO_DATA, Note} from "../constants/note.constants";

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
    this.saveNotes([...newNotes]);
  }

  saveNotes(newNotes: Note[]) {
    localStorage.setItem('notes', JSON.stringify(newNotes));
    this._notes.next(newNotes);
  }

  updateNote(note: Note): void {
    let notes = [ ...this._notes.getValue() ];
    let noteToUpdate = notes.find(currNote => currNote.id === note.id);

    if (noteToUpdate) {
      let index = notes.indexOf(noteToUpdate);
      notes[index] = note;
      this.saveNotes(notes);
    }
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

  getNoteById(id: string): Note | undefined {
    let note: Note| undefined;
    note = this._notes.getValue().find(note => note.id === id);

    if (note) {
      return { ...note };
    }

    return note;
  }

  generateId(): string {
    return Math.random().toString(36).slice(2, 9);
  }
}
