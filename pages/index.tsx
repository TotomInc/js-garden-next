import type { NextPage, GetStaticProps } from "next";
import { useState, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import type { Post } from "../interfaces/posts.interfaces";
import { getAllPosts } from "../lib/api";
import { BlogLayout } from "../layouts/BlogLayout";
import { SEO } from "../components/SEO";
import { BlogPostHeader } from "../components/blog/BlogPostHeader";

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "summary",
    "tags",
  ]);

  return { props: { posts } };
};

const PostsPage: NextPage<{ posts: Post[] }> = ({ posts }) => {
  const featuredTags = ["#react", "#vue", "#typescript", "#electron"];

  const inputEl = useRef<HTMLInputElement | null>(null);

  const [searchValue, setSearchValue] = useState("");

  const filteredBlogPosts = posts.filter((post) => {
    if (searchValue.startsWith("#")) {
      const searchTagValue = searchValue.slice(1);

      if (inputEl.current) {
        inputEl.current.value = searchValue;
      }

      return post.tags
        .map((tag) => tag.toLowerCase())
        .includes(searchTagValue.toLowerCase());
    }

    return post.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <>
      <SEO
        title="Blog - JS Garden - Thomas Cazade"
        description="Thoughts on modern web development and technologies. Detailed guides for Vue.js, React and about the JavaScript ecosystem."
      />

      <BlogLayout>
        <h1 className="mb-4 font-assistant text-5xl font-black tracking-tight text-white">
          Blog
        </h1>

        <p className="mb-4 text-text-alt">
          I&apos;ve been writing online about modern front-end development
          especially about React, Vue, TypeScript and Electron. In total,
          I&apos;ve written {posts.length} articles. Use the search filter below
          to filter by title or tag (using the{" "}
          <span className="font-mono text-accent">#</span> prefix).
        </p>

        <div className="mb-2 flex space-x-2">
          {featuredTags.map((featuredTag) => (
            <button
              key={featuredTag}
              type="button"
              className="font-mono text-sm uppercase text-accent"
              onClick={() => setSearchValue(featuredTag)}
            >
              {featuredTag}
            </button>
          ))}
        </div>

        <div className="relative mb-8 w-full">
          <input
            ref={inputEl}
            aria-placeholder="Search articles"
            type="text"
            className="w-full rounded-md bg-code-background px-4 py-3 text-text ring-white ring-opacity-50 transition focus:outline-none focus:ring-2"
            placeholder="Search articles by title..."
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <MagnifyingGlassIcon className="absolute top-0 right-0 mr-4 mt-3 h-auto w-6 text-text" />
        </div>

        <h2 className="mb-8 font-assistant text-4xl font-extrabold tracking-tight text-white">
          All posts
        </h2>

        <div className="flex flex-col space-y-12">
          {filteredBlogPosts.length === 0 ? (
            <p className="text-text-alt">No posts found :(</p>
          ) : null}

          {filteredBlogPosts.map((post) => (
            <BlogPostHeader
              key={post.slug}
              title={post.title}
              summary={post.summary}
              slug={post.slug}
              date={post.date}
              tags={post.tags}
            />
          ))}
        </div>
      </BlogLayout>
    </>
  );
};

export default PostsPage;
