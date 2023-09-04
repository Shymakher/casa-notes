import { NextResponse } from "next/server";
import axios from "axios";
import { StatusTypes } from "@/types/StatusTypes";

const dataToSendAll = JSON.stringify({
  collection: "Note",
  database: "notedb",
  dataSource: "Cluster0",
});

const configGellAll = {
  method: "post",
  url: "https://eu-central-1.aws.data.mongodb-api.com/app/data-tjcaf/endpoint/data/v1/action/find",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-Key": process.env.MONGO_DB_API_KEY,
  },
  data: dataToSendAll,
};

export async function POST(request: Request) {
  try {
    const { body } = await request.json();
    const { url } = JSON.parse(body);

    const response = await axios(configGellAll);
    const notes = response.data.documents;

    const existed = notes.find((note) => url.startsWith(note.url));
    if (existed) {
      throw new Error("Already exist");
    }

    const jsonLinkResponse = await fetch(
      `https://jsonlink.io/api/extract?url=${url}`
    );

    const dataResponse = await jsonLinkResponse.json();

    const dataToSend = JSON.stringify({
      collection: "Note",
      database: "notedb",
      dataSource: "Cluster0",
      document: {
        status: StatusTypes.new,
        title: dataResponse.title,
        description: dataResponse.description,
        source: dataResponse.domain,
        image: dataResponse.images[0],
        url: dataResponse.url,
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

    await axios(config);

    return NextResponse.json({ response: "saved" }, { status: 200 });
  } catch (error) {
    console.log("server error ->", error);

    return NextResponse.json(
      { message: "Error creating Note" },
      { status: 500 }
    );
  }
}
