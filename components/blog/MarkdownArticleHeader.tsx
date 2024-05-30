import formatDate from "date-fns/format";
import parseDate from "date-fns/parse";

export function MarkdownArticleHeader({
  title,
  date,
  summary,
  slug,
}: {
  title: string;
  summary: string;
  date: string;
  slug: string;
}) {
  const formattedDate = formatDate(
    parseDate(date, "yyyy-MM-dd", new Date()),
    "MMMM d, yyyy",
  );

  return (
    <div className="mx-auto w-full">
      <h1 className="font-sans text-3xl font-black tracking-tight text-white md:text-5xl">
        {title}
      </h1>

      <p className="mt-4 flex font-mono text-sm text-text-alt text-opacity-50">
        Thomas Cazade / {formattedDate}
      </p>

      <p className="mt-6 font-sans text-text-alt">{summary}</p>
    </div>
  );
}
