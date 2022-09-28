import type { NextPage, GetStaticProps } from "next";

import type { Post } from "../interfaces/posts.interfaces";
import { getAllPosts } from "../lib/api";
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

  return <SEO />;
};

export default Home;
