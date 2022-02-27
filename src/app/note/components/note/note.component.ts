import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NoteService} from "../../service/note.service";
import {HeaderService} from "../../../shared/service/header.service";
import {ContentType, INIT_CONTENT, INIT_NOTE, Note, NoteContent} from "../../constants/note.constants";
import {Subscription} from "rxjs";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {FooterService} from "../../../shared/service/footer.service";

@Component({
  selector: 'app-add-edit-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy {

  private routeSubscription: Subscription;
  private titleSubscription: Subscription;
  private footerSubscription: Subscription;
  private deleteSubscription: Subscription;
  private id: string;
  private editMode: boolean;
  private ALERT_TIMEOUT = 5000;

  note: Note;
  contentsForm: FormGroup;
  alert = false;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private headerService: HeaderService,
    private footerService: FooterService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.subscribeForId();
    this.subscribeForTitleChange();
    this.subscribeForSaveNote();
    this.subscribeForDeleteTodo();
  }

  private subscribeForId(): void {
    this.routeSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.editMode ? this.setEditMode() : this.setNewNote();
          this.setHeader();
          this.setFooter();
        });
  }

  private subscribeForTitleChange() {
    this.titleSubscription = this.headerService.title.subscribe(title => {
      this.note.title = title.title;
    })
  }

  private setEditMode() {
    const note = this.noteService.getNoteById(this.id);
    this.note = { ...note };

    this.toFormGroup();
  }

  private setNewNote() {
    this.note = INIT_NOTE;

    this.toFormGroup();
  }

  private setHeader(): void {
    this.headerService.setTitle({
      title: this.note.title,
      editable: true
    });
  }

  private setFooter() {
    const anyTodo = this.note.contents.some(content => content.type === ContentType.TODO);
    const trashOn = this.note.contents.some(content => content.checked);

    this.footerService.footerProperties$.next({
      editMode: true,
      isAnyNote: false,
      isAnyTodo: anyTodo,
      trashOn: trashOn
    })
  }

  private subscribeForSaveNote() {
    this.footerSubscription = this.footerService.saveEmitter.subscribe(() => {
      if (this.isValid()) {
        if (this.editMode) {
          this.noteService.updateNote(this.note);
        } else {
          this.noteService.saveNote(this.note);
        }

        this.router.navigate([''])
          .catch(err => console.error(err));
      } else {
        this.alert = true;
        setTimeout(() => this.closeAlert(), this.ALERT_TIMEOUT);
      }
    })
  }

  createContentInput(): void {
    const contentsLength = this.note.contents.length;
    const lastContent: NoteContent = this.note.contents[contentsLength - 1];

    if (lastContent.content !== "") {
      this.note.contents.push({
        id: lastContent.id + 1,
        content: '',
        type: ContentType.TEXT,
        checked: false
      });
      this.toFormGroup();
    }
  }

  deleteContentLine(id: number): void {
    if (id !== 0) {
      const content = this.note.contents.find(content => content.id === id);

      if (content?.content === "") {
        this.note.contents.splice(id, 1);
        this.toFormGroup();
      }
    }

    this.setFooter();
  }

  updateContent(data: { id: number, content: string }): void {
    this.note.contents[data.id].content = data.content;
  }

  get contents() {
    return this.contentsForm.get('contents') as FormArray;
  }

  changeContentType(id: number): void {
    this.note.contents[id].type = ContentType.TODO;
    this.setFooter();
  }

  toggleCheckBox(id: number): void {
    this.note.contents[id].checked = !this.note.contents[id].checked;
    this.setFooter();
  }

  private subscribeForDeleteTodo() {
    this.deleteSubscription = this.footerService.deleteEmitter.subscribe(() => {
      let newContents: NoteContent[] = [];

      this.note.contents.forEach(content => {
        if (!content.checked) {
          newContents.push(content);
        }
      });

      this.note.contents = newContents;
      if (this.note.contents.length === 0) {
        this.note.contents = [INIT_CONTENT];
      }

      this.toFormGroup();
      this.setFooter();
    })
  }

  private toFormGroup(): void {
    const group: any = {};

    this.note.contents.forEach(content => {
      group[content.id.toString()] = new FormControl(content.content);
    });

    this.contentsForm = new FormGroup(group);
    this.contentsForm.markAllAsTouched();
  }

  private isValid(): boolean {
    const isHeaderValid = this.note.title !== '';
    const isContentValid = this.note.contents.length > 0;

    return isHeaderValid && isContentValid;
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.titleSubscription.unsubscribe();
    this.footerSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }

  closeAlert() {
    this.alert = false;
  }
}
