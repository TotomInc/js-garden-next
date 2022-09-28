import type { NextPage, GetStaticProps } from "next";

import type { Post } from "../interfaces/posts.interfaces";
import { getAllPosts } from "../lib/api";
import { DefaultLayout } from "../components/DefaultLayout";
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
  return (
    <>
      <SEO
        title="Blog - JS Garden - Thomas Cazade"
        description="Thoughts on modern web development and technologies. Detailed guides for Vue.js, React and about the JavaScript ecosystem."
      />

      <DefaultLayout>
        <h1 className="mx-auto mb-8 max-w-3xl font-assistant text-4xl font-black text-heading">
          Blog
        </h1>

        <div className="flex flex-col space-y-8">
          {posts.map((post) => (
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
      </DefaultLayout>
    </>
  );
};

export default PostsPage;
