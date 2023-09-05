"use client";

import AddForm from "@/components/AddForm/AddForm";
import { Button } from "@/components/ui/button";
import NoteType from "@/types/NoteType";
import Link from "next/link";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

async function getNoteById(id: string) {
  try {
    return await axios.get(`/api/getById/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
      },
    });
  } catch (error) {
    console.log("error", error);
  }
}

interface EditNoteProps {
  params: { id: string };
}

export default function EditNote(props: EditNoteProps) {
  const { params } = props;
  const [note, setNote] = useState<NoteType>();
  const { toast } = useToast();
  const router = useRouter();

  async function editNote(data: NoteType) {
    try {
      await axios.post(
        `/api/edit/${note?.id}`,
        {
          body: JSON.stringify({ data }),
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
          },
        }
      );

      toast({
        title: "Casa Action",
        description: "The Casa have been updated",
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  async function deleteNote(id: string) {
    try {
      await axios.delete(`/api/deleteById/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
        },
      });

      toast({
        title: "Casa Action",
        description: "The Casa have been deleted",
      });

      router.replace("/");
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    try {
      const getNote = async () => {
        const response = await getNoteById(params.id);
        setNote(response?.data.response);
      };
      getNote();
    } catch (error) {
      console.log("error", error);
    }
  }, [params.id]);

  return (
    <div>
      <Toaster />

      <div className="flex justify-between">
        <h3 className="mb-4">Edit Note</h3>

        <Button type="button" variant="link">
          <Link href="/">All Notes</Link>
        </Button>
      </div>

      {note && (
        <AddForm note={note} onSaveNote={editNote} onDelete={deleteNote} />
      )}
    </div>
  );
}
