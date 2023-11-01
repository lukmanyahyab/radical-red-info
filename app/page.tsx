import Link from "next/link";

export default function Home() {
  return (
    <div className="m-auto text-center text-3xl">
      <p>
        For people that plays <span className="text-red-500">Radical Red 3.1</span> with randomized
        abilities.
      </p>{" "}
      <p>Help you to keep track what's your mons regular and hidden abilities.</p>{" "}
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
