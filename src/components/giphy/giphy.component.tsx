import React, { useEffect, useState } from "react";
import { I18nProps } from "../../locales/en";
import { getGifhy } from "../../requests/get-giphy";

interface GiphyProps {
  isWinner?: boolean;
  i18n: {
    winnerText: I18nProps["winnerText"];
    loserText: I18nProps["loserText"];
  };
}

const Giphy: React.FC<GiphyProps> = ({ isWinner, i18n }) => {
  const [giphyUrl, setGiphyUrl] = useState<string>();

  const getGif = async () => {
    const tag = isWinner ? "winner" : "loser";
    const { data } = await getGifhy({ tag });

    setGiphyUrl(data.image_original_url);
  };

  useEffect(() => {
    getGif();
  }, [isWinner]);

  if (giphyUrl) {
    const winnerText = isWinner ? i18n.winnerText : i18n.loserText;

    return <img src={giphyUrl} alt={winnerText} />;
  }

  return null;
};

export default Giphy;
