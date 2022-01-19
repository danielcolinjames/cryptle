import cache from "../data/client-cache";
import Cryptle from "../components/Cryptle";

const CryptlePage = ({
  todaysCryptle,
  cryptleBank,
  color1,
  color2,
  isOldCryptle,
}) => {
  return (
    <Cryptle
      todaysCryptle={todaysCryptle}
      cryptleBank={cryptleBank}
      color1={color1}
      color2={color2}
      isOldCryptle={isOldCryptle}
    />
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { cryptleid } = params;

  const idNumber = parseInt(cryptleid);

  const recents = await cache.get("recent-cryptles");
  const todaysCryptle = recents.find((cryptle) => cryptle.number === idNumber);

  if (todaysCryptle === undefined) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  if (todaysCryptle.number === recents[0].number) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const cryptleBank = await cache.get("cryptle-bank");

  const { symbolMap } = cryptleBank;

  const { id: color1Id } = symbolMap.find(
    (symbol) =>
      symbol.symbol ===
      `${todaysCryptle?.cryptle[0]}${todaysCryptle?.cryptle[1]}${todaysCryptle?.cryptle[2]}`
  );
  const { id: color2Id } = symbolMap.find(
    (symbol) =>
      symbol.symbol ===
      `${todaysCryptle?.cryptle[3]}${todaysCryptle?.cryptle[4]}${todaysCryptle?.cryptle[5]}`
  );

  const color1 = await (
    await fetch(`https://ath.ooo/api/vibes?asset=${color1Id}`)
  ).json();
  const color2 = await (
    await fetch(`https://ath.ooo/api/vibes?asset=${color2Id}`)
  ).json();

  return {
    props: {
      recents,
      todaysCryptle,
      cryptleBank,
      color1,
      color2,
      isOldCryptle: true,
    },
    revalidate: 60 * 60 * 24 * 7,
  };
}

export default CryptlePage;
