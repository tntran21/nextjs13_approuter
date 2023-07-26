import { IPrompt } from "@/core/interfaces/prompt";
import PromptCard from "@/components/organisms/PromptCard";

interface Props {
  name: string;
  desc: string;
  data: IPrompt[];
  onEdit?: (post: IPrompt) => void;
  onDelete?: (post: IPrompt) => void;
}

const ProfileInfo = ({ name, desc, data, onEdit, onDelete }: Props) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}</span> Profile
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-4">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            onEdit={() => onEdit && onEdit(post)}
            onDelete={() => onDelete && onDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProfileInfo;
