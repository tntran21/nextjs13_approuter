"use client";

import { useEffect, useState } from "react";
import PromptCard from "@/components/organisms/PromptCard";
import PromptCardList from "@/components/organisms/PromptCardList";
import { IPrompt } from "@/core/interfaces/prompt";

const PromptFeed = () => {
  const [searchText, setSearchText] = useState();
  const [posts, setPost] = useState<IPrompt[]>([]);

  const handleSearch = async () => {
    // TODO: Implement search
  };

  useEffect(() => {
    (async () => {
      const postsRes = await fetch("/api/prompt", { method: "POST" });
      const data = await postsRes.json();
      console.log(data);

      setPost(data as IPrompt[]);
    })();
  }, []);

  return (
    <div className="feed">
      <form action="handleSearch" className="w-full">
        <input
          className="search_input peer"
          type="text"
          placeholder="Search for a tag or a username..."
          required
          value={searchText}
          onChange={handleSearch}
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </div>
  );
};

export default PromptFeed;
