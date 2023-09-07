"use client";

import { useState, useEffect } from "react";

// import { prisma } from "@/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import TabsNotes from "@/components/TabsNotes/TabsNotes";
import { GroupedNotesType } from "@/types/GroupedNotes";
import { fetchCache } from "./api/getAll/route";

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

  const [groupedNotes, setGroupedNotes] = useState<GroupedNotesType>({});

  async function getAllNotes() {
    try {
      const data = await fetch("/api/getAll", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "Cache-Control": fetchCache, // store
        },
      });

      const { response } = await data.json();

      console.log("resp");

      setGroupedNotes(response);
    } catch (error) {}
  }
  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-8">
        <Button variant="link">
          <Link href="/new">Add New</Link>
        </Button>
      </div>

      <TabsNotes groupedNotes={groupedNotes} onGetAllNotes={getAllNotes} />
    </div>
  );
}
