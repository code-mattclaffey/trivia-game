import Layout from "../../layouts/main/main.layout";
import FirebaseWrapper from "../../containers/firebase-wrapper";
import { useRouter } from "next/router";
import Quiz from "../../components/quiz";
import { i18n } from "../../locales";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const gameId: any = id;

  return (
    <FirebaseWrapper gameId={gameId}>
      <Layout title={i18n.pageTitles.quiz}>
        <Quiz />
      </Layout>
    </FirebaseWrapper>
  );
};

export default IndexPage;
