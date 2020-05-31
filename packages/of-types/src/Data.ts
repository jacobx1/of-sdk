import DatabaseObject from './DatabaseObject';

export default interface Data {
  toString: () => string;
  toBase64: () => string;

  readonly length: number;
  readonly toObject: DatabaseObject;
}

export interface DataStatic {
  fromString: (string: string) => Data;
  fromBase64: (string: string) => Data;
}
