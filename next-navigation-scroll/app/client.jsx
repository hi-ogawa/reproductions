"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { startTransition } from "react";
import { useOptimistic } from "react";

export function NavLink({ href, children }) {
  const pathname = usePathname();
  const [isPending, setIsPending] = useOptimistic(false);

  return (
    <Link
      href={href}
      className={cls(href === pathname && "active", isPending && "pending")}
      prefetch={false}
      scroll={false}
      onNavigate={() => {
        startTransition(() => {
          setIsPending(true);
        });
      }}
    >
      {children}
    </Link>
  );
}

const cls = (...args) => args.filter(Boolean).join(" ");
