import { Markdown } from "./Markdown";

export const MarkdownArticle: React.FC<{ postContent: string }> = ({
  postContent,
}) => {
  return (
    <article className="prose prose-lg prose-invert mx-auto max-w-[75ch] px-6 py-6 prose-headings:font-assistant prose-h1:text-3xl prose-h1:font-black prose-h2:text-2xl prose-code:text-accent prose-pre:px-0 prose-pre:py-0">
      <Markdown content={postContent} />
    </article>
  );
};
