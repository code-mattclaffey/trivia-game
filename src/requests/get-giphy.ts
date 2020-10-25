const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

export const getGifhy = async ({
  tag,
}: {
  tag: string;
}): Promise<{ data: { image_original_url: string } }> => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${tag}&rating=pg-13`
    );

    return await response.json();
  } catch (error) {
    console.error(error);

    return { data: { image_original_url: "" } };
  }
};
