import { IPrompt } from "@/core/interfaces/prompt";
import PromptCard from "./PromptCard";

interface Props {
  data: IPrompt[];
  handleTagClick: (tag?: string) => void;
}

const PromptCardList = ({ data, handleTagClick }: Props) => {
  return (
    <div className="mt-6 prompt_layout w-full">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          post={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default PromptCardList;
