const cache = require("./cache");

const pickRandomCryptle = async () => {
  console.log("generating new cryptle");

  const cryptleBank = await cache.get("cryptle-bank");

  console.log(cryptleBank);

  const randomNumber = Math.floor(Math.random() * cryptleBank.bankSize);

  const newCryptle = cryptleBank.bank[randomNumber];

  console.log("today's cryptle is: ", newCryptle);
  return newCryptle;
};

const hasMatchInRecentCryptles = async (newCryptle) => {
  const recentCryptles = await cache.get("recent-cryptles");
  console.log("recentCryptles");
  console.log(recentCryptles);
  console.log(newCryptle);

  if (!recentCryptles) return false;
  const found = recentCryptles.find(
    (cryptle) => cryptle.cryptle === newCryptle.cryptle
  );

  console.log("found match:", !!found);
  return !found;
};

const updateListOfRecentCryptles = async (newCryptle) => {
  let recentCryptles = await cache.get("recent-cryptles");
  if (!recentCryptles) recentCryptles = [];
  recentCryptles.push(newCryptle);
  await cache.set("recent-cryptles", recentCryptles);
};

const generateDailyCryptle = async () => {
  const todaysCryptle = {};

  try {
    let newCryptle = "";

    do {
      newCryptle = await pickRandomCryptle();
    } while (!(await hasMatchInRecentCryptles(newCryptle)));

    todaysCryptle.cryptle = newCryptle;
    todaysCryptle.date = Date.now();
  } catch (e) {
    console.error(e);
    return null;
  }
  await cache.set("daily-cryptle", todaysCryptle);
  await updateListOfRecentCryptles(todaysCryptle);
  return process.exit(0);
};

generateDailyCryptle();
