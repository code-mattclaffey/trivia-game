import React from "react";
import { I18nProps } from "../../locales/en";
import Button from "../button";

interface ShareLinkProps {
  url: string;
  i18n: {
    shareLinkTitle: I18nProps["shareLinkTitle"];
    shareLinkText: I18nProps["shareLinkText"];
  };
}

const ShareLink: React.FC<ShareLinkProps> = ({ url, i18n }) => {
  const onClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: i18n.shareLinkTitle,
          url: url,
        })
        .catch(console.error);
    }
  };

  return (
    <>
      {navigator.share && (
        <Button onClick={onClick}>{i18n.shareLinkText}</Button>
      )}
    </>
  );
};

export default ShareLink;
