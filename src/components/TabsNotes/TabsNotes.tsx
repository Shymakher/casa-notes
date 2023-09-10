import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PreviewDialog from "../PreviewDialog/PreviewDialog";
import NoteItem from "../NoteItem/NoteItem";

import NoteType from "@/types/NoteType";
import { StatusTypes } from "@/types/StatusTypes";
import { GroupedNotesType } from "@/types/GroupedNotes";

interface TabsNotesProps {
  groupedNotes: GroupedNotesType;
  onGetAllNotes: () => void;
}

export default function TabsNotes({
  groupedNotes,
  onGetAllNotes,
}: TabsNotesProps) {
  const statusKeys = Object.keys(groupedNotes) as (keyof typeof StatusTypes)[];

  const myTabsContent: React.ReactElement[] = [];
  const myTabsTrigger = statusKeys.map((key) => {
    myTabsContent.push(
      <TabsContent key={key} value={key}>
        <ul className="flex flex-col gap-5">
          {groupedNotes[key].map((note: NoteType) => (
            <PreviewDialog
              key={note.id}
              noteData={note}
              onGetAllNotes={onGetAllNotes}
            >
              <NoteItem {...note} />
            </PreviewDialog>
          ))}
        </ul>
      </TabsContent>
    );

    return (
      <TabsTrigger key={key} value={key}>
        {`${key}-${groupedNotes[key].length}`}
      </TabsTrigger>
    );
  });

  return (
    <div>
      <Tabs defaultValue={StatusTypes.new}>
        <TabsList>{myTabsTrigger}</TabsList>
        {myTabsContent}
      </Tabs>
    </div>
  );
}
