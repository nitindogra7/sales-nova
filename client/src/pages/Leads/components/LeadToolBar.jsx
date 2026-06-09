import { Search, SlidersHorizontal } from "lucide-react";

export default function LeadToolbar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-neutral-900 bg-neutral-950/40 p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-md">
        <Search
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or company..."
          className="h-11 w-full rounded-2xl border border-neutral-900 bg-black pl-11 pr-4 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-neutral-700"
        />
      </div>

      <div className="flex gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-11 rounded-2xl border border-neutral-900 bg-black px-4 text-sm text-neutral-300 outline-none focus:border-neutral-700"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="proposal">Proposal</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>

        <button className="flex h-11 items-center gap-2 rounded-2xl border border-neutral-900 bg-black px-4 text-sm text-neutral-400 transition hover:bg-neutral-950 hover:text-white">
          <SlidersHorizontal size={16} />
          Filter
        </button>
      </div>
    </div>
  );
}