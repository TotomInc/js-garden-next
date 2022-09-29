import { useEffect } from "react";
import useSWR from "swr";

import { fetcher } from "../lib/fetcher";

export const ViewCounter: React.FC<{ slug: string }> = ({ slug }) => {
  const { data } = useSWR<{ total: number }>(`/api/views/${slug}`, fetcher);

  const views = Number(data?.total);

  useEffect(() => {
    const registerView = () => fetch(`/api/views/${slug}`, { method: "POST" });

    registerView();
  }, [slug]);

  return (
    <span className="font-mono text-sm text-text-alt text-opacity-50">{`${
      views > 0 ? views.toLocaleString() : "–––"
    } views`}</span>
  );
};
