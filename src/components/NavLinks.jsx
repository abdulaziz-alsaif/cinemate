import { Bookmark, Check, Film, House, Sparkles, Tv } from "lucide-react";

import NavUser from "./NavUser";
import NavLink from "./NavLink";
import CollapsibleNavItem from "./CollapsibleNavItem";

const navLinks = [
  { href: "/", label: "Home", icon: <House /> },
  { href: "/watched", label: "Your Watched List", icon: <Check /> },
  { href: "/watchlist", label: "Your Watchlist", icon: <Bookmark /> },
  { href: "/recommendation", label: "AI recommendations", icon: <Sparkles /> },
  {
    label: "Movies",
    icon: <Film />,
    children: [
      { href: "/movies/popular", label: "Popular" },
      { href: "/movies/top-rated", label: "Top Rated" },
    ],
  },
  {
    label: "Tv Shows",
    icon: <Tv />,
    children: [
      { href: "/tv-shows/popular", label: "Popular" },
      { href: "/tv-shows/top-rated", label: "Top Rated" },
    ],
  },
];

function NavLinks() {
  return (
    <ul className="flex h-full flex-col gap-y-1 pb-4 pt-10">
      {navLinks.map((item) =>
        item.children ? (
          <CollapsibleNavItem {...item} key={item.label} />
        ) : (
          <NavLink {...item} key={item.label} />
        ),
      )}

      <li className="mt-auto">
        <NavUser />
      </li>
    </ul>
  );
}

export default NavLinks;
