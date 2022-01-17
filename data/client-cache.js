export const get = async (key) => {
  const { result } = await fetch(
    `${process.env.READ_ONLY_REDIS_URL}/get/${key}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REDIS_BEARER_TOKEN}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return JSON.parse(result);
};

const cache = { get };
export default cache;
