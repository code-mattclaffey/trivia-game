import Layout from "../../components/Layout";
import FirebaseWrapper from "../../containers/firebase-wrapper";
import CreateGame from "../../components/create-game";

const IndexPage = () => (
  <FirebaseWrapper>
    <Layout title="Create">
      <CreateGame />
    </Layout>
  </FirebaseWrapper>
);

export default IndexPage;
