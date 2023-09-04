"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NoteType from "@/types/NoteType";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

import "./PreviewDialog.scss";

interface PreviewDialogProps {
  children: string | JSX.Element | JSX.Element[];
  noteData: NoteType;
  onDelete?: (id: string) => void;
}

export default function PreviewDialog(props: PreviewDialogProps) {
  const router = useRouter();
  const { toast } = useToast();

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

      router.refresh();
    } catch (error) {
      console.log("error", error);
    }
  }

  const { children, noteData } = props;

  const {
    id,
    image,
    status,
    address,
    rooms,
    level,
    outOfLevels,
    square,
    price,
    source,
    url,
    title,
    description,
    contactPrimary,
    phoneNumberPrimary,
    contactSecondary,
    phoneNumberSecondary,
    comments,
  } = noteData;

  const renderItem = (field: string, value: string) => {
    return (
      <div className="flex flex-col">
        <span className="scroll-m-20 text-md font-semibold tracking-tight text-slate-300">
          {field}
        </span>
        <span>{value || "-"}</span>
      </div>
    );
  };

  return (
    <Dialog>
      <Toaster />

      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px] dialogContent">
        <DialogHeader>
          <DialogTitle>Preview Casa</DialogTitle>
          <DialogDescription>Overview your casa</DialogDescription>
        </DialogHeader>

        <div className="mainInfo flex gap-3">
          <div className="imgWrap">
            <Image
              fill
              className="border rounded"
              src={
                image ||
                "https://assets.yad2.co.il/yad2site/y2assets/images/pages/feed/feed_re_placeholder_small.png"
              }
              alt="image"
            />
          </div>

          <div>
            {renderItem("Title", title)}
            {renderItem("Description", description)}
            {renderItem("Status", status)}
          </div>
        </div>

        {renderItem("Comments", comments)}

        <h3 className="text-lg font-semibold">Contacts</h3>
        <div className="flex gap-4">
          {renderItem("Contact Primary", contactPrimary)}
          {renderItem("Phone Number Primary", phoneNumberPrimary)}
        </div>
        <div className="flex gap-4">
          {renderItem("Contact Primary", contactSecondary)}
          {renderItem("Phone Number Primary", phoneNumberSecondary)}
        </div>

        <h3 className="text-lg font-semibold">Addtional Info</h3>
        <div className="flex gap-4">
          {renderItem("Address", address)}
          {renderItem("Rooms", rooms)}
          <div className="flex flex-col items-center">
            <span className="scroll-m-20 text-md font-semibold tracking-tight text-slate-300">
              Level
            </span>
            <span>
              {level && outOfLevels ? `${level}/${outOfLevels}` : "-"}
            </span>
          </div>
          {renderItem("Square", square)}
          {renderItem("Price", price)}
        </div>

        <Link
          className="text-md font-semibold"
          href={url}
          target="_blank"
        >{`Open ${source} to review the Casa`}</Link>

        <DialogFooter>
          <Button
            type="button"
            variant="destructive"
            onClick={() => deleteNote(noteData.id)}
          >
            Delete
          </Button>

          <Button type="button" variant="link">
            <Link href={`/edit/${noteData.id}`} prefetch>
              Edit Note
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
