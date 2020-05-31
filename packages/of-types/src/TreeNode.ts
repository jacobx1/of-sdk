import DatabaseObject from './DatabaseObject';

export default interface TreeNode {
  readonly level: number;
  readonly object: DatabaseObject;
  readonly parent: TreeNode;
  readonly rootNode: TreeNode;
}
