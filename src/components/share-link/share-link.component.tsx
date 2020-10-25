import React, { useState } from "react";
import { I18nProps } from "../../locales/en";
import Button from "../button";

interface ShareLinkProps {
  url: string;
  i18n: {
    shareLinkTitle: I18nProps["shareLinkTitle"];
    shareLinkText: I18nProps["shareLinkText"];
    shareLinkCopiedText: I18nProps["shareLinkCopiedText"];
  };
}

const ShareLink: React.FC<ShareLinkProps> = ({ url, i18n }) => {
  const [linkCopied, setLinkCopied] = useState<boolean>(false);

  const onClick = () => {
    if (navigator?.share) {
      navigator
        .share({
          title: i18n.shareLinkTitle,
          url: url,
        })
        .then(() => {
          setLinkCopied(true);
        })
        .catch(console.error);
    } else {
      navigator.clipboard
        .writeText(`${window.location.origin}${url}`)
        .then(() => {
          setLinkCopied(true);
        });
    }
  };

  return (
    <>
      <Button onClick={onClick}>{i18n.shareLinkText}</Button>
      {linkCopied && <p>{i18n.shareLinkCopiedText}</p>}
    </>
  );
};

export default ShareLink;
