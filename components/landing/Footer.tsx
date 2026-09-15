const links = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "For Businesses", href: "#businesses" },
  { label: "Pricing", href: "#pricing" },
];

export function Footer() {
  return <footer id="footer" className="section-shell py-10"><div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between"><div><a className="text-[17px] font-bold tracking-[0.24em]" href="#top">AVNEZ</a><p className="mt-3 text-sm text-[var(--secondary)]">AI teammates for businesses.</p></div><nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer navigation">{links.map((link) => <a className="text-xs text-[var(--secondary)] transition-colors hover:text-[var(--foreground)]" href={link.href} key={link.label}>{link.label}</a>)}</nav></div><div className="mt-8 border-t border-[var(--border)] pt-6 text-xs text-[var(--secondary)]">© 2026 Avnez. All rights reserved.</div></footer>;
}