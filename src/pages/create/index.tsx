import Layout from "../../components/Layout";
import FirebaseWrapper from "../../containers/firebase-wrapper";
import CreateGame from "../../components/create-game";
import { i18n } from "../../locales";

const IndexPage = () => (
  <FirebaseWrapper>
    <Layout title="Create">
      <CreateGame i18n={i18n} />
    </Layout>
  </FirebaseWrapper>
);

export default IndexPage;
