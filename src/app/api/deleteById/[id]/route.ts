import { NextResponse } from "next/server";
import axios from "axios";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("server delete note PARAMS ->", params.id);

    const dataToSend = JSON.stringify({
      collection: "Note",
      database: "notedb",
      dataSource: "Cluster0",
      filter: {
        _id: { $oid: params.id },
      },
    });

    const config = {
      method: "post",
      url: "https://eu-central-1.aws.data.mongodb-api.com/app/data-tjcaf/endpoint/data/v1/action/deleteOne",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-Key": process.env.MONGO_DB_API_KEY,
      },
      data: dataToSend,
    };

    const response = await axios(config);
    console.log("deleted NOTE", response.data);

    return NextResponse.json(
      { response: "The Case has been deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.log("server error ->", error);

    return NextResponse.json(
      { message: "Error creating Note" },
      { status: 500 }
    );
  }
}
