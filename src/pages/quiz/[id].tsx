import Layout from "../../components/Layout";
import FirebaseWrapper from "../../components/firebase-wrapper";
import { useRouter } from "next/router";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <FirebaseWrapper gameId={id}>
      <Layout title="Host">
        <h1>Host</h1>
      </Layout>
    </FirebaseWrapper>
  );
};

export default IndexPage;
