import Link from "next/link";
import NoteType from "@/types/NoteType";
import Image from "next/image";

import "./NoteItem.scss";

export default function NoteItem(noteData: NoteType) {
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
    url,
    comments,
  } = noteData;

  return (
    <li className="flex items-center gap-4 border rounded-lg p-4 noteItem">
      <span className="px-1 bg-slate-100 rounded-lg status">{status}</span>

      <Link href={`/edit/${id}`} className="editNote">
        Edit Note
      </Link>

      <div className="imgWrap">
        <Image
          fill
          sizes=""
          className="border rounded"
          src={
            image ||
            "https://assets.yad2.co.il/yad2site/y2assets/images/pages/feed/feed_re_placeholder_small.png"
          }
          alt="image"
        />
      </div>

      <div className="flex flex-col self-stretch justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <span className="scroll-m-20 text-md font-semibold tracking-tight text-slate-300">
              Address
            </span>
            <span>{address || "-"}</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="scroll-m-20 text-md font-semibold tracking-tight text-slate-300">
              Rooms
            </span>
            <span>{rooms || "-"}</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="scroll-m-20 text-md font-semibold tracking-tight text-slate-300">
              Level
            </span>
            <span>
              {level && outOfLevels
                ? `${level}/${outOfLevels}`
                : level && !outOfLevels
                ? `${level}/?`
                : "-"}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="scroll-m-20 text-md font-semibold tracking-tight text-slate-300">
              Square
            </span>
            <span>{square || "-"}</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="scroll-m-20 text-md font-semibold tracking-tight text-slate-300">
              Price
            </span>
            <span>{price || "-"}</span>
          </div>

          <Link
            href={url}
            target="_blank"
            className="text-md font-semibold tracking-tight"
            // onClick={(e) => e.stopPropagation()} -> doesn't work
          >
            Go to Casa
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="scroll-m-20 text-md font-semibold tracking-tight text-slate-300">
            Comments:
          </span>
          <span>{comments || "-"}</span>
        </div>
      </div>
    </li>
  );
}
