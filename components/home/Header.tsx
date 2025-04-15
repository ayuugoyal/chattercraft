"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import {
  UserButton,
  useUser
} from '@clerk/nextjs'
import { ModeToggle } from "@/components/mode-toggle";


export function Header() {
  const { isSignedIn } = useUser();

  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Demo",
      link: "#demo",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed w-full z-50">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4 z-40">
            <ModeToggle />
            {
              isSignedIn ?
                <UserButton /> :
                <>
                  <NavbarButton href="/sign-in" variant="secondary">Sign In</NavbarButton>
                  <NavbarButton variant="primary" href="sign-up">Sign Up</NavbarButton>
                </>
            }
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            {/* <NavbarLogo logoText="ChattercraftAI" /> */}
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <ModeToggle />
              {
                isSignedIn ?
                  null :
                  <>
                    <NavbarButton href="/sign-in"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full"
                      variant="secondary">Sign In</NavbarButton>
                    <NavbarButton
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full"
                      variant="primary" href="sign-up">Sign Up</NavbarButton>
                  </>
              }
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
