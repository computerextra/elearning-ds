"use client";

import { cn } from "@/utils";
import { House, Info, type LucideProps, School } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export type DockLink = {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

const MainLinks: DockLink[] = [
  {
    name: "Home",
    href: "/",
    icon: House,
  },
  {
    name: "Infos",
    href: "/info",
    icon: Info,
  },
  {
    name: "Kurse",
    href: "/course",
    icon: School,
  },
];

function DockItem(link: DockLink) {
  const pathname = usePathname();

  const active = pathname === link.href;

  return (
    <Link
      className={cn(active ? "dock-active" : "")}
      prefetch={true}
      href={link.href}
    >
      <link.icon />
      <span className="dock-label">{link.name}</span>
    </Link>
  );
}

export function Dock() {
  return (
    <div className="dock">
      {MainLinks.map((link, idx) => (
        <DockItem key={idx} {...link} />
      ))}
    </div>
  );
}
