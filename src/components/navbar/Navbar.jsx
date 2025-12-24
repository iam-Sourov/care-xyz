"use client";

import { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";
import { Menu, LogOut, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  const { user, loading, logOut } = useContext(AuthContext);
  const pathname = usePathname();
  
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/all-services" },
    { name: "About Us", href: "/about" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        
        {/* --- Logo --- */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-primary">
            Care.xyz
          </span>
        </Link>

        {/* --- Desktop Navigation --- */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.href) ? "text-primary" : "text-muted-foreground"
              }`}>
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {loading ? (
            <div className="flex items-center gap-3">
               <div className="hidden md:block h-9 w-20 bg-muted animate-pulse rounded-md" />
               <div className="h-8 w-8 bg-muted animate-pulse rounded-full" />
            </div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL} alt={user.displayName} />
                    <AvatarFallback className="bg-primary/10">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/my-bookings" className="cursor-pointer">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <span>My Bookings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logOut} className="text-red-600 cursor-pointer focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Care.xyz</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  ))}          
                  <Separator className="my-2" />
                  {loading ? (
                    <div className="flex flex-col gap-3">
                        <div className="h-10 w-full bg-muted animate-pulse rounded-md" />
                        <div className="h-10 w-full bg-muted animate-pulse rounded-md" />
                    </div>
                  ) : !user ? (
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href="/register">Register</Link>
                      </Button>
                    </div>
                  ) : (
                    <>
                       <Button variant="outline" asChild className="w-full justify-start">
                        <Link href="/my-bookings">
                             <CalendarDays className="mr-2 h-4 w-4" /> My Bookings
                        </Link>
                      </Button>
                      <Button variant="destructive" onClick={logOut} className="w-full mt-2">
                        Log out
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}