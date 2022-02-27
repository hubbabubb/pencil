import {UUID} from "angular2-uuid";

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
  id: UUID.UUID(),
  title: '',
  creationDate: new Date(),
  checked: false,
  contents: [INIT_CONTENT]
}
