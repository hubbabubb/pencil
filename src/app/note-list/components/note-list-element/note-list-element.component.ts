import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from "../../../note/constants/note.constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-note-list-element',
  templateUrl: './note-list-element.component.html',
  styleUrls: ['./note-list-element.component.scss']
})
export class NoteListElementComponent implements OnInit {

  @Input() note: Note;
  @Output() toggleCheckBox = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onEditNote() {
    this.router.navigate(['note', this.note.id])
  }

  onToggleCheckBox() {
    this.toggleCheckBox.next(this.note.id);
  }
}
