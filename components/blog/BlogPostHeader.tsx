import Link from "next/link";
import formatDate from "date-fns/format";
import parseDate from "date-fns/parse";

export const BlogPostHeader: React.FC<{
  title: string;
  summary: string;
  date: string;
  slug: string;
  tags: string[];
}> = ({ title, date, slug, summary, tags }) => {
  const formattedDate = formatDate(
    parseDate(date, "yyyy-MM-dd", new Date()),
    "MMMM d, yyyy"
  );

  return (
    <div className="mx-auto w-full max-w-[768px]">
      <p className="font-mono text-sm font-medium text-accent">
        {tags.map((tag) => (
          <span key={tag} className="mr-2">{`#${tag.toUpperCase()}`}</span>
        ))}
      </p>

      <Link href={`/blog/${slug}`}>
        <a className="mt-1 font-assistant text-3xl font-black text-heading">
          {title}
        </a>
      </Link>

      <p className="mt-4 font-mono text-sm font-medium text-text-alt">
        By <b>Thomas Cazade</b>, published {formattedDate}
      </p>

      <p className="mt-4 font-sans text-lg font-medium text-text-alt">
        {summary}
      </p>
    </div>
  );
};
