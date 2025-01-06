import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  href: string;
  isActive: boolean;
};

function NavButton({ label, href, isActive }: Props) {
  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      className={cn(
        "w-full lg:w-auto border-none font-normal hover:bg-white/20 transition text-white focus:bg-white/30 border rounded hover:text-white",
        isActive ? "bg-white/10" : "bg-transparent"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}

export default NavButton;
