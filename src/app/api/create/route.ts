import { NextResponse } from "next/server";
import axios from "axios";
import NoteType from "@/types/NoteType";

export async function POST(request: Request) {
  const { body } = await request.json();
  const newBody = JSON.parse(body);

  const dataToSend = JSON.stringify({
    collection: "Note",
    database: "notedb",
    dataSource: "Cluster0",
    document: {
      ...newBody.data,
      createdAt: { $date: new Date() },
      updatedAt: { $date: new Date() },
    },
  });

  const config = {
    method: "post",
    url: "https://eu-central-1.aws.data.mongodb-api.com/app/data-tjcaf/endpoint/data/v1/action/insertOne",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-Key": process.env.MONGO_DB_API_KEY,
    },
    data: dataToSend,
  };

  try {
    await axios(config);

    return NextResponse.json({ response: "saved" }, { status: 200 });
  } catch (error) {
    console.log("DB error ->", error);

    return NextResponse.json(
      { message: "Error creating Note" },
      { status: 500 }
    );
  }
}
