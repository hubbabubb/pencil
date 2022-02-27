import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {NoteContent} from "../../constants/note.constants";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-note-content',
  templateUrl: './note-content.component.html',
  styleUrls: ['./note-content.component.scss']
})
export class NoteContentComponent {

  isOnHover = false;
  @Input() content: NoteContent;
  @Input() id: number;
  @Input() form: FormGroup;
  @Output() createNewLine = new EventEmitter<string>();
  @Output() deleteLine = new EventEmitter<number>();
  @Output() contentChange = new EventEmitter<{id: number, content: string}>();
  @Output() typeChange = new EventEmitter<number>();
  @Output() toggleCheck = new EventEmitter<number>();

  onInputChange(event: any) {
    let value = event.target.value;
    this.contentChange.next({id: this.content.id, content: value});
    if (event.key === "Enter") {
      event.preventDefault();
      this.createNewLine.next('');
    }

    if (event.key === "Backspace") {
      this.deleteLine.next(this.id);
    }
  }

  onTypeChange() {
    this.typeChange.next(this.id);
  }

  onCheckToggle() {
    this.toggleCheck.next(this.id);
  }

  @HostListener('mouseover') onHoverTrue() {
    this.isOnHover = true;
  }

  @HostListener('mouseout') onHoverFalse() {
    this.isOnHover = false;
  }
}
