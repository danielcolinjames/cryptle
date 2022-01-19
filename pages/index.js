import cache from "../data/client-cache";
import Cryptle from "../components/Cryptle";

const Home = ({ todaysCryptle, cryptleBank, color1, color2 }) => {
  return (
    <Cryptle
      todaysCryptle={todaysCryptle}
      cryptleBank={cryptleBank}
      color1={color1}
      color2={color2}
    />
  );
};

export async function getStaticProps({ params }) {
  const recents = await cache.get("recent-cryptles");
  const todaysCryptle = await cache.get("daily-cryptle");
  const cryptleBank = await cache.get("cryptle-bank");

  const { symbolMap } = cryptleBank;

  const { id: color1Id } = symbolMap.find(
    (symbol) =>
      symbol.symbol ===
      `${todaysCryptle.cryptle[0]}${todaysCryptle.cryptle[1]}${todaysCryptle.cryptle[2]}`
  );
  const { id: color2Id } = symbolMap.find(
    (symbol) =>
      symbol.symbol ===
      `${todaysCryptle.cryptle[3]}${todaysCryptle.cryptle[4]}${todaysCryptle.cryptle[5]}`
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
    },
    revalidate: 60,
  };
}

export default Home;
