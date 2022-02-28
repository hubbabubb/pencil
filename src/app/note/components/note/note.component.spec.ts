import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockComponent} from 'ng-mocks';

import {NoteComponent} from './note.component';
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, of} from "rxjs";
import {ContentType} from "../../constants/note.constants";
import {NoteContentComponent} from "../note-content/note-content.component";
import {FooterService} from "../../../shared/service/footer.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HeaderService} from "../../../shared/service/header.service";
import {HeaderTitle} from "../../../shared/constants/header.constants";

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  let routeParamsSubject = new BehaviorSubject({ id: '' });
  let deleteSubject = new BehaviorSubject('');
  let saveSubject = new BehaviorSubject('');
  let titleSubject = new BehaviorSubject<HeaderTitle>({
    title: '',
    editable: true
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteComponent, MockComponent(NoteContentComponent) ],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: routeParamsSubject
          }
        },{
          provide: Router,
          useValue: of({})
        },{
          provide: FooterService,
          useValue: {
            deleteEmitter: deleteSubject,
            saveEmitter: saveSubject,
            footerProperties$: new BehaviorSubject('')
          }
        },{
          provide: HeaderService,
          useValue: {
            title: titleSubject,
            setTitle: (value: string): void => {
              titleSubject.next({
                title: value,
                editable: true
              });
            }
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set editMode to false', () => {
    expect(component['editMode']).toEqual(true);
  });

  it('should set editMode to true', () => {
    // Given
    routeParamsSubject.next({id: 'test_id'});

    // When
    fixture.detectChanges();

    //Then
    expect(component['editMode']).toEqual(true);
  });

  it('should set note title to TEST_TITLE', () => {
    // Given
    titleSubject.next({
      title: 'TEST_TITLE',
      editable: true
    });

    // When
    fixture.detectChanges();

    //Then
    expect(component.note.title).toEqual('TEST_TITLE');
  });

  it('should create new line', () => {
    // Given
    component.note = {
      id: 'test_id',
      title: 'test_title',
      creationDate: new Date(),
      contents: [{
        id: 0,
        content: 'test_content',
        type: ContentType.TEXT,
        checked: false
      }],
      checked: false
    }

    // When
    component.createContentInput();
    fixture.detectChanges();

    // Then
    const expectedContents = [{
      id: 0,
      content: 'test_content',
      type: ContentType.TEXT,
      checked: false
    },{
      id: 1,
      content: '',
      type: ContentType.TEXT,
      checked: false
    }];
    expect(component.note.contents).toEqual(expectedContents);
  })

  it('should not create new line', () => {
    // Given
    component.note = {
      id: 'test_id',
      title: 'test_title',
      creationDate: new Date(),
      contents: [{
        id: 0,
        content: '',
        type: ContentType.TEXT,
        checked: false
      }],
      checked: false
    }

    // When
    component.createContentInput();
    fixture.detectChanges();

    // Then
    const expectedContents = [{
      id: 0,
      content: '',
      type: ContentType.TEXT,
      checked: false
    }];
    expect(component.note.contents).toEqual(expectedContents);
  })

  it('should delete all selected contents', () => {
    // Given
    component.note = {
      id: 'test_id',
      title: 'test_title',
      creationDate: new Date(),
      contents: [{
        id: 0,
        content: 'Selected',
        type: ContentType.TODO,
        checked: true
      },{
        id: 1,
        content: 'Selected',
        type: ContentType.TODO,
        checked: true
      },{
        id: 2,
        content: 'Not Selected',
        type: ContentType.TODO,
        checked: false
      }],
      checked: false
    };

    // When
    deleteSubject.next('');
    fixture.detectChanges();

    // Then
    const expectedNote = {
      id: 'test_id',
      title: 'test_title',
      creationDate: component.note.creationDate,
      contents: [{
        id: 2,
        content: 'Not Selected',
        type: ContentType.TODO,
        checked: false
      }],
      checked: false
    };
    expect(component.note).toEqual(expectedNote);
  })

  it('should not delete any content', () => {
    // Given
    let note = {
      id: 'test_id',
      title: 'test_title',
      creationDate: new Date(),
      contents: [{
        id: 0,
        content: 'Test Text',
        type: ContentType.TEXT,
        checked: false
      },{
        id: 1,
        content: 'Not Selected',
        type: ContentType.TODO,
        checked: false
      },{
        id: 2,
        content: 'Not Selected',
        type: ContentType.TODO,
        checked: false
      }],
      checked: false
    };
    component.note = note;

    // When
    deleteSubject.next('');
    fixture.detectChanges();

    // Then
    expect(component.note).toEqual(note);
  })
});
