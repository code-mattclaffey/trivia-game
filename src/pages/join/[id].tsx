import Layout from "../../components/Layout";
import FirebaseWrapper from "../../containers/firebase-wrapper";
import { useRouter } from "next/router";
import JoinGame from "../../components/join-game";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const gameId: any = id;

  return (
    <FirebaseWrapper gameId={gameId}>
      <Layout title="Join game">
        <JoinGame />
      </Layout>
    </FirebaseWrapper>
  );
};

export default IndexPage;
