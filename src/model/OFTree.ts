import { OFItem } from './OFItem';

export interface OFTree extends OFItem {
  children: OFTree[];
}
