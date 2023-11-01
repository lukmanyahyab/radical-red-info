import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[75%] m-auto text-center text-3xl [&>*]:mb-4">
      <p>
        For people that plays{" "}
        <Link
          href="https://www.pokecommunity.com/showthread.php?t=437688"
          target="_blank"
          className="text-red-500 hover:underline"
        >
          Radical Red 3.1
        </Link>{" "}
        with randomized abilities.
      </p>{" "}
      <p>
        Help you keep track what's your Mons regular and hidden abilities and some other useful
        pieces of information.
      </p>{" "}
      <p>
        Go here&nbsp;
        <Link href="/abilities" className="text-blue-500 hover:underline">
          Abilities
        </Link>
        .
      </p>
    </div>
  );
}
