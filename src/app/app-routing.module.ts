import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NoteListComponent} from "./note-list/components/note-list/note-list.component";
import {NoteComponent} from "./note/components/note/note.component";

const routes: Routes = [
  {path: '', component: NoteListComponent, pathMatch: 'full'},
  {path: 'note', component: NoteComponent},
  {path: 'note/:id', component: NoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
