export type StopWatchItemType = "sleep" | "awake";
export type StopwatchItem = {
  type: StopWatchItemType;
  from: string;
  to?: string;
};
export type StopwatchCycle = {
  items: StopwatchItem[];
};
