import { IPrompt } from "@/core/interfaces/prompt";
import Link from "next/link";
import React, { FormEvent } from "react";

interface Props {
  mode: "create" | "edit";
  post: IPrompt;
  setPost: React.Dispatch<React.SetStateAction<IPrompt>>;
  loading: boolean;
  onSubmit: (evt: Event | FormEvent<HTMLFormElement>) => Promise<void>;
}

const PromptForm = (props: Props) => {
  const { mode, post, setPost, loading, onSubmit } = props;

  return (
    <section className="h-full max-w-full flex flex-col">
      <h1 className="head_text">
        <span className="capitalize blue_gradient">{mode} Prompt</span>
      </h1>

      <form onSubmit={(evt) => onSubmit(evt)} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label htmlFor="prompt-form-name">
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
          <textarea
            id="prompt-form-name"
            className="form_textarea"
            value={post.prompt}
            required
            placeholder="Write your prompt here..."
            onChange={(evt) =>
              setPost((prev) => {
                return {
                  ...prev,
                  prompt: evt.target.value,
                };
              })
            }
          />
        </label>

        <label htmlFor="prompt-form-tag">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag
            <span className="font-normal"> (#product, #webdeveloper, #idea)</span>
          </span>
          <input
            id="prompt-form-tag"
            className="form_input"
            value={post.tag}
            required
            placeholder="#tag"
            onChange={(evt) =>
              setPost((prev) => {
                return {
                  ...prev,
                  tag: evt.target.value,
                };
              })
            }
          />
        </label>

        <div className="flex-end">
          <Link href="/" className="outline_btn text-gray-500 text-sm mr-3">
            Cancel
          </Link>
          <button className="black_btn" type="submit">
            <span className="capitalize">{loading ? `${mode}...` : mode}</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default PromptForm;
