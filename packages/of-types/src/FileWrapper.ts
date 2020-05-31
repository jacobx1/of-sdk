import Data from './Data';
import URL from './URL';

export interface FileWrapperType {
  Directory: FileWrapperType;
  File: FileWrapperType;
  Link: FileWrapperType;
  all: FileWrapperType[];
}

export default interface FileWrapper {
  filenameForChild: (child: FileWrapper) => string | null;
  readonly children: FileWrapper[];
  readonly contents: Data | null;
  readonly destination: URL | null;
  filename: string | null;
  readonly preferredFilename: string | null;
  readonly type: FileWrapperType;
}

export interface FileWrapperStatic {
  withContents: (name: string | null, contents: Data) => FileWrapper;
  withChildren: (name: string, children: FileWrapperStatic[]) => FileWrapper;
}
