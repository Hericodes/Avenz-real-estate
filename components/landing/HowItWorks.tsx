import { ArrowRight, Brain, MessageCircle, Flame } from "./icons";

const steps = [
  { number: "01", icon: MessageCircle, title: "Customer messages", copy: "Someone reaches out with a question, request or property need." },
  { number: "02", icon: Brain, title: "Avnez figures it out", copy: "It understands what they're looking for and asks the right questions." },
  { number: "03", icon: Flame, title: "You focus on the lead", copy: "When someone looks serious, Avnez puts them on your radar." },
];

export function HowItWorks() {
  return <section id="how-it-works" className="border-y border-[var(--border)] bg-[#0e1117] py-24"><div className="section-shell"><div className="max-w-[520px]"><span className="eyebrow">A simpler workflow</span><h2 className="section-heading">From enquiry to opportunity.</h2></div><div className="mt-14 grid gap-8 lg:grid-cols-3">{steps.map(({ number, icon: Icon, title, copy }, index) => <div className="relative" key={number}><div className="flex items-center justify-between"><span className="text-sm font-semibold text-[var(--primary)]">{number}</span>{index < steps.length - 1 && <ArrowRight className="hidden h-4 w-4 text-[var(--border)] lg:block" />}</div><div className="mt-8 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--primary)]"><Icon className="h-5 w-5" /></div><h3 className="mt-6 text-lg font-semibold">{title}</h3><p className="mt-3 max-w-[280px] text-sm leading-6 text-[var(--secondary)]">{copy}</p></div>)}</div></div></section>;
}