import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="my-8">
        <h1 className="text-3xl font-bold text-center text-teal-400">
          Welcome to KakoiAnime
        </h1>
      </div>
      {/* <ul className="flex w-full p-4">
          <li className="list-none text-sm text-teal-400 px-5">Home</li>
          <li className="list-none text-sm text-teal-400 px-5">TV Series</li>
          <li className="list-none text-sm text-teal-400 px-5">Most Popular</li>
          <li className="list-none text-sm text-teal-400 px-5">Top Airing</li>
          <li className="list-none text-sm text-teal-400 px-5">Movies</li>
        </ul> */}
      <div className=" flex justify-center items-center">
        <Link href={"/home"} className="text-slate-300 text-3xl bg-zinc-900 rounded-xl p-4 mx-auto border-white">
          Go to Home
        </Link>
      </div>
      <div className="m-4 text-slate-300 max-w-3xl mx-auto">
        <h1 className="font-semibold text-lg text-white m-3">
          WATCH ANIME ONLINE
        </h1>
        <p className="text-sm text-slate-400 m-3">
          Kakoianime is a free streaming anime website that allows you to watch
          anime online in English subbed and dubbed. Join us and watch anime
          online for free with ease. Easy access and no registration is
          required. Our content is updated daily with fast streaming servers and
          great features that help you easily track and watch your favorite
          anime. We are confident Kakoianime is the best free anime streaming
          site in the space that you can't simply miss!
        </p>
        <p className="text-center text-md m-4">
          Please help us by sharing this site with your friends. Thanks!
        </p>
      </div>
    </>
  );
}
