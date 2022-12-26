import type { StopwatchCycle } from "@/types/Stopwatch";

const STORAGE_KEY = "stopwatch";
const MILK_FROM_KEY = "milkFrom";

class StopwatchSource {
  async loadCycles(): Promise<StopwatchCycle[]> {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  }

  async saveCycles(cycles: StopwatchCycle[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cycles));
  }

  async loadMilkFrom(): Promise<string | null> {
    return localStorage.getItem(MILK_FROM_KEY) || null;
  }

  async saveMilkFrom(milkFrom: string) {
    localStorage.setItem(MILK_FROM_KEY, milkFrom);
  }
}

export default new StopwatchSource();
