"use client";

import AddForm from "@/components/AddForm/AddForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NoteType from "@/types/NoteType";
import Link from "next/link";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

// `https://jsonlink.io/api/extract?url=https://www.yad2.co.il/item/5017p0t5?utm_campaign=m-ToAd&utm_source=clipboard&utm_content=Nadlan&openedFrom=share`

export default function AddNew() {
  const { toast } = useToast();

  async function generateNote(data: FormData) {
    const newUrl = data.get("urlName")?.valueOf();

    if (typeof newUrl !== "string" || newUrl.length === 0) return;

    try {
      await axios.post(
        "/api/generate",
        {
          body: JSON.stringify({ url: newUrl }),
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
        description: "The Casa have been created",
      });
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Casa Action",
        description: "Oops! We got a problem!",
      });
    }
  }

  async function createNote(data: NoteType) {
    try {
      await axios.post(
        "/api/create",
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
        description: "The Casa have been created",
      });
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Casa Action",
        description: "Oops! We got a problem!",
      });
    }
  }

  return (
    <div>
      <Toaster />

      <div className="flex justify-between">
        <h3 className="mb-4">Add New Note</h3>
        <Button variant="link">
          <Link href="/">All Notes</Link>
        </Button>
      </div>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Generate Note</TabsTrigger>
          <TabsTrigger value="password">Create Manualy</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <form
            action={generateNote}
            className="flex w-full max-w-sm items-center space-x-2"
          >
            <Input type="text" name="urlName" placeholder="insert a url" />
            <Button type="submit">Generate</Button>
          </form>
        </TabsContent>
        <TabsContent value="password">
          <AddForm onSaveNote={createNote} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
