import { Clock, MessageCircle, Filter } from "./icons";

const problems = [
  { icon: MessageCircle, title: 'Too many "hello" messages', copy: "Some conversations go nowhere. Some become serious deals. Avnez helps tell the difference." },
  { icon: Filter, title: "Everyone says they're interested", copy: "Until it's time to actually do something. Avnez helps you spot who's genuinely ready." },
  { icon: Clock, title: "Good leads get forgotten", copy: "Because humans have meetings, calls, lunch... and sometimes 37 unread WhatsApp messages." },
];

export function ProblemSection() {
  return <section id="businesses" className="border-y border-[var(--border)] bg-[#0e1117] py-24"><div className="section-shell"><div className="max-w-[520px]"><span className="eyebrow">The daily challenge</span><h2 className="section-heading">Your inbox is busy. Your team shouldn&apos;t have to be.</h2><p className="section-copy">Some enquiries are serious. Some are just &apos;How much?&apos; and disappear forever.</p></div><div className="mt-12 grid gap-4 md:grid-cols-3">{problems.map(({ icon: Icon, title, copy }) => <article className="surface-card p-6" key={title}><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1c222c] text-[var(--secondary)]"><Icon className="h-5 w-5" /></div><h3 className="mt-7 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[var(--secondary)]">{copy}</p></article>)}</div></div></section>;
}