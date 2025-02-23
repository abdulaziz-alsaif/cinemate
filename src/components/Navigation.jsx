import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

import NavLinks from "./NavLinks";

function Navigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="[&_svg]:size-5"
          aria-label="Open navigation"
        >
          <Menu />
        </Button>
      </SheetTrigger>

      <VisuallyHidden asChild>
        <SheetTitle></SheetTitle>
      </VisuallyHidden>

      <VisuallyHidden asChild>
        <SheetDescription></SheetDescription>
      </VisuallyHidden>

      <SheetContent side="left" className="w-72 p-2">
        <NavLinks />
      </SheetContent>
    </Sheet>
  );
}

export default Navigation;
