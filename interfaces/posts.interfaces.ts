import type { Author } from "./author.interfaces";

export type Post = {
  author: Author;
  slug: string;
  title: string;
  summary: string;
  date: string;
  coverImage: string;
  excerpt: string;
  content: string;
  ogImage: {
    url: string;
  };
};
