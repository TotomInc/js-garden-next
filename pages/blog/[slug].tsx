import type { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import type { Post } from "../../interfaces/posts.interfaces";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import { BlogLayout } from "../../layouts/BlogLayout";
import { SEO } from "../../components/SEO";
import { MarkdownArticleHeader } from "../../components/blog/MarkdownArticleHeader";
import { MarkdownArticle } from "../../components/blog/MarkdownArticle";

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
    "summary",
    "tags",
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

export function PostPage({ post }: { post: Post }) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <SEO title={`${post.title} - JS Garden`} description={post.summary} />

      <BlogLayout>
        <MarkdownArticleHeader
          title={post.title}
          summary={post.summary}
          date={post.date}
          slug={post.slug}
        />

        <MarkdownArticle postContent={post.content} />
      </BlogLayout>
    </>
  );
}

export default PostPage;
