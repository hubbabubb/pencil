import {Component, OnDestroy, OnInit} from '@angular/core';
import {HEADER_TITLES, HeaderTitle} from "../../constants/header.constants";
import {Subscription} from "rxjs";
import {HeaderService} from "../../service/header.service";
import {Router} from "@angular/router";
import {NoteService} from "../../../note/service/note.service";

@Component({
  selector: 'app-note-header',
  templateUrl: './note-header.component.html',
  styleUrls: ['./note-header.component.scss']
})
export class NoteHeaderComponent implements OnInit, OnDestroy {

  private titleSubscription: Subscription;
  private noteSubscription: Subscription;
  TITLE_MAX_LENGTH = 26;

  title: HeaderTitle;
  isOnUpdate = false;
  isAnyNotes = false;

  constructor(
    private headerService: HeaderService,
    private noteService: NoteService,
    private router: Router
  ) {
    this.title = {
      title: HEADER_TITLES.INIT,
      editable: false
    }
  }

  ngOnInit(): void {
    this.subscribeForTitle();
    this.subscribeForNotes();
  }

  private subscribeForTitle(): void {
    this.titleSubscription = this.headerService.title.subscribe(title => {
        this.title = title;
        this.isOnUpdate = title.editable;
      }
    );
  }

  private subscribeForNotes() {
    this.noteSubscription = this.noteService.notes.subscribe(notes => {
      this.isAnyNotes = notes.length > 0;
    })
  }

  onNewNote() {
    this.router
      .navigate(['note'])
      .catch(err => console.error(err));
  }

  onHeaderTitleChange($event: any) {
    const titleValue = $event.target.value;

    this.headerService.setTitle({
      title: titleValue,
      editable: true
    })
  }

  ngOnDestroy() {
    this.titleSubscription.unsubscribe();
    this.noteSubscription.unsubscribe();
  }
}
