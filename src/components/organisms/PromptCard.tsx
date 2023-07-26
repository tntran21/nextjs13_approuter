"use client";

import { IPrompt } from "@/core/interfaces/prompt";
import Image from "next/image";

const defaultAvatar = require("@/assets/images/avatar.jpg");

interface Props {
  prompt: IPrompt;
  handleTagClick: (tag?: string) => void;
}

const PromptCard = ({ prompt, handleTagClick }: Props) => {
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={prompt?.creator?.avatar ?? defaultAvatar}
            width={40}
            height={40}
            className="rounded-full object-contain"
            alt="creator"
          />

          <div className="flex flex-col">
            <h3>{prompt?.creator?.username}</h3>
            <p>{prompt?.creator?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
