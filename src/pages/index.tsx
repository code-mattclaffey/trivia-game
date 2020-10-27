import Layout from "../layouts/main/main.layout";
import Link from "next/link";
import { i18n } from "../locales";
import Button from "../components/button";

const IndexPage = () => (
  <Layout title={i18n.pageTitles.home}>
    <h1>🥳 Quiz Night 🥳</h1>
    <Link href="/create">
      <Button element="a" variant="alt">
        Start
      </Button>
    </Link>
  </Layout>
);

export default IndexPage;
