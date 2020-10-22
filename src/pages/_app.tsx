import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../components/firebase-wrapper/config";

const App = ({ Component, pageProps }: any) => {
  const [app, setFirebaseInstance] = useState<{ apps: Array<any> }>();

  useEffect(() => {
    if (!app?.apps.length) {
      firebase.initializeApp(firebaseConfig);
      setFirebaseInstance(firebase);
    }
  }, [app]);

  return <Component {...pageProps} />;
};

export default App;
