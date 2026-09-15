"use client";

import { useState } from "react";
import { Menu, X } from "./icons";

const links = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "For Businesses", href: "#businesses" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-[var(--border)]">
      <div className="section-shell flex h-[76px] items-center justify-between">
        <a
          className="text-[17px] font-bold tracking-[0.24em]"
          href="#top"
          aria-label="Avnez home"
        >
          AVNEZ
        </a>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <a
              className="text-[13px] text-[var(--secondary)] transition-colors hover:text-[var(--foreground)]"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            className="text-[13px] text-[var(--secondary)] transition-colors hover:text-[var(--foreground)]"
            href="/sign-in"
          >
            Sign in
          </a>

          <a
            className="button-primary min-h-10 px-4"
            href="/sign-up"
          >
            Get Started <span aria-hidden="true">-&gt;</span>
          </a>
        </div>

        <button
          className="rounded-md p-2 text-[var(--foreground)] lg:hidden"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isOpen && (
        <nav
          id="mobile-navigation"
          className="section-shell border-t border-[var(--border)] py-5 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <a
                className="text-sm text-[var(--secondary)]"
                href={link.href}
                key={link.label}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <a
              className="text-sm text-[var(--secondary)]"
              href="/sign-in"
              onClick={() => setIsOpen(false)}
            >
              Sign in
            </a>

            <a
              className="button-primary w-full"
              href="/sign-up"
              onClick={() => setIsOpen(false)}
            >
              Get Started <span aria-hidden="true">-&gt;</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}