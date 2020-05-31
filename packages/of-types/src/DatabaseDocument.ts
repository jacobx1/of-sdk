import Document from './Document';
import DocumentWindow from './DocumentWindow';

export default interface DatabaseDocument extends Document {
  newWindow: () => Promise<DocumentWindow>;
  newTabOnWindow: (window: DocumentWindow) => Promise<DocumentWindow>;
  readonly windows: DocumentWindow[];
}
