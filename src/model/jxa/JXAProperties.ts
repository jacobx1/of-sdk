type JXAGetter<T> = () => T;
type JXASetter<T> = (val: T) => void;

export interface JXAProperty<T> {
  get: JXAGetter<T>;
  set: JXASetter<T>;
}

export interface JXAReadonlyProperty<T> {
  get: JXAGetter<T>;
}
