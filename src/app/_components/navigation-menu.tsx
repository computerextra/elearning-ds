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
import { LatestCourses } from "./courses";
import { LatestInfos } from "./infos";
import { ListItem } from "./list-item";

export default async function Navigation() {
  const session = await auth();
  await api.info.getLatest.prefetch();
  await api.course.getLatest.prefetch();

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
            <LatestCourses />
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
              {/* TODO: Links anpassen */}
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
              {/* TODO: Links anpassen */}
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <ListItem title="Benutzer" href="/user">
                  Benutzer Verwalten
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
