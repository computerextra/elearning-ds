import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";
import React from "react";
import { LatestInfos } from "./infos";
import { ListItem } from "./list-item";

// TODO: Dynamic Course
// TODO: Links anpassen

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default async function Navigation() {
  const session = await auth();
  await api.info.getLatest.prefetch();

  return (
    <NavigationMenu className="mx-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Startseite
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Infos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <LatestInfos />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Kurse</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {session ? (
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {session.user.name ?? "Benutzer"}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {!session.user.name && (
                  <ListItem
                    title="Namen vergeben"
                    href="/user/edit"
                    className="bg-destructive text-white hover:bg-destructive hover:text-white focus:bg-destructive focus:text-white dark:text-primary hover:dark:text-primary focus:dark:text-primary"
                  >
                    <span className="text-white">
                      Du hast noch keinen Namen eingegeben.
                    </span>
                  </ListItem>
                )}
                <ListItem title="Profil" href="/user">
                  Mein Profil verwalten
                </ListItem>
                <ListItem title="Kurse" href="/user">
                  Meine Kurse
                </ListItem>
                <ListItem title="Zertifikate" href="/user">
                  Meine Zertifikate
                </ListItem>
                <ListItem
                  title="Abmelden"
                  href="/api/auth/signout"
                  className="hover:bg-destructive hover:text-white focus:bg-destructive focus:text-white hover:dark:text-primary focus:dark:text-primary"
                ></ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem>
            <Link href="/api/auth/signin" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Anmelden
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
        {session?.user.role === "Geschäftsführung" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Geschäftsführung</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <ListItem title="Profil" href="/user">
                  Mitarbeiter Auswertungen
                </ListItem>
                <ListItem title="Kurse" href="/user">
                  Zertifikate Auswertungen
                </ListItem>
                <ListItem title="Zertifikate" href="/user">
                  Benutzer Verwalten
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        {session?.user.role === "Admin" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <ListItem title="Profil" href="/user">
                  Infos Verwalten
                </ListItem>
                <ListItem title="Kurse" href="/user">
                  Kurse Verwalten
                </ListItem>
                <ListItem title="Zertifikate" href="/user">
                  Benutzer Verwalten
                </ListItem>
                <ListItem
                  title="Abmelden"
                  href="/api/auth/signout"
                  className="hover:bg-destructive hover:text-white focus:bg-destructive focus:text-white"
                >
                  Rollen Verwalten
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
