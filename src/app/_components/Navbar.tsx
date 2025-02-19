import { auth } from "@/server/auth";
import Link from "next/link";
import { MobileNavLinks, NavLinks } from "./NavLinks";
import ThemeSwitcher from "./ThemeSwitcher";

export default async function Navbar() {
  const session = await auth();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="drawer lg:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="drawer-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <MobileNavLinks />
          </div>
        </div>

        <Link href="/" className="btn btn-ghost text-xl">
          Datenschurz
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <NavLinks />
      </div>
      <div className="navbar-end">
        {/* THEMES */}
        <ThemeSwitcher />
        {/* PROFILE */}
        {session ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={1}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link href="/api/auth/signout">Abmelden</Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/api/auth/signin" className="btn btn-ghost">
            Anmelden
          </Link>
        )}
      </div>
    </div>
  );
}
