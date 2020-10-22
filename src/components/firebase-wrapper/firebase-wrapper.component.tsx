import React from "react";
import { useFirebase } from "../../hooks/firebase";

const FirebaseWrapper: React.FC = ({ children }) => {
  const { data, loading, error } = useFirebase();

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;
  if (!data) return null;

  return (
    <>
      <p>{data.test}</p>
      {children}
    </>
  );
};

export default FirebaseWrapper;
