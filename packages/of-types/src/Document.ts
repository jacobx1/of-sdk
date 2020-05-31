import FileWrapper from './FileWrapper';

export default interface Document {
  close: (didCancel: (() => void) | null) => void;
  save: () => void;
  makeFileWrapper: (
    baseName: string,
    type: string | null
  ) => Promise<FileWrapper>;
  undo: () => void;
  redo: () => void;
  show: (resultFunction: (() => void) | null) => void;

  readonly canRedo: boolean;
  readonly canUndo: boolean;
  readonly fileType: string | null;
  readonly name: string | null;
  readonly writeableTypes: string[];
}

export interface DocumentStatic {
  new (): Document;
  makeNew: (resultFunction: (() => Document) | null) => Promise<Document>;
  makeNewAndShow: (
    resultFunction: (() => Document) | null
  ) => Promise<Document>;
}
