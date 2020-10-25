import React from "react";

interface ShareLinkProps {
  url: string;
}

const ShareLink: React.FC<ShareLinkProps> = ({ url }) => {
  const onClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Quiz time!",
          url: url,
        })
        .catch(console.error);
    }
  };

  return (
    <>
      {navigator.share && (
        <button onClick={onClick}>Share link with friends</button>
      )}
    </>
  );
};

export default ShareLink;
