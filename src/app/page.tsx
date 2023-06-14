import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href={"/home"} className="text-slate-300 text-3xl">Go to Home</Link>
    </>
  );
}
