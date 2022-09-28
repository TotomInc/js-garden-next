import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import type { Post } from "../../interfaces/posts.interfaces";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import { DefaultLayout } from "../../components/DefaultLayout";
import { SEO } from "../../components/SEO";
import { MarkdownArticleHeader } from "../../components/MarkdownArticleHeader";
import { MarkdownArticle } from "../../components/MarkdownArticle";

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

const PostPage: NextPage<{ post: Post }> = ({ post }) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <SEO title={`${post.title} - JS Garden`} description={post.summary} />

      <DefaultLayout>
        <MarkdownArticleHeader
          title={post.title}
          summary={post.summary}
          date={post.date}
        />

        <MarkdownArticle postContent={post.content} />
      </DefaultLayout>
    </>
  );
};

export default PostPage;