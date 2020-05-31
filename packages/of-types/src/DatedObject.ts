import DatabaseObject from './DatabaseObject';

export default interface DatedObject extends DatabaseObject {
  added: Date | null;
  modified: Date | null;
}
