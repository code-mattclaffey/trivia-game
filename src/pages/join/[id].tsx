import Layout from "../../layouts/main/main.layout";
import FirebaseWrapper from "../../containers/firebase-wrapper";
import { useRouter } from "next/router";
import JoinGame from "../../components/join-game";
import { i18n } from "../../locales";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const gameId: any = id;

  return (
    <FirebaseWrapper gameId={gameId}>
      <Layout title={i18n.pageTitles.join}>
        <JoinGame i18n={i18n} />
      </Layout>
    </FirebaseWrapper>
  );
};

export default IndexPage;
