"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const links = [
    { href: "/", name: "Home" },
    { href: "/abilities", name: "Abilities" },
    { href: "/tmhm", name: "TM & HM" },
    { href: "/mega-stones", name: "Mega Stones" },
    { href: "/tutor", name: "Move Tutor" },
    { href: "/items", name: "Items" },
  ];

  return (
    <nav className="bg-white text-black p-2 mb-4 relative w-fit m-auto rounded-b-xl">
      <ul className="flex gap-6 justify-center">
        {links.map((link, i) => (
          <li key={i}>
            <Link
              href={link.href}
              className={`${
                pathname == link.href ? "bg-slate-600 text-white pointer-events-none" : ""
              } px-2 py-[1px] border-2 rounded-lg border-slate-600 hover:bg-slate-300 transition font-semibold`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
