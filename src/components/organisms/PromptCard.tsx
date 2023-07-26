"use client";

import { IPrompt } from "@/core/interfaces/prompt";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const defaultAvatar = require("@/assets/images/avatar.jpg");

interface Props {
  post: IPrompt;
  onTagClick?: (tag?: string) => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

const PromptCard = ({ post, onTagClick, onEdit, onDelete }: Props) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => setCopied(""), 300);
  };

  return (
    <div className="prompt_card text-left">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post?.creator?.avatar ?? defaultAvatar}
            width={40}
            height={40}
            className="rounded-full object-contain"
            alt="creator"
          />

          <div className="flex flex-col items-start">
            <h3 className="font-semibold font-satoshi text-gray-900 ">
              {post?.creator?.username}
            </h3>
            <p className="font-inter text-gray-500 text-sm">
              {post?.creator?.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={() => {}}>
          <Image
            onClick={handleCopy}
            src={
              copied === post?.prompt
                ? require("@/assets/icons/tick.svg")
                : require("@/assets/icons/copy.svg")
            }
            width={12}
            height={12}
            alt="copy"
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => onTagClick && onTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {/* Check show edit/delete button */}
      {session?.user.id === post.creator?._id && pathname === "/user" && (
        <div className="flex-center mt-5 border-t border-gray-200 gap-4 pt-3">
          <button
            onClick={() => onEdit && onEdit()}
            className="font-inter text-sm green_gradient"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete && onDelete()}
            className="font-inter text-sm orange_gradient"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
