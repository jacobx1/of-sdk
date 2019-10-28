import { OFActionItem } from './OFActionItem';
import { OFTag } from './OFTag';

export interface OFTask extends OFActionItem {
  tags: OFTag[];
}
