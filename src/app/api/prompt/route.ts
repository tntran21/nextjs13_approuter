import { connectToDatabase } from "@/plugins/database";
import Prompt from "@/plugins/models/prompt";

export const POST = async (req: Request) => {
  // const { userId, prompt, tag } = await req.json();

  try {
    await connectToDatabase();

    const prompts = await Prompt.find({}).populate("creator");

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
