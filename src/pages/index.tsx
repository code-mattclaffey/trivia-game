import Layout from "../layouts/main/main.layout";
import Link from "next/link";
import { i18n } from "../locales";

const IndexPage = () => (
  <Layout title={i18n.pageTitles.home}>
    <h1>👋 Quiz Night</h1>
    <Link href="/create">
      <a>Create a game</a>
    </Link>
  </Layout>
);

export default IndexPage;
