"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import ProfileInfo from "@/components/templates/ProfileInfo";
import { IPrompt } from "@/core/interfaces/prompt";

const UserPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [posts, setPost] = useState<IPrompt[]>([]);

  const handleDelete = (post: IPrompt) => {
    //
  };

  const handleEdit = (post: IPrompt) => {
    const query = { id: post._id ?? "" };
    const result = "?" + new URLSearchParams(query).toString();

    router.push(`/prompt-detail${result}`);
  };

  useEffect(() => {
    (async () => {
      if (!session) return;

      const postsRes = await fetch(`/api/users/${session?.user.id}/posts`, {
        method: "POST",
      });
      const data = await postsRes.json();
      console.log(data);

      setPost(data as IPrompt[]);
    })();
  }, [session]);

  return (
    <div>
      <ProfileInfo
        name="Test"
        desc="Wellcome to your personalized profile page."
        data={posts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UserPage;
