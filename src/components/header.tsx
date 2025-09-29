"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/offers", label: "Offers" },
  { href: "/reviews", label: "Reviews" },
  { href: "/profile", label: "Profile" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2"
          onClick={() => setIsOpen(false)}
        >
          <Compass className="h-6 w-6 text-primary" />
          <span className="font-bold hidden sm:inline-block">
            Wanderlust Compass
          </span>
        </Link>
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4 pt-6">
                <Link
                  href="/"
                  className="mr-6 flex items-center space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Compass className="h-6 w-6 text-primary" />
                  <span className="font-bold">Wanderlust Compass</span>
                </Link>
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "transition-colors hover:text-primary p-2 rounded-md text-lg",
                        pathname === link.href
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
