import { Markdown } from "./Markdown";

export const MarkdownArticle: React.FC<{ postContent: string }> = ({
  postContent,
}) => {
  return (
    <article className="prose prose-lg prose-invert mx-auto max-w-none py-8 prose-headings:font-sans prose-h1:text-3xl prose-h1:font-extrabold prose-h2:text-2xl prose-h2:font-bold prose-h3:text-xl prose-h3:font-bold prose-h4:text-xl prose-h4:font-bold prose-code:text-accent prose-pre:px-0 prose-pre:py-0">
      <Markdown content={postContent} />
    </article>
  );
};
