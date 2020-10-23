import Layout from "../../components/Layout";
import FirebaseWrapper from "../../components/firebase-wrapper";
import { useRouter } from "next/router";
import Quiz from "../../components/quiz";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const gameId: any = id;

  return (
    <FirebaseWrapper gameId={gameId}>
      <Layout title="Quiz">
        <Quiz />
      </Layout>
    </FirebaseWrapper>
  );
};

export default IndexPage;
