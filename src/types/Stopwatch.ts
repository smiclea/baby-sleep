export type StopWatchItemType = "sleep" | "awake";
export type StopwatchItem = {
  type: StopWatchItemType;
  from: Date;
  to?: Date;
};
export type StopwatchCycle = {
  items: StopwatchItem[];
};
