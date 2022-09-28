import useSwr from "swr";

import { fetcher } from "../lib/fetcher";
import { DefaultLayout } from "../components/DefaultLayout";
import { SEO } from "../components/SEO";

const PostsPage = () => {
  const { data } = useSwr("/api/spotify/top-tracks", fetcher);

  console.log(data);

  return (
    <>
      <SEO
        title="Spotify - JS Garden - Thomas Cazade"
        description="See what I'm currently listening to and view more stats about my top tracks, artists and albums."
      />

      <DefaultLayout>{null}</DefaultLayout>
    </>
  );
};

export default PostsPage;
