export default interface ForecastDay {
  badgeKind(): any;
  readonly badgeCount: number;
  readonly date: Date;
  readonly deferredCount: number;
  readonly kind: any;
  readonly name: string;
}

export interface ForecastDayStatic {
  badgeCountsIncludeDeferredItems: boolean;
}
