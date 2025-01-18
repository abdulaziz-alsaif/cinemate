"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, label, icon }) {
  const pathname = usePathname();

  return (
    <li key={href}>
      <Link
        href={href}
        className={`flex h-8 items-center gap-2 rounded-md p-2 text-sm transition-all hover:bg-zinc-100 hover:text-zinc-900 ${pathname === href ? "bg-zinc-100 text-zinc-900" : "bg-transparent text-zinc-700"}`}
      >
        {icon && <span className="[&_svg]:size-4">{icon}</span>}
        <span>{label}</span>
      </Link>
    </li>
  );
}

export default NavLink;
