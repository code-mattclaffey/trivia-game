import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";

import firebaseConfig from "./config";

const useFirebase = () => {
  const [app, setFirebaseInstance] = useState<{ apps: Array<any> }>();

  useEffect(() => {
    if (!app?.apps.length) {
      firebase.initializeApp(firebaseConfig);
      setFirebaseInstance(firebase);
    }
  }, [app]);

  return app;
};

export default useFirebase;
