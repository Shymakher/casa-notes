import { NextResponse } from "next/server";
import axios from "axios";
import NoteType from "@/types/NoteType";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { body } = await request.json();
  const newBody = JSON.parse(body);

  // console.log("server PARAMS 2 ->", params.id);
  // console.log("newBody.data 2 ->", newBody.data);

  const dataToSend = JSON.stringify({
    collection: "Note",
    database: "notedb",
    dataSource: "Cluster0",
    filter: {
      _id: { $oid: params.id },
    },
    update: {
      $set: {
        ...newBody.data,
        updatedAt: { $date: new Date() },
      },
    },
  });

  const config = {
    method: "post",
    url: "https://eu-central-1.aws.data.mongodb-api.com/app/data-tjcaf/endpoint/data/v1/action/updateOne",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-Key": process.env.MONGO_DB_API_KEY,
    },
    data: dataToSend,
  };

  try {
    const response = await axios(config);
    // console.log("response ->", response.data);

    return NextResponse.json({ response: "updated" }, { status: 200 });
  } catch (error) {
    console.log("DB error ->", error);

    return NextResponse.json(
      { message: "Error updating Note" },
      { status: 500 }
    );
  }
}
