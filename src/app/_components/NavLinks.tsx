import Link from "next/link";

type NavLink = {
  name: string;
  href?: string;
  children?: {
    name: string;
    href: string;
  }[];
};

const Links: NavLink[] = [
  {
    name: "Impressum",
    href: "/Impressum",
  },
  {
    name: "Datenschutz",
    href: "/Datenschutz",
  },
];

export function NavLinks() {
  return (
    <ul className="menu menu-horizontal px-1">
      {Links.map((link, idx) => {
        if (link.children) {
          return (
            <li key={idx}>
              <details>
                <summary>{link.name}</summary>
                <ul className="p-2">
                  {link.children.map((child, idx_child) => (
                    <li key={idx_child}>
                      <Link prefetch={true} href={child.href}>
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          );
        }
        if (link.href) {
          return (
            <li key={idx}>
              <Link prefetch={true} href={link.href}>
                {link.name}
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
}

export function MobileNavLinks() {
  return (
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {Links.map((link, idx) => {
        if (link.children) {
          return (
            <li key={idx}>
              <a>{link.name}</a>
              <ul className="p-2">
                {link.children.map((child, idx_child) => (
                  <li key={idx_child}>
                    <Link prefetch={true} href={child.href}>
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        }
        if (link.href) {
          return (
            <li key={idx}>
              <Link prefetch={true} href={link.href}>
                {link.name}
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
}
