import PromptFeed from "@/components/organisms/PromptFeed";

export default function HomePage() {
  return (
    <section className="flex-1 flex flex-col text-center">
      <h1 className="green_gradient head_text font-bold mt-2">Discover & Share AI Prompts</h1>

      <PromptFeed />
    </section>
  );
}
