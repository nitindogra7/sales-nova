const statusStyles = {
  new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  contacted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  qualified: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  proposal: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  won: "bg-green-500/10 text-green-400 border-green-500/20",
  lost: "bg-red-500/10 text-red-400 border-red-500/20",
};

const priorityStyles = {
  high: "bg-red-500/10 text-red-400",
  medium: "bg-yellow-500/10 text-yellow-400",
  low: "bg-green-500/10 text-green-400",
};

export default function RecentLeads({ leads }) {
  return (
    <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Recent Leads</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Latest leads captured in your workspace
          </p>
        </div>

        <span className="rounded-full border border-neutral-900 bg-black px-3 py-1 text-xs text-neutral-500">
          Read only
        </span>
      </div>

      <div className="space-y-3">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="rounded-3xl border border-neutral-900 bg-black p-4 transition hover:border-neutral-800 hover:bg-neutral-950/70"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">
                    {lead.name}
                  </h3>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize ${
                      statusStyles[lead.status]
                    }`}
                  >
                    {lead.status}
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${
                      priorityStyles[lead.priority]
                    }`}
                  >
                    {lead.priority}
                  </span>
                </div>

                <p className="mt-2 text-sm text-neutral-500">
                  {lead.company} · {lead.source}
                </p>
              </div>

              <p className="text-xs text-neutral-600">{lead.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}