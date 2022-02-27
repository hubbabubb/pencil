import {Component, OnDestroy, OnInit} from '@angular/core';
import {Note} from "../../../note/constants/note.constants";
import {NoteService} from "../../../note/service/note.service";
import {map, Subscription} from "rxjs";
import {HeaderService} from "../../../shared/service/header.service";
import {HEADER_TITLES, HeaderTitle} from "../../../shared/constants/header.constants";
import {FooterService} from "../../../shared/service/footer.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy {
  private noteSubscription: Subscription
  private deleteSubscription: Subscription

  notes: Note[] = [];
  isAnyNotes = false;

  constructor(
    private noteService: NoteService,
    private headerService: HeaderService,
    private footerService: FooterService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.subscribeForNotes();
    this.subscribeForDelete();
  }

  private subscribeForNotes() {
    this.noteSubscription = this.noteService.notes
      .pipe(
        map(notes => {
          return notes.map(note => {
            return {
              ...note,
              creationDate: this.datePipe.transform(note.creationDate, "yyyy.MM.dd. HH:mm")
            }
          })
        })
      )
      .subscribe(notes => {
        this.notes = notes;
        this.isAnyNotes = notes.length > 0;

        this.setHeaderTitle();
        this.setFooter();
      })
  }

  private setHeaderTitle() {
    let title: HeaderTitle = {
      title: HEADER_TITLES.INIT,
      editable: false
    };

    if (this.isAnyNotes) {
      title.title = HEADER_TITLES.NOTES_LIST;
    }

    this.headerService.setTitle(title);
  }

  private setFooter() {
    const anyNotes = this.notes.length > 0;
    const anySelected = this.notes.some(note => note.checked);

    this.footerService.footerProperties$.next({
      editMode: false,
      isAnyNote: anyNotes,
      isAnyTodo: false,
      trashOn: anySelected
    })
  }

  toggleCheckBox(id: string): void {
    const note = this.noteService.getNoteById(id);

    if (note) {
      note.checked = !note.checked;
      this.noteService.updateNote(note);
    }
  }

  private subscribeForDelete() {
    this.deleteSubscription = this.footerService.deleteEmitter.subscribe(() => {
      let newNotes: Note[] = [];
      this.notes.forEach(note => {
        if (!note.checked) {
          newNotes.push(note);
        }
      })

      this.noteService.saveNotes(newNotes);
    })
  }

  ngOnDestroy() {
    this.noteSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }
}
