"use client";

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import PromptForm from "@/components/organisms/PromptForm";
import { IPrompt } from "@/core/interfaces/prompt";

const PromptCreatePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [apiLoading, setApiLoading] = useState(false);
  const [post, setPost] = useState<IPrompt>({
    prompt: "",
    tag: "",
  });

  /**
   * ### Creates a prompt by making a POST request to the "/api/prompt" endpoint.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  const createPrompt = async (e: Event | FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setApiLoading(true);

    try {
      const payload = {
        userId: session?.user.id,
        prompt: post.prompt,
        tag: post.tag,
      };
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <div className="flex-center">
      <PromptForm mode="create" post={post} setPost={setPost} loading={apiLoading} onSubmit={createPrompt} />
    </div>
  );
};

export default PromptCreatePage;
