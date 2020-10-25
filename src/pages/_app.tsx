import React from "react";
import "../styles/global.css";
import { useFirebase } from "../containers/firebase-wrapper";

const App = ({ Component, pageProps }: any) => {
  useFirebase();

  return <Component {...pageProps} />;
};

export default App;
