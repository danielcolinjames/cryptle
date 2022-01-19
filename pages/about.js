import MetaTags from "../components/MetaTags";
import NavSection from "../components/NavSection";
import Link from "next/link";
import { useEffect, useState } from "react";
import Clipboard from "react-clipboard.js";

const NameOfCrypto = ({ name, bracketText }) => {
  return (
    <Link href={`/${name}`}>
      <a className="sm:col-span-3 text-md md:text-md font-sans font-semibold text-gray-400 inline-block sm:p-2 mt-5 sm:mt-0">
        {name}{" "}
        {bracketText && (
          <span className="text-gray-400 text-xs">({bracketText})</span>
        )}
      </a>
    </Link>
  );
};

const Address = ({ children }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  return (
    <div className="sm:col-span-9 flex items-center justify-start">
      <Clipboard
        data-clipboard-text={children}
        onClick={() => setCopied(true)}
        className="text-left text-xs font-sans font-semibold text-gray-200 hover:text-gray-400 break-all bg-gray-800 hover:bg-gray-700 transition-all duration-200 rounded-md w-full px-2 py-1.5"
      >
        {copied ? "Copied" : children}
      </Clipboard>
    </div>
  );
};

const About = () => {
  const pageTitle = `Cryptle - About`;

  const pageDescription = `Cryptle is a simple crypto ticker guessing game for crypto enthusiasts.`;
  const pageUrl = `https://cryptle.app/about`;
  const pageOgImageUrl = "https://cryptle.app/images/og.png";

  return (
    <div>
      <MetaTags
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageUrl={pageUrl}
        pageOgImageUrl={pageOgImageUrl}
      />
      <div className="flex flex-col items-center justify-between">
        <NavSection aboutPage />
      </div>
      <div className="max-w-2xl bg-black mx-auto mt-10 space-y-2 p-4 md:p-8">
        <p className="text-white text-center text-lg font-bold pb-4">
          About Cryptle
        </p>
        <p className="text-white text-left text-sm font-light">
          {
            "I made this for fun over a weekend. I don't really plan on putting a lot of effort into maintaining it, but I tried to build it in a way that it'll keep itself running as long as possible."
          }
        </p>
        <p className="text-white text-left text-sm font-light">
          {"It's obviously inspired by "}
          <a
            href="https://powerlanguage.co.uk/wordle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400"
          >
            Wordle
          </a>
          {", so definitely go play that if you haven't already."}
        </p>
        <p className="text-white text-left text-sm font-light">
          {"If you're curious how it works, "}
          <a
            href="https://github.com/danielcolinjames/cryptle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300"
          >
            {"here's"}
          </a>
          {" the code."}
        </p>
        <p className="text-white text-left text-sm font-light">
          If you like it, feel free to{" "}
          <a
            href="https://twitter.com/dcwj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            follow me{" "}
          </a>
          on Twitter!
        </p>
        <p className="text-white text-left text-sm font-light">
          Or if you <span className="italic">really</span> like it, feel free to
          send some crypto my way.
        </p>
        <div className="grid sm:grid-cols-12 gap-2 sm:rounded-lg sm:py-4">
          <NameOfCrypto name="ETH" bracketText="or ERC-20" />
          <Address>0x2D6e622339E35a51E00E5EEdb5CE1231316F81e2</Address>
          <NameOfCrypto name="HNT" />
          <Address>12yzdqwv6VyaqHGe737jsCidKQsJEHdiCPGTiyAcrCnCVwYcD8g</Address>
          <NameOfCrypto name="BTC" />
          <Address>bc1q9tdna9zajgty84xux35fxwkqxqpd9yk5x0gy60</Address>
          <NameOfCrypto name="DOGE" />
          <Address>DFBJCwpSeAZRn9zyWmr2EmdvxhNrxdyWBB</Address>
        </div>
        <p className="text-white text-left text-sm font-light">
          {"But you probably shouldn't."}
        </p>
        <p className="text-white text-left text-sm font-light">
          {"But I won't stop you."}
        </p>
      </div>
    </div>
  );
};

export default About;
