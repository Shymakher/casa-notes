"use client";

import { useState, useEffect } from "react";

import { prisma } from "@/db";
import NoteItem from "@/components/NoteItem/NoteItem";
import Link from "next/link";
import PreviewDialog from "@/components/PreviewDialog/PreviewDialog";
import { Button } from "@/components/ui/button";
import NoteType from "@/types/NoteType";
import axios from "axios";

// prisma.note.create({
//   data: {
//     address: "Holon, Eilat 43",
//     rooms: 3,
//     level: 2,
//     outOfLevels: 4,
//     square: 80,
//     status: StatusTypes.new,
//     title: "Appartment in Holon",
//     description: "Some description",
//     source: "yad2",
//     image: "",
//     url: "google.com",
//   },
// });

// export const dynamic = "force-dynamic"; //  no-cache

// async function getAllNotes() {
//   return await prisma.note.findMany({
//     orderBy: [
//       {
//         updatedAt: "desc",
//       },
//     ],
//   });
// }

export default function Home() {
  // const notes = await getAllNotes();

  const [notes, setNotes] = useState([]);
  useEffect(() => {
    async function getAllNotes() {
      try {
        const response = await axios.get("/api/getAll", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
          },
        });

        setNotes(response.data.response);
      } catch (error) {}
    }

    getAllNotes();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-8">
        <Button variant="link">
          <Link href="/new">Add New</Link>
        </Button>
      </div>

      {notes && notes.length ? (
        <ul className="flex flex-col gap-5">
          {notes.map((note: NoteType) => (
            <PreviewDialog key={note.id} noteData={note}>
              <NoteItem {...note} />
            </PreviewDialog>
          ))}
        </ul>
      ) : (
        "no data"
      )}
    </div>
  );
}
