import { Building2, Mail, Phone, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export default function LeadCard({ lead, onUpdate}) {
  const navigate = useNavigate();

  const goToDetail = () => navigate(`${lead._id}`); // relative -> .../leads/:id

  return (
    <div
      onClick={goToDetail}
      className="w-full cursor-pointer rounded-3xl border border-neutral-900 bg-black p-4 transition hover:border-neutral-800 hover:bg-neutral-950/70 sm:p-5"
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        {/* Left */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-white sm:text-lg">
              {lead.name}
            </h3>
            <span
              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize ${statusStyles[lead.status]}`}
            >
              {lead.status}
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${priorityStyles[lead.priority]}`}
            >
              {lead.priority}
            </span>
          </div>

          <p className="mt-2 text-sm text-neutral-500">{lead.company}</p>

          <p className="mt-4 line-clamp-2 max-w-3xl text-sm leading-6 text-neutral-400">
            {lead.message}
          </p>

          <div className="mt-5 grid gap-3 text-xs text-neutral-500 sm:grid-cols-3">
            <span className="flex items-center gap-2 truncate">
              <Mail size={14} />
              {lead.email}
            </span>
            <span className="flex items-center gap-2 truncate">
              <Phone size={14} />
              {lead.phone}
            </span>
            <span className="flex items-center gap-2 truncate">
              <Building2 size={14} />
              {lead.source}
            </span>
          </div>
        </div>

        {/* Right - stop propagation so selects don't trigger navigation */}
        <div
          className="grid gap-3 sm:grid-cols-3 xl:w-[430px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-neutral-600">
              Status
            </label>
            <select
              value={lead.status}
              onChange={(e) => onUpdate(lead._id, { status: e.target.value })}
              className="h-10 w-full rounded-xl border border-neutral-900 bg-neutral-950 px-3 text-xs capitalize text-white outline-none focus:border-neutral-700"
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
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-neutral-600">
              Priority
            </label>
            <select
              value={lead.priority}
              onChange={(e) => onUpdate(lead._id, { priority: e.target.value })}
              className="h-10 w-full rounded-xl border border-neutral-900 bg-neutral-950 px-3 text-xs capitalize text-white outline-none focus:border-neutral-700"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-neutral-600">
              Created
            </label>
            <div className="flex h-10 items-center rounded-xl border border-neutral-900 bg-neutral-950 px-3 text-xs text-neutral-400">
              {new Date(lead.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div
        className="mt-4 flex items-center justify-end gap-2 border-t border-neutral-900 pt-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={goToDetail}
          className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 px-3 py-2 text-xs text-neutral-300 transition hover:bg-neutral-900"
        >
          <Eye size={13} /> View Details
        </button>
      </div>
    </div>
  );
}