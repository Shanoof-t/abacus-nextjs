import React, { useState } from "react";
import NavButton from "./nav-button";
import { usePathname, useRouter } from "next/navigation";
import { useMedia } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
const routes = [
  { label: "Overview", href: "/" },
  { label: "Transactions", href: "/transactions" },
  { label: "Accounts", href: "/accounts" },
  { label: "Categories", href: "/categories" },
];
const Navigations = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMedia("(max-width:1024px)", false);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen} >
        <SheetTrigger>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 hover:bg-white/20 rounded hover:text-white border-none transition "
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2 bg-white">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
              <Button
                variant={pathname === route.href ? "secondary" : "ghost"}
                key={route.href}
                onClick={() => onClick(route.href)}
                className="w-full justify-start hover:bg-gray-100"
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <div className="hidden items-center lg:flex gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </div>
  );
};

export default Navigations;
