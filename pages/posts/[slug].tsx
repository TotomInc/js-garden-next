import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import type { Post } from "../../interfaces/posts.interfaces";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import { Markdown } from "../../components/Markdown";

export const getStaticProps: GetStaticProps<
  { [key: string]: any },
  { slug: string }
> = async ({ params }) => {
  const post = getPostBySlug(params?.slug || "", [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);

  return { props: { post } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts(["slug"]);
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));

  return { paths, fallback: false };
};

const PostPage: NextPage<{ post: Post }> = ({ post }) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <article className="prose prose-invert px-6 py-6 prose-pre:px-0 prose-pre:py-0">
      <Markdown content={post.content} />
    </article>
  );
};

export default PostPage;
