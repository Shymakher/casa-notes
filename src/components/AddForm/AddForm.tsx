"use client";

import { StatusTypes } from "@/types/StatusTypes";
import NoteType from "@/types/NoteType";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface AddFormProps {
  note?: NoteType;
  onSaveNote: (data: NoteType) => void;
  onDelete?: (id: string) => void;
}

const formSchema = z.object({
  address: z.string(),
  rooms: z.number().default(0),
  level: z.number(),
  outOfLevels: z.number(),
  square: z.number(),
  price: z.number(),
  status: z.string(),
  title: z.string(),
  description: z.string(),
  source: z.string({
    required_error: "This field is required",
  }),
  image: z.string(),
  url: z.string({
    required_error: "This field is required",
  }),
  contactPrimary: z.string(),
  phoneNumberPrimary: z.string(),
  contactSecondary: z.string(),
  phoneNumberSecondary: z.string(),
  comments: z.string(),
  isParking: z.boolean(),
  isRealtor: z.boolean(),
});

export default function AddForm(props: AddFormProps) {
  const { note, onDelete } = props;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: note?.address || "",
      rooms: note?.rooms || 0,
      level: note?.level || 0,
      outOfLevels: note?.outOfLevels || 0,
      square: note?.square || 0,
      price: note?.price || 0,
      status: note?.status || StatusTypes.new,
      title: note?.title || "",
      description: note?.description || "",
      source: note?.source || "",
      image: note?.image || "",
      url: note?.url || "",
      contactPrimary: note?.contactPrimary || "",
      phoneNumberPrimary: note?.phoneNumberPrimary || "",
      contactSecondary: note?.contactSecondary || "",
      phoneNumberSecondary: note?.phoneNumberSecondary || "",
      comments: note?.comments || "",
      isParking: note?.isParking || false,
      isRealtor: note?.isRealtor || false,
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // console.log(values);
    props.onSaveNote(values as any);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="isRealtor"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Realtor</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isParking"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Parking</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rooms</FormLabel>
              <FormControl>
                <Input
                  placeholder="Rooms"
                  type="number"
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <FormControl>
                <Input
                  placeholder="level"
                  type="number"
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="outOfLevels"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Out Of Levels</FormLabel>
              <FormControl>
                <Input
                  placeholder="outOfLevels"
                  type="number"
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="square"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Square</FormLabel>
              <FormControl>
                <Input
                  placeholder="square"
                  type="number"
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="price"
                  type="number"
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                required
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(
                    Object.keys(StatusTypes) as (keyof typeof StatusTypes)[]
                  ).map((key) => (
                    <SelectItem key={key} value={StatusTypes[key]}>
                      {StatusTypes[key]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <FormControl>
                <Input required placeholder="source" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input placeholder="image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input required placeholder="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-1">
          <FormField
            control={form.control}
            name="contactPrimary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Primary</FormLabel>
                <FormControl>
                  <Input placeholder="contact Primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumberPrimary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number Primary</FormLabel>
                <FormControl>
                  <Input placeholder="phone Number Primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-1">
          <FormField
            control={form.control}
            name="contactSecondary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Secondary</FormLabel>
                <FormControl>
                  <Input placeholder="contact Secondary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumberSecondary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number Secondary</FormLabel>
                <FormControl>
                  <Input placeholder="phone Number Secondary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Textarea placeholder="input your comments" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          {note && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => onDelete?.(note.id)}
            >
              Delete
            </Button>
          )}

          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
