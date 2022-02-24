import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './layout/header/header.component';
import { NoteListComponent } from './note-list/components/note-list/note-list.component';
import { AddEditNoteComponent } from './note/components/add-edit-note/add-edit-note.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NoteListComponent,
    AddEditNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
