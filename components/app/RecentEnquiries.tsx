import {
  ArrowRight,
  Clock,
  Flame,
  MessageCircle,
} from "@/components/landing/icons";

type Enquiry = {
  id: string;
  customerName: string;
  message: string;
  property?: string;
  location?: string;
  budget?: string;
  timeAgo: string;
  status: "New" | "Serious" | "Follow up";
};

type RecentEnquiriesProps = {
  enquiries?: Enquiry[];
};

const demoEnquiries: Enquiry[] = [
  {
    id: "1",
    customerName: "No enquiries yet",
    message:
      "Your customer conversations will appear here once Avnez starts handling them.",
    timeAgo: "Waiting",
    status: "New",
  },
];

const statusIcons = {
  New: MessageCircle,
  Serious: Flame,
  "Follow up": Clock,
};

export function RecentEnquiries({
  enquiries = demoEnquiries,
}: RecentEnquiriesProps) {
  return (
    <section
      className="overflow-hidden rounded-[26px] border border-white/[0.07] bg-white/[0.02]"
      aria-label="Recent enquiries"
    >
      {/* Section header */}
      <div className="flex flex-col gap-5 border-b border-white/[0.07] px-5 py-6 sm:px-7 sm:py-7 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-300/70">
            Customer activity
          </p>

          <h2 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-white sm:text-[22px]">
            Recent enquiries
          </h2>

          <p className="mt-2 max-w-lg text-sm leading-6 text-white/35">
            Keep an eye on the conversations happening with
            your customers.
          </p>
        </div>

        <button
          className="group flex w-fit items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-2.5 text-xs font-medium text-white/35 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white/70 disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          disabled
        >
          View all

          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Enquiries */}
      <div className="divide-y divide-white/[0.06]">
        {enquiries.map((enquiry) => {
          const StatusIcon = statusIcons[enquiry.status];

          const isEmpty =
            enquiry.customerName === "No enquiries yet";

          const isSerious = enquiry.status === "Serious";

          return (
            <article
              key={enquiry.id}
              className={`group relative px-5 py-6 transition-colors duration-200 sm:px-7 ${
                isEmpty
                  ? "hover:bg-white/[0.015]"
                  : "hover:bg-white/[0.025]"
              }`}
            >
              {/* Serious lead accent */}
              {isSerious && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-5 left-0 top-5 w-[2px] rounded-full bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.6)]"
                />
              )}

              <div className="flex gap-4">
                {/* Avatar */}
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                    isEmpty
                      ? "border-white/[0.07] bg-white/[0.035] text-white/25"
                      : isSerious
                        ? "border-orange-400/15 bg-orange-400/[0.08] text-orange-300"
                        : "border-purple-400/10 bg-purple-400/[0.07] text-purple-300"
                  }`}
                >
                  {isEmpty ? (
                    <MessageCircle className="h-[18px] w-[18px]" />
                  ) : (
                    <span className="text-sm font-semibold">
                      {enquiry.customerName
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  {/* Name + time */}
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <h3
                        className={`truncate text-sm font-semibold ${
                          isEmpty
                            ? "text-white/45"
                            : "text-white/85"
                        }`}
                      >
                        {enquiry.customerName}
                      </h3>

                      {enquiry.property && (
                        <span className="mt-1 block text-xs text-white/30">
                          {enquiry.property}
                        </span>
                      )}
                    </div>

                    <span className="shrink-0 text-[10px] text-white/25">
                      {enquiry.timeAgo}
                    </span>
                  </div>

                  {/* Message */}
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-white/40">
                    {enquiry.message}
                  </p>

                  {/* Lead details */}
                  {(enquiry.location || enquiry.budget) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {enquiry.location && (
                        <span className="rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-1.5 text-[10px] text-white/40">
                          {enquiry.location}
                        </span>
                      )}

                      {enquiry.budget && (
                        <span className="rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-1.5 text-[10px] text-white/40">
                          {enquiry.budget}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Status */}
                  <div className="mt-4 flex items-center">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${
                        isSerious
                          ? "border-orange-400/15 bg-orange-400/[0.07] text-orange-300"
                          : "border-white/[0.06] bg-white/[0.025] text-white/35"
                      }`}
                    >
                      <StatusIcon className="h-3 w-3" />

                      <span className="text-[9px] font-semibold uppercase tracking-[0.1em]">
                        {enquiry.status}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty state footer */}
      {enquiries.length === 1 &&
        enquiries[0]?.customerName === "No enquiries yet" && (
          <div className="border-t border-white/[0.06] bg-white/[0.012] px-5 py-4 sm:px-7">
            <p className="text-center text-[10px] text-white/20">
              Conversations will appear here automatically.
            </p>
          </div>
        )}
    </section>
  );
}