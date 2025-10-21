"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BotMessageSquare, LayoutGrid, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Chat", icon: BotMessageSquare },
  { href: "/programs", label: "Programs", icon: LayoutGrid },
  { href: "/admin", label: "Admin", icon: UserCog },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center gap-2">
                <BotMessageSquare className="w-7 h-7 text-primary" />
                <h1 className="text-xl font-headline font-bold text-foreground">CampusPathBot</h1>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
