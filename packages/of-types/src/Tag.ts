import DatabaseObject from './DatabaseObject';

export default interface Tag extends DatabaseObject {
  name: string;
  active: boolean;
}
