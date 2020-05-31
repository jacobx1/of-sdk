import Data from './Data';
import URL from './URL';
import TypeIdentifier from './TypeIdentifier';

export interface PasteboardItem {
  dataForType(type: TypeIdentifier): Data | null;
  readonly types: TypeIdentifier[];
}

export interface PasteboardItemStatic {
  new (): PasteboardItem;
}

export default interface Pasteboard {
  clear(): void;
  dataForType(type: TypeIdentifier): Data | null;
  URL: URL | null;
  URLs: URL[] | null;
}

export interface PasteboardStatic {
  makeUnique(): Pasteboard;
  readonly general: Pasteboard;
}
