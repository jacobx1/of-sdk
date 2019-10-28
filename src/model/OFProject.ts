import { OFActionItem } from './OFActionItem';
import { OFStatus } from './OFStatus';

export interface OFProject extends OFActionItem {
  effectiveStatus: OFStatus;
  numberOfTasks: number;
  status: OFStatus;
}
