import React from "react";
import Layout from "../../components/Layout";
import FirebaseWrapper from "../../components/firebase-wrapper";
import { useRouter } from "next/router";
import HostPanel from "../../components/host";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const gameId: any = id;

  const onClick = (url: string) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Quiz time!",
          url: url,
        })
        .catch(console.error);
    } else {
      // fallback
    }
  };

  return (
    <FirebaseWrapper gameId={gameId}>
      <Layout title="Host">
        <h1>Host</h1>
        <button onClick={() => onClick(`/join/${id}`)}>
          Share link with friends
        </button>
        <HostPanel />
      </Layout>
    </FirebaseWrapper>
  );
};

export default IndexPage;
