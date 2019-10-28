declare module 'osa2' {
  type OSA2Callable = (...args: any[]) => any;

  function osa2<TReturn = void>(
    callable: OSA2Callable
  ): (...args: any[]) => Promise<TReturn>;

  export = osa2;
}
