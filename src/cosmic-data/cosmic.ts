export interface ICosmicNode<T> {
  id: string;
  metadata: T;
}

export interface ICosmicObjectType<T> {
  node: ICosmicNode<T>;
}
