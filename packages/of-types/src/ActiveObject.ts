import DatedObject from './DatedObject';

export default interface ActiveObject extends DatedObject {
  active: boolean;
  readonly effectiveActive: boolean;
}
