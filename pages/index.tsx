import type { NextPage, GetStaticProps } from "next";

import type { Post } from "../interfaces/posts.interfaces";
import { getAllPosts } from "../lib/api";
import { DefaultLayout } from "../components/DefaultLayout";
import { SEO } from "../components/SEO";

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return { props: { posts: allPosts } };
};

const Home: NextPage<{ posts: Post[] }> = ({ posts }) => {
  console.log("[index] posts:", posts);

  return (
    <>
      <SEO />
      <DefaultLayout>{null}</DefaultLayout>
    </>
  );
};

export default Home;
