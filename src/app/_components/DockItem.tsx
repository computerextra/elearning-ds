"use client";

import { cn } from "@/utils";
import { House, Info, LucideProps, School } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();

  const active = pathname === link.href;

  return (
    <button
      className={cn(active ? "dock-active" : "")}
      onClick={() => router.push(link.href)}
    >
      <link.icon />
      <span className="dock-label">{link.name}</span>
    </button>
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
