import React from "react";
import Layout from "../../components/Layout";
import FirebaseWrapper from "../../components/firebase-wrapper";
import { useRouter } from "next/router";
import HostPanel from "../../components/host";
import { i18n } from "../../locales";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const gameId: any = id;

  return (
    <FirebaseWrapper gameId={gameId}>
      <Layout title="Host">
        <h1>Host</h1>
        <HostPanel i18n={i18n} />
      </Layout>
    </FirebaseWrapper>
  );
};

export default IndexPage;
