import { OFJSTag } from '../model/omnijs/ofjs';

export default function tagMapper({ id, name }: OFJSTag) {
  return {
    id: id.primaryKey,
    name,
  };
}
