import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NoteListComponent} from "./note-list/components/note-list/note-list.component";
import {AddEditNoteComponent} from "./note/components/add-edit-note/add-edit-note.component";

const routes: Routes = [
  {path: '', component: NoteListComponent, pathMatch: 'full'},
  {path: 'note', component: AddEditNoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
