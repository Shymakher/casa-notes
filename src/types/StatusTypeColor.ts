import { StatusTypes } from "./StatusTypes";

export const statusColor: Record<StatusTypes, { color: string }> = {
  [StatusTypes.new]: { color: "#4CAF50" },
  [StatusTypes.viewed]: { color: "#9E9E9E" },
  [StatusTypes.visited]: { color: "#FF9800" },
  [StatusTypes.hadACall]: { color: "#9C27B0" },
  [StatusTypes.notRelevant]: { color: "#F44336" },
  [StatusTypes.gonnaVisit]: { color: "#707ec9" },
};
