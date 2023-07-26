import { connectToDatabase } from "@/plugins/database";
import Prompt from "@/plugins/models/prompt";

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json();

  console.log("userId", userId);

  try {
    await connectToDatabase();
    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
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
