import type { StopwatchCycle } from "@/types/Stopwatch";

const STORAGE_KEY = "stopwatch";

class StopwatchSource {
  async loadCycles(): Promise<StopwatchCycle[]> {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  }

  async saveCycles(cycles: StopwatchCycle[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cycles));
  }
}

export default new StopwatchSource();
