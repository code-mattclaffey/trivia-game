import React from "react";
import Layout from "../../components/Layout";
import FirebaseWrapper from "../../components/firebase-wrapper";
import { useRouter } from "next/router";
import Link from "next/link";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const gameId: any = id;

  return (
    <FirebaseWrapper gameId={gameId}>
      <Layout title="Host">
        <h1>Host</h1>
        <Link href={`/join/${id}`}>
          <a>Share link with friends</a>
        </Link>
      </Layout>
    </FirebaseWrapper>
  );
};

export default IndexPage;
