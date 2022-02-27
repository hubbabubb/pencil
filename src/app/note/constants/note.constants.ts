export interface Note {
  id: string;
  title: string;
  creationDate: any;
  checked: boolean;
  contents: NoteContent[],
  lastModified?: Date;
  onUpdate?: boolean;
}

export type NoteContent = {
  id: number;
  content?: string;
  type: ContentType;
  checked: boolean;
}

export enum ContentType {
  TEXT,
  TODO
}

export const INIT_CONTENT: NoteContent = {
  id: 0,
  content: '',
  type: ContentType.TEXT,
  checked: false
}

export const INIT_NOTE: Note = {
  id: '',
  title: '',
  creationDate: new Date(),
  checked: false,
  contents: [{ ...INIT_CONTENT }]
}

export const DEMO_DATA: Note[] = [
  {
    id: '01fdsfdsf343fgdfd',
    title: 'Test title one',
    contents: [
      {
        id: 0,
        content: 'Lorem ipsum dolor sit amet, ',
        type: ContentType.TEXT,
        checked: false
      },{
        id: 1,
        content: 'consectetuer adipiscing elit, ',
        type: ContentType.TEXT,
        checked: false
      },{
        id: 2,
        content: 'mod tincidunt ut laoreet dolore ',
        type: ContentType.TEXT,
        checked: false
      },{
        id: 3,
        content: 'Todo 1',
        type: ContentType.TODO,
        checked: false
      },{
        id: 4,
        content: 'Todo 2',
        type: ContentType.TODO,
        checked: true
      },
    ],
    creationDate: new Date(),
    checked: true
  },{
    id: 'dgdfgdf56456456',
    title: 'Test title two',
    contents: [
      {
        id: 0,
        content: 'Lorem ipsum dolor sit amet, ',
        type: ContentType.TEXT,
        checked: false
      },{
        id: 1,
        content: 'Todo 1',
        type: ContentType.TODO,
        checked: false
      }, {
        id: 2,
        content: 'consectetuer adipiscing elit, ',
        type: ContentType.TEXT,
        checked: false
      },{
        id: 3,
        content: 'mod tincidunt ut laoreet dolore ',
        type: ContentType.TEXT,
        checked: false
      },{
        id: 4,
        content: 'Todo 2',
        type: ContentType.TODO,
        checked: true
      },
    ],
    creationDate: new Date(),
    checked: false
  },{
    id: '234423Dfdsfdfs345"',
    title: 'This is a really long title',
    contents: [
      {
        id: 0,
        content: 'Todo 1',
        type: ContentType.TODO,
        checked: false
      },
      {
        id: 1,
        content: 'Todo 2',
        type: ContentType.TODO,
        checked: false
      },{
        id: 2,
        content: 'Lorem ipsum dolor sit amet, ',
        type: ContentType.TEXT,
        checked: false
      },{
        id: 3,
        content: 'Todo 3',
        type: ContentType.TODO,
        checked: false
      }, {
        id: 4,
        content: 'consectetuer adipiscing elit, ',
        type: ContentType.TEXT,
        checked: false
      },{
        id: 5,
        content: 'mod tincidunt ut laoreet dolore ',
        type: ContentType.TEXT,
        checked: false
      },
    ],
    creationDate: new Date(),
    checked: false
  },
];
