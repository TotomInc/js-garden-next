import { DefaultLayout } from "../../components/DefaultLayout";
import { SEO } from "../../components/SEO";

const PostsPage = () => {
  return (
    <>
      <SEO
        title="Blog - JS Garden - Thomas Cazade"
        description="Thoughts on modern web development and technologies. Detailed guides for Vue.js, React and about the JavaScript ecosystem."
      />

      <DefaultLayout>{null}</DefaultLayout>
    </>
  );
};

export default PostsPage;
