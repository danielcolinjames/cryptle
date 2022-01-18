const cache = require("./cache");
//1. Import coingecko-api
const CoinGecko = require("coingecko-api");

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

const buildListOfPairs = (listOfIds) => {
  const fullList = [];
  listOfIds.map((asset) => {
    const { symbol: a } = asset;
    listOfIds.map((innerAsset) => {
      const { symbol: b } = innerAsset;
      if (a !== b) {
        const output = `${a.toUpperCase()}${b.toUpperCase()}`;
        fullList.push(output);
      }
    });
  });
  return fullList;
};

const getThreeLetterTickers = (listOfAssets) => {
  const tickersList = [];
  const matchingIdList = [];
  listOfAssets.map((asset) => {
    const { symbol: ticker } = asset;
    tickersList.push(ticker.toUpperCase());
    matchingIdList.push({ id: asset.id, symbol: ticker.toUpperCase() });
  });
  return { tickersList, matchingIdList };
};

const generateValidGuessList = async () => {
  const { data: list } = await CoinGeckoClient.coins.markets({ per_page: 100 });

  const filteredTickers = list.filter(({ symbol }) => {
    if (symbol.length === 3) {
      return true;
    }
  });

  const { tickersList: validTickers, matchingIdList: symbolMap } =
    getThreeLetterTickers(filteredTickers);

  return { validTickers, symbolMap };
};

const getCryptoTickerList = async () => {
  const { data: list } = await CoinGeckoClient.coins.markets({ per_page: 100 });

  const filteredTickers = list.filter(({ symbol }) => {
    if (symbol.length === 3) {
      return true;
    }
  });

  const listOfPairs = buildListOfPairs(filteredTickers);

  return listOfPairs;
};

const updateBank = async () => {
  console.log("updating bank");
  const cryptleBank = {};

  try {
    const bank = await getCryptoTickerList();
    const { validTickers: validGuesses, symbolMap } =
      await generateValidGuessList();
    cryptleBank.bankSize = bank.length;
    cryptleBank.symbolMap = symbolMap;
    cryptleBank.bank = bank;
    cryptleBank.updated = Date.now();
    cryptleBank.validGuesses = validGuesses;
  } catch (e) {
    console.error(e);
    return null;
  }
  await cache.set("cryptle-bank", cryptleBank);
  return process.exit(0);
};

updateBank();
