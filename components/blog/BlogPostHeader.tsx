import Link from "next/link";
import formatDate from "date-fns/format";
import parseDate from "date-fns/parse";
import useSwr from "swr";

import { fetcher } from "../../lib/fetcher";

export function BlogPostHeader({
  title,
  date,
  slug,
  summary,
  tags,
}: {
  title: string;
  summary: string;
  date: string;
  slug: string;
  tags: string[];
}) {
  const { data } = useSwr<{ total: number }>(`/api/views/${slug}`, fetcher);

  const views = data?.total;

  const formattedDate = formatDate(
    parseDate(date, "yyyy-MM-dd", new Date()),
    "MMMM d, yyyy"
  );

  return (
    <div className="mx-auto w-full max-w-[768px]">
      <p className="font-mono text-xs text-accent">
        {tags.map((tag) => (
          <span key={tag} className="mr-3">{`#${tag.toUpperCase()}`}</span>
        ))}
      </p>

      <Link
        href={`/blog/${slug}`}
        className="mt-1 font-sans text-3xl font-bold text-heading"
      >
        {title}
      </Link>

      <div className="mt-2 flex items-center justify-between">
        <p className="font-mono text-xs text-text-alt text-opacity-50">
          Published {formattedDate}
        </p>

        <p className="font-mono text-xs text-text-alt text-opacity-50">{`${
          views ? Number(views).toLocaleString() : "–––"
        } views`}</p>
      </div>

      <p className="mt-4 font-sans text-base font-normal text-text-alt">
        {summary}
      </p>
    </div>
  );
}
