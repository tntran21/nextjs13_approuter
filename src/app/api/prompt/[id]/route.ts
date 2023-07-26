import { connectToDatabase } from "@/plugins/database";
import Prompt from "@/plugins/models/prompt";
import { NextRequest } from "next/server";

interface RequestParams {
  params: {
    id: string;
  };
}

// GET (read)
export const GET = async (req: NextRequest, { params }: RequestParams) => {
  try {
    await connectToDatabase();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response(JSON.stringify({ message: "Prompt not found!" }), {
        status: 200,
      });
    }

    return new Response(JSON.stringify(prompt), {
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

// POST (update)
export const POST = async (req: NextRequest, { params }: RequestParams) => {
  const payload = await req.json();
  try {
    await connectToDatabase();

    const existingPrompt = await Prompt.findById(params.id).populate("creator");
    if (!existingPrompt) {
      return new Response(JSON.stringify({ message: "Prompt not found!" }), {
        status: 200,
      });
    }

    existingPrompt.prompt = payload;

    return new Response(JSON.stringify(existingPrompt), {
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

// DELETE (remove)

export const DELETE = async (req: NextRequest, { params }: RequestParams) => {
  try {
    await connectToDatabase();

    await Prompt.findByIdAndDelete(params.id);
    return new Response(JSON.stringify({ message: "Prompt deleted" }), {
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
