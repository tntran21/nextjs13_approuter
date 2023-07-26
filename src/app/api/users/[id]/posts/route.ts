import { connectToDatabase } from "@/plugins/database";
import Prompt from "@/plugins/models/prompt";
import { NextRequest } from "next/server";

interface RequestParams {
  params: {
    id: string;
  };
}

export const POST = async (req: NextRequest, { params }: RequestParams) => {
  try {
    await connectToDatabase();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
