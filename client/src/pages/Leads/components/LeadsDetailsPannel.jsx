import {
  Building2,
  Calendar,
  Mail,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";

export default function LeadDetailsPanel({ lead, onUpdate }) {
  if (!lead) {
    return (
      <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-6">
        <p className="text-sm text-neutral-500">Select a lead to view details</p>
      </div>
    );
  }

  const leadCreatedAt = lead.createdAt

  return (
    <aside className="h-fit rounded-3xl border border-neutral-900 bg-neutral-950/40 p-5 xl:sticky xl:top-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-lg font-semibold uppercase text-black">
          {lead.name.charAt(0)}
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-white">
            {lead.name}
          </h2>
          <p className="mt-1 text-sm text-neutral-500">{lead.company}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        <div>
          <label className="mb-2 block text-xs font-medium text-neutral-500">
            Lead Status
          </label>

          <select
            value={lead.status}
            onChange={(e) => onUpdate(lead.id, { status: e.target.value })}
            className="h-11 w-full rounded-2xl border border-neutral-900 bg-black px-4 text-sm capitalize text-white outline-none focus:border-neutral-700"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-neutral-500">
            Priority
          </label>

          <select
            value={lead.priority}
            onChange={(e) => onUpdate(lead.id, { priority: e.target.value })}
            className="h-11 w-full rounded-2xl border border-neutral-900 bg-black px-4 text-sm capitalize text-white outline-none focus:border-neutral-700"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Details */}
      <div className="mt-6 space-y-3">
        <InfoRow icon={Mail} label="Email" value={lead.email} />
        <InfoRow icon={Phone} label="Phone" value={lead.phone} />
        <InfoRow icon={Building2} label="Company" value={lead.company} />
        <InfoRow icon={User} label="Assigned To" value={lead.assignedTo} />
        <InfoRow icon={Calendar} label="Created" value={leadCreatedAt} />
      </div>

      {/* Message */}
      <div className="mt-6 rounded-3xl border border-neutral-900 bg-black p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
          <MessageSquare size={16} />
          Lead Message
        </div>

        <p className="text-sm leading-6 text-neutral-500">{lead.message}</p>
      </div>

      {/* Notes UI Only */}
      <div className="mt-5">
        <label className="mb-2 block text-xs font-medium text-neutral-500">
          Add Note
        </label>

        <textarea
          placeholder="Write a note about this lead..."
          className="min-h-[110px] w-full resize-none rounded-2xl border border-neutral-900 bg-black p-4 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-neutral-700"
        />

        <button className="mt-3 h-11 w-full rounded-2xl bg-white text-sm font-medium text-black transition hover:bg-neutral-200">
          Save Note
        </button>
      </div>
    </aside>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-neutral-900 bg-black px-4 py-3">
      <Icon size={16} className="text-neutral-500" />

      <div className="min-w-0">
        <p className="text-xs text-neutral-600">{label}</p>
        <p className="truncate text-sm text-neutral-300">{value}</p>
      </div>
    </div>
  );
}