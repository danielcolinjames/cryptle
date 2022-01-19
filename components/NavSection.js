import Link from "next/link";
import Image from "next/image";

const NavSection = ({
  todaysCryptle,
  setInstructionsHidden,
  formattedDate,
  aboutPage,
  isOldCryptle,
}) => {
  return (
    <>
      <div className="relative max-w-md w-full">
        {!aboutPage && (
          <div
            className="text-white font-bold text-xs rounded-full bg-gray-900 w-7 h-7 absolute top-4 right-20 flex items-center justify-center cursor-pointer"
            onClick={() => setInstructionsHidden(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}
        <Link href="/about">
          <a className="text-white font-bold text-xs rounded-full bg-gray-900 border-gray-700 border border-solid w-7 h-7 absolute top-4 right-10 flex items-center justify-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
        </Link>
        {!aboutPage ? (
          <>
            <Link href={`/${todaysCryptle.number - 1}`}>
              <a className="text-white font-bold text-xs rounded-full bg-gray-900 border-gray-700 border border-solid w-7 h-7 absolute top-4 left-10 flex items-center justify-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                  />
                </svg>
              </a>
            </Link>
            {isOldCryptle && (
              <Link href={`/${todaysCryptle.number + 1}`}>
                <a className="text-white font-bold text-xs rounded-full bg-gray-900 border-gray-700 border border-solid w-7 h-7 absolute top-4 left-20 flex items-center justify-center cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </Link>
            )}
          </>
        ) : (
          <Link href={"/"}>
            <a className="text-white font-bold text-xs rounded-full bg-gray-900 border-gray-700 border border-solid w-7 h-7 absolute top-4 left-10 flex items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </a>
          </Link>
        )}
      </div>
      <div className="pt-3 md:pt-4">
        <Link href="/">
          <a className="text-white font-bold font-sans text-center flex items-center justify-center">
            <Image
              width={15}
              height={15}
              src="/images/cryptle-logo.png"
              alt=""
            />
            <span className="ml-2 text-md font-sans">Cryptle</span>
          </a>
        </Link>
        <span className="flex flex-row items-center justify-center">
          <span className="font-bold text-xs text-gray-500">
            {!aboutPage ? `#${todaysCryptle.number} — ${formattedDate}` : ""}
          </span>
        </span>
      </div>
    </>
  );
};

export default NavSection;
