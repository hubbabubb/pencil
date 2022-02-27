import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoteHeaderComponent } from './shared/components/note-header/note-header.component';
import { NoteListComponent } from './note-list/components/note-list/note-list.component';
import { AddEditNoteComponent } from './note/components/add-edit-note/add-edit-note.component';
import { NoteContentComponent } from './note/components/note-content/note-content.component';
import { NoteListElementComponent } from './note-list/components/note-list-element/note-list-element.component';
import { CheckBoxComponent } from './shared/components/check-box/check-box.component';
import { NoteFooterComponent } from './shared/components/note-footer/note-footer.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AutoFocusDirective } from './shared/directives/auto-focus/auto-focus.directive';
import {DatePipe} from "@angular/common";
import { TextareaAutosizeDirective } from './shared/directives/textarea-autosize/textarea-autosize.directive';

@NgModule({
  declarations: [
    AppComponent,
    NoteHeaderComponent,
    NoteListComponent,
    AddEditNoteComponent,
    NoteContentComponent,
    NoteListElementComponent,
    CheckBoxComponent,
    NoteFooterComponent,
    AutoFocusDirective,
    TextareaAutosizeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
