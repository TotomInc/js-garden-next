import formatDate from "date-fns/format";
import parseDate from "date-fns/parse";

export const MarkdownArticleHeader: React.FC<{
  title: string;
  date: string;
}> = ({ title, date }) => {
  const formattedDate = formatDate(
    parseDate(date, "yyyy-dd-MM", new Date()),
    "MMMM d, yyyy"
  );

  return (
    <div className="mx-auto w-full max-w-[768px] px-6">
      <h1 className="font-assistant text-4xl font-black text-slate-50">
        {title}
      </h1>

      <p className="mt-2 font-assistant font-medium text-slate-400">
        By <b>Thomas Cazade</b>, published {formattedDate}
      </p>
    </div>
  );
};
