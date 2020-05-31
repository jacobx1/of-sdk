import DatabaseObject from './DatabaseObject';
import TreeNode from './TreeNode';
import Pasteboard from './Pasteboard';

export default interface Tree {
  nodeForObject(object: DatabaseObject): TreeNode | null;
  nodesForObjects(objects: DatabaseObject[]): TreeNode[];
  reveal(nodes: TreeNode[]): void;
  select(nodes: TreeNode[], extending?: boolean): void;
  copyNodes(nodes: TreeNode[], to: Pasteboard): void;
  paste(
    from: Pasteboard,
    parentNode?: TreeNode | null,
    childIndex?: number | null
  ): void;

  readonly rootNode: TreeNode;
  readonly selectedNodes: TreeNode[];
}
