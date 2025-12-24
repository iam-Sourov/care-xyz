"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";
import {
  Menu,
  LogOut,
  CalendarDays,
  Home,
  Briefcase,
  Info,
  HeartHandshake,
} from "lucide-react";
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

export default function Navbar() {
  const { user, loading, logOut } = useContext(AuthContext);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/all-services", icon: Briefcase },
    { name: "About Us", href: "/about", icon: Info },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
            <HeartHandshake className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Care<span className="text-primary">.xyz</span>
          </span>
        </Link>
        <div className="hidden md:flex gap-1 items-center bg-secondary/30 p-1 rounded-full px-4 border border-secondary">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 ${isActive(link.href)
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                }`}>
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="h-9 w-24 bg-muted animate-pulse rounded-md" />
              <div className="h-9 w-9 bg-muted animate-pulse rounded-full" />
            </div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-gray-200 hover:bg-gray-100">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL} alt={user.displayName} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {user.displayName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/my-bookings" className="cursor-pointer w-full flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <span>My Bookings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logOut} className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild className="text-muted-foreground hover:text-primary">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="rounded-full px-6">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
                <Menu className="h-6 w-6 text-gray-700" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 sm:w-80 flex flex-col p-0">
              <SheetHeader className="p-6 text-left border-b bg-gray-50/50">
                <SheetTitle className="flex items-center gap-2 text-xl">
                  <HeartHandshake className="w-5 h-5 text-primary" /> Care.xyz
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {user ? (
                  <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                      <AvatarImage src={user.photoURL} />
                      <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-semibold truncate">{user.displayName}</span>
                      <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                    </div>
                  </div>
                ) : null}
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 pl-2">Menu</p>
                  {navLinks.map((link) => (
                    <Button
                      key={link.name}
                      variant={isActive(link.href) ? "secondary" : "ghost"}
                      className={`justify-start h-12 text-base ${isActive(link.href) ? "font-semibold text-primary" : "text-gray-600"}`}
                      asChild
                      onClick={() => setIsOpen(false)}>
                      <Link href={link.href}>
                        <link.icon className="mr-3 h-5 w-5" />
                        {link.name}
                      </Link>
                    </Button>
                  ))}
                  {user && (
                    <Button
                      variant={isActive("/my-bookings") ? "secondary" : "ghost"}
                      className={`justify-start h-12 text-base ${isActive("/my-bookings") ? "font-semibold text-primary" : "text-gray-600"}`}
                      asChild
                      onClick={() => setIsOpen(false)}>
                      <Link href="/my-bookings">
                        <CalendarDays className="mr-3 h-5 w-5" />
                        My Bookings
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
              <div className="p-6 border-t mt-auto bg-gray-50/50">
                {loading ? (
                  <div className="h-10 w-full bg-muted animate-pulse rounded-md" />
                ) : user ? (
                  <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={() => {
                      logOut();
                      setIsOpen(false);
                    }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild onClick={() => setIsOpen(false)}>
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}