import { Brain, Flame, MessageCircle } from "./icons";

const features = [
  {
    icon: MessageCircle,
    title: "Handles the conversations",
    copy: "Replies to customer enquiries while you focus on properties, inspections, and closing actual deals.",
  },
  {
    icon: Brain,
    title: "Keeps the important details",
    copy: "Remembers what customers are looking for — location, property type, budget, and when they're ready to move.",
  },
  {
    icon: Flame,
    title: "Finds the serious ones",
    copy: "Not every 'How much?' is a buyer. Avnez helps you spot the people who are actually ready to take the next step.",
  },
];

export function TeammateSection() {
  return (
    <section
      id="product"
      className="section-shell py-24 lg:py-32"
    >
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <span className="eyebrow">Quietly working for you</span>

          <h2 className="section-heading">
            Meet the teammate who never says, “I&apos;ll get back to you.”
          </h2>

          <p className="section-copy">
            Avnez works quietly in the background, handling customer
            conversations, keeping track of what matters, and bringing the
            serious opportunities to your attention.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, copy }) => (
            <article key={title}>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--primary)]">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-6 text-base font-semibold leading-6">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[var(--secondary)]">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}