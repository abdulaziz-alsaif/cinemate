import { usePathname } from "next/navigation";

import { ChevronDown } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import NavLink from "./NavLink";

type CollapsibleNavItem = {
  children: {
    href: string;
    label: string;
    icon?: JSX.Element
  }[];
  label: string;
  icon: JSX.Element;
};

function CollapsibleNavItem({ label, icon, children }: CollapsibleNavItem) {
  const pathname = usePathname();
  const isActive = children.some((child) => child.href === pathname);

  return (
    <li>
      <Collapsible>
        <CollapsibleTrigger
          className={`group flex h-8 w-full items-center justify-between rounded-md p-2 text-sm transition-all hover:bg-zinc-100 hover:text-zinc-900 ${
            isActive
              ? "bg-zinc-100 text-zinc-900"
              : "bg-transparent text-zinc-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="[&_svg]:size-4">{icon}</span>
            <span>{label}</span>
          </div>
          <ChevronDown className="size-4 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <ul className="mx-3.5 mt-1 flex flex-col gap-1 border-l border-zinc-200 px-2.5 py-0.5">
            {children.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
              />
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}

export default CollapsibleNavItem;
