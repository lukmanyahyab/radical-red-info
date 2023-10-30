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
  ];

  return (
    <nav className="bg-white text-black p-2 mb-2 relative w-fit m-auto rounded-b-2xl">
      <ul className="flex gap-8 justify-center [&>*:hover]:bg-slate-200 [&>*]:py-1 [&>*]:px-2 [&>*]:transition [&>*]:duration-200 [&>*]:rounded [&>*]:font-semibold">
        {links.map((link, i) => (
          <li className={pathname == link.href ? "bg-slate-200" : ""} key={i}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
