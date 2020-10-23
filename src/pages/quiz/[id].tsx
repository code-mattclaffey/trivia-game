import Layout from "../../components/Layout";
import FirebaseWrapper from "../../components/firebase-wrapper";
import { useRouter } from "next/router";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const gameId: any = id;

  return (
    <FirebaseWrapper gameId={gameId}>
      <Layout title="Quiz">
        <h1>Quiz</h1>
      </Layout>
    </FirebaseWrapper>
  );
};

export default IndexPage;
