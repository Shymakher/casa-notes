import { NextResponse } from "next/server";
import axios from "axios";

interface objProps {
  _id: string;
}

const getProps = ({ _id, ...rest }: objProps) => ({ ...rest, id: _id });

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // console.log("server PARAMS ->", params.id);

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
      url: "https://eu-central-1.aws.data.mongodb-api.com/app/data-tjcaf/endpoint/data/v1/action/findOne",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-Key": process.env.MONGO_DB_API_KEY,
      },
      data: dataToSend,
    };

    const response = await axios(config);
    // console.log("1 NOTE", response.data.document);
    // console.log("2 NEW NOTE", getProps(response.data.document));

    return NextResponse.json(
      { response: getProps(response.data.document) },
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
