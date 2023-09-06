import { NextResponse } from "next/server";
import axios from "axios";
import { groupObjectsByStatus } from "@/lib/utils";

const dataToSendAll = JSON.stringify({
  collection: "Note",
  database: "notedb",
  dataSource: "Cluster0",
  // projection: {
  //   _id: 0,
  //   id: "$_id",
  // },
  pipeline: [
    // {
    //   $sort: { updatedAt: -1 },
    // },
    // {
    //   $project: {
    //     _id: 0, // Exclude the original _id field
    //     // id: "$_id",
    //   },
    // },
    { $set: { id: "$_id" } },
    { $unset: "_id" },
  ],
});

const configGellAll = {
  method: "post",
  url: "https://eu-central-1.aws.data.mongodb-api.com/app/data-tjcaf/endpoint/data/v1/action/aggregate", // find
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-Key": process.env.MONGO_DB_API_KEY,
  },
  data: dataToSendAll,
};

export async function GET(request: Request) {
  try {
    const response = await axios(configGellAll);
    const notes = response.data.documents;
    const groupedNotes = groupObjectsByStatus(notes);
    // console.log("groupedNotes ->", groupedNotes);

    return NextResponse.json({ response: groupedNotes }, { status: 200 });
  } catch (error) {
    console.log("server error ->", error);

    return NextResponse.json(
      { message: "Error fetching all notes" },
      { status: 500 }
    );
  }
}
