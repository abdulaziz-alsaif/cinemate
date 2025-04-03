"use client";

import { useState } from "react";

import { usePathname } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

import Login from "./Login";
import Navigation from "./Navigation";
import Search from "./Search";
import SignoutButton from "@/features/auth/components/SignoutButton";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // pathname is used here as key to Search and Navigation Components in order to reset all states in Search component when user navigate to new page
  const pathname = usePathname();

  const { isAuthenticated, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-zinc-50/60 pt-1 backdrop-blur">
      <div className="container">
        <nav className="relative flex h-14 items-center gap-2 sm:justify-between sm:gap-4">
          {/* this hides from screen readers the button when the search input is open in mobile view */}
          <div className={`sm:block ${!isOpen ? "block" : "hidden"}`}>
            <Navigation key={pathname} />
          </div>

          <Search isOpen={isOpen} setIsOpen={setIsOpen} key={pathname} />

          {/* this hides the button from screen readers when the search input is open in mobile view */}
          <div className={`sm:block ${!isOpen ? "block" : "hidden"}`}>
            {isLoading ? null : isAuthenticated ? <SignoutButton /> : <Login />}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
