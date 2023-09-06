import { GroupedNotesType } from "@/types/GroupedNotes";
import NoteType from "@/types/NoteType";
import { StatusTypes } from "@/types/StatusTypes";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const customKeysOrder: StatusTypes[] = [
  StatusTypes.new,
  StatusTypes.viewed,
  StatusTypes.hadACall,
  StatusTypes.visited,
  StatusTypes.notRelevant,
];

export function groupObjectsByStatus(objects: NoteType[]): GroupedNotesType {
  const groupedObjects: GroupedNotesType = {};
  for (const obj of objects) {
    const status = obj.status;

    if (!groupedObjects[status]) {
      groupedObjects[status] = [];
    }

    groupedObjects[status].push(obj);
  }

  const sortedGroupedObjects: GroupedNotesType = {};
  customKeysOrder.forEach((key) => {
    if (groupedObjects[key]) {
      sortedGroupedObjects[key] = groupedObjects[key];
    }
  });

  return sortedGroupedObjects;
}
