const cache = require("./cache");
//1. Import coingecko-api
const CoinGecko = require("coingecko-api");

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

const buildListOfPairs = (listOfIds) => {
  const fullList = [];
  listOfIds.map(({ symbol: a }) => {
    listOfIds.map(({ symbol: b }) => {
      if (a !== b) {
        const output = `${a.toUpperCase()}${b.toUpperCase()}`;
        fullList.push(output);
      }
    });
  });
  return fullList;
};

const getCryptoTickerList = async () => {
  const { data: list } = await CoinGeckoClient.coins.markets({ per_page: 100 });

  const filteredTickers = list.filter(({ symbol }) => {
    if (symbol.length === 3) {
      return true;
    }
  });
  const filteredNamesObjects = list.filter(({ name }) => {
    if (name.length === 6) return true;
  });
  const filteredNames = filteredNamesObjects.map(({ name }) =>
    name.toUpperCase()
  );

  const listOfPairs = buildListOfPairs(filteredTickers);
  const fullList = [...filteredNames, ...listOfPairs];

  return fullList;
};

const updateBank = async () => {
  const cryptleBank = {};

  try {
    const bank = await getCryptoTickerList();
    cryptleBank.bankSize = bank.length;
    cryptleBank.bank = bank;
    cryptleBank.updated = Date.now();
  } catch (e) {
    console.error(e);
    return null;
  }
  await cache.set("cryptle-bank", cryptleBank);
  return process.exit(0);
};

updateBank();
