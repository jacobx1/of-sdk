import { JXAReadonlyProperty } from './JXAProperties';
import { OFDocumentWindow } from './OFDocumentWindow';

export interface OFDocument {
  id: JXAReadonlyProperty<string>;
  documentWindows: JXAReadonlyProperty<OFDocumentWindow[]>;
}
