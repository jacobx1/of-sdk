import { OFItem } from './OFItem';

export interface OFTag extends OFItem {
  hidden: boolean;
  effectivelyHidden: boolean;
  availableTaskCount: number;
  remainingTaskCount: number;
}
