import { Tag as OFJSTag } from '@jacobx1/of-types';

export default function tagMapper({ id, name }: OFJSTag) {
  return {
    id: id.primaryKey,
    name,
  };
}
