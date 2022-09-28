import type { NextPage } from "next";

import { DefaultLayout } from "../components/DefaultLayout";
import { SEO } from "../components/SEO";

const Home: NextPage = () => (
  <>
    <SEO />
    <DefaultLayout>{null}</DefaultLayout>
  </>
);

export default Home;
