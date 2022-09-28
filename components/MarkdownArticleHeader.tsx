import formatDate from "date-fns/format";
import parseDate from "date-fns/parse";

export const MarkdownArticleHeader: React.FC<{
  title: string;
  summary: string;
  date: string;
}> = ({ title, date, summary }) => {
  const formattedDate = formatDate(
    parseDate(date, "yyyy-MM-dd", new Date()),
    "MMMM d, yyyy"
  );

  return (
    <div className="mx-auto w-full max-w-[768px]">
      <h1 className="font-assistant text-4xl font-black text-heading">
        {title}
      </h1>

      <p className="mt-4 font-sans text-lg font-medium text-text-alt">
        {summary}
      </p>

      <p className="mt-8 font-mono text-sm font-medium text-text-alt">
        By <b>Thomas Cazade</b>, published {formattedDate}
      </p>
    </div>
  );
};
