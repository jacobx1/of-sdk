import { JXAProperty, JXAReadonlyProperty } from './JXAProperties';

export interface OFDocumentWindow {
  searchTerm: JXAProperty<string>;
  selectedSidebarTab: JXAProperty<string>;
  content: any;
  perspectiveName: JXAProperty<string>;
}
