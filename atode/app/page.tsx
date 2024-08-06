import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nextjs超初心者入門",
  description: "SSR,SSG,ISRでブログを作成する。",
  openGraph: {
    title: "Nextjs超初心者入門",
    description: "SSR, SSG, ISRブログを作成する。",
    url: "<サイトのurl>",
    siteName: "SSGブログ",
    images: [
      {
        width: "1200",
        height: "675",
        url: "<サイトのurl>/ogp-home.png",
      },
    ],
    locale: "jp",
    type: "website",
  },
};

const Home = () => {
  return <div className="text-[50px]">Nextjs超初心者入門</div>;
};

export default Home;
