import Layout from "../components/Layout";
import Link from "next/link";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <Link href="/create">
      <a>Play</a>
    </Link>
  </Layout>
);

export default IndexPage;
