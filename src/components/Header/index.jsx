"use client";
import styles from "./header.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const currentPath = usePathname();

  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo}>
          Studio375
        </Link>
        <div className={styles.navigation}>
          <Link
            href="/studio"
            className={
              styles.navItem +
              (currentPath == "/studio" ? " " + styles.navActive : "")
            }
          >
            Studio
          </Link>
          <Link
            href="/works"
            className={
              styles.navItem +
              (currentPath == "/works" ? " " + styles.navActive : "")
            }
          >
            Works
          </Link>
        </div>
      </div>
    </div>
  );
}
