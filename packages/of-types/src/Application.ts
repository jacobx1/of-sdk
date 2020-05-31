import URL from './URL';
import Document from './Document';

export default interface Application {
  commandKeyDown: boolean;
  controlKeyDown: boolean;
  name: string;
  optionKeyDown: boolean;
  platformName: string;
  shiftKeyDown: boolean;
  version: string;
}

export interface ApplicationStatic {
  openDocument: (
    from: Document | null,
    url: URL,
    completed: (docOrError: Document | Error, alreadyOpen: boolean) => void
  ) => void;
}
