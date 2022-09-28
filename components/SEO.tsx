import { useRouter } from "next/router";
import Head from "next/head";

export const SEO: React.FC<{
  title?: string;
  description?: string;
  imageUrl?: string;
}> = ({
  title = "JS Garden - Thomas Cazade",
  description = "A blog about modern front-end web development where I share my knowledge. Front-end engineer with a passion for Vue.js, React and modern technologies.",
  imageUrl = "https://blog.totominc.io/og-image.png",
}) => {
  const router = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta content="@totominc" name="twitter:site" />
      <meta content="@totominc" name="twitter:creator" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={imageUrl} name="twitter:image" />

      <meta content={title} property="og:title" />
      <meta
        content={`https://blog.totominc.io${router.asPath}`}
        property="og:url"
      />
      <meta content={description} property="og:description" />
      <meta content={imageUrl} property="og:image" />

      <meta content="#262738" name="theme-color" />
    </Head>
  );
};
