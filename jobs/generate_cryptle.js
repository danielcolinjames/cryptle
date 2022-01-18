const cache = require("./cache");

const pickRandomCryptle = async () => {
  console.log("generating new cryptle");

  const cryptleBank = await cache.get("cryptle-bank");

  const randomNumber = Math.floor(Math.random() * cryptleBank.bankSize);

  const newCryptle = cryptleBank.bank[randomNumber];

  console.log("today's cryptle is: ", newCryptle);
  return newCryptle;
};

const getCurrentCryptleNumber = async () => {
  const recentCryptles = await cache.get("recent-cryptles");
  if (!recentCryptles) return 1;

  return recentCryptles[0].number + 1;
};

const isUniqueCryptle = async (newCryptle) => {
  const recentCryptles = await cache.get("recent-cryptles");

  if (!recentCryptles) {
    console.log("no recents found");
    return true;
  }

  const found = recentCryptles.find(
    (cryptle) => cryptle.cryptle === newCryptle.cryptle
  );
  console.log("is unique:", found === undefined);

  return found === undefined;
};

const updateListOfRecentCryptles = async (newCryptle) => {
  let recentCryptles = await cache.get("recent-cryptles");
  if (!recentCryptles) recentCryptles = [];
  recentCryptles.unshift(newCryptle);
  await cache.set("recent-cryptles", recentCryptles);
};

const generateDailyCryptle = async () => {
  const todaysCryptle = {};

  try {
    let newCryptle = "";

    const number = await getCurrentCryptleNumber();

    newCryptle = await pickRandomCryptle();
    let isUnique = await isUniqueCryptle(newCryptle);

    while (!isUnique) {
      newCryptle = await pickRandomCryptle();
      isUnique = await isUniqueCryptle(newCryptle);
    }

    todaysCryptle.cryptle = newCryptle;
    todaysCryptle.date = Date.now();
    todaysCryptle.number = number;
  } catch (e) {
    console.error(e);
    return null;
  }
  await cache.set("daily-cryptle", todaysCryptle);
  await updateListOfRecentCryptles(todaysCryptle);
  return process.exit(0);
};

generateDailyCryptle();
