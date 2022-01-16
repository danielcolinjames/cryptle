const { redis } = require("./redis");
const fetch = require("node-fetch");

// const get = async (key) => {
//   const value = await redis.get(key);
//   if (!value) return null;
//   return JSON.parse(value);
// };

const get = async (key) => {
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

const set = async (key, value) => {
  if (value) {
    await redis.set(key, JSON.stringify(value));
  } else {
    console.error("Error setting results");
  }
  return value;
};

module.exports = { get, set };
