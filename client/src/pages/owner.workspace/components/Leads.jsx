import { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Mail,
  Phone,
  Building2,
  Clock,
  CheckCircle2,
  CircleDot,
  MoreVertical,
  User,
  Plus,
  ArrowUpRight,
} from "lucide-react";

const demoLeads = [
  {
    id: 1,
    name: "Aman Sharma",
    email: "aman@example.com",
    phone: "+91 98765 43210",
    company: "Nova Tech",
    source: "Website Form",
    status: "New",
    assignedTo: "Not assigned",
    createdAt: "Today",
  },
  {
    id: 2,
    name: "Priya Mehta",
    email: "priya@example.com",
    phone: "+91 91234 56789",
    company: "Growth Labs",
    source: "Landing Page",
    status: "Contacted",
    assignedTo: "Sales Team",
    createdAt: "Yesterday",
  },
  {
    id: 3,
    name: "Rahul Verma",
    email: "rahul@example.com",
    phone: "+91 99887 76655",
    company: "Startup Hub",
    source: "Contact Form",
    status: "Proposal",
    assignedTo: "Manager",
    createdAt: "2 days ago",
  },
];

export default function Leads() {
  const [search, setSearch] = useState("");

  const filteredLeads = demoLeads.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase()) ||
    lead.email.toLowerCase().includes(search.toLowerCase()) ||
    lead.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen w-full bg-black text-white px-8 py-10">
      <div className="mx-auto w-full max-w-[1120px]">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl border border-neutral-800 bg-neutral-950 flex items-center justify-center">
              <Users size={21} />
            </div>

            <div>
              <h1 className="text-[30px] leading-none font-serif tracking-wide">
                Leads
              </h1>

              <p className="mt-2 text-sm text-neutral-500">
                Track all leads captured from your website forms and landing pages.
              </p>
            </div>
          </div>

          <button className="hidden lg:flex h-11 items-center gap-2 rounded-2xl bg-white px-5 text-sm font-medium text-black hover:bg-neutral-200 transition">
            <Plus size={17} />
            Add Lead
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-7">
          <LeadStat title="Total Leads" value="3" />
          <LeadStat title="New Leads" value="1" />
          <LeadStat title="Contacted" value="1" />
          <LeadStat title="Proposal" value="1" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-7">
          {/* Leads Table */}
          <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 overflow-hidden">
            {/* Top Bar */}
            <div className="border-b border-neutral-900 px-6 py-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-medium">All Leads</h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    Manage incoming leads from one place.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search leads..."
                      className="h-11 w-full md:w-[240px] rounded-2xl border border-neutral-800 bg-black pl-10 pr-4 text-sm text-white outline-none placeholder:text-neutral-700 focus:border-neutral-600"
                    />
                  </div>

                  <button className="h-11 w-11 rounded-2xl border border-neutral-800 bg-black flex items-center justify-center hover:bg-neutral-950 transition">
                    <Filter size={17} />
                  </button>
                </div>
              </div>
            </div>

            {/* Leads List */}
            <div className="p-5 space-y-4">
              {filteredLeads.map((lead) => (
                <LeadCard key={lead.id} lead={lead} />
              ))}

              {filteredLeads.length === 0 && (
                <div className="rounded-2xl border border-neutral-900 bg-black p-10 text-center">
                  <p className="text-sm text-neutral-500">No leads found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <aside className="space-y-7">
            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl border border-neutral-800 bg-black flex items-center justify-center">
                  <CircleDot size={18} />
                </div>

                <div>
                  <h3 className="text-base font-medium">Lead Pipeline</h3>
                  <p className="text-xs text-neutral-500">
                    Current lead stages
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <PipelineItem title="New" count="1" />
                <PipelineItem title="Contacted" count="1" />
                <PipelineItem title="Proposal" count="1" />
                <PipelineItem title="Won" count="0" />
                <PipelineItem title="Lost" count="0" />
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl border border-neutral-800 bg-black flex items-center justify-center">
                  <Clock size={18} />
                </div>

                <div>
                  <h3 className="text-base font-medium">Lead Sources</h3>
                  <p className="text-xs text-neutral-500">
                    Where leads come from
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <SourceItem title="Website Form" count="1" />
                <SourceItem title="Landing Page" count="1" />
                <SourceItem title="Contact Form" count="1" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function LeadStat({ title, value }) {
  return (
    <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-5">
      <p className="text-sm text-neutral-500">{title}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-xs text-neutral-600">Live workspace data</p>
    </div>
  );
}

function LeadCard({ lead }) {
  return (
    <div className="rounded-2xl border border-neutral-900 bg-black p-5 hover:bg-neutral-950 transition">
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="h-11 w-11 rounded-2xl border border-neutral-800 bg-neutral-950 flex items-center justify-center shrink-0">
            <User size={18} />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-medium text-white">{lead.name}</h3>
              <StatusBadge status={lead.status} />
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-neutral-500">
              <Info icon={<Mail size={14} />} text={lead.email} />
              <Info icon={<Phone size={14} />} text={lead.phone} />
              <Info icon={<Building2 size={14} />} text={lead.company} />
              <Info icon={<Clock size={14} />} text={lead.createdAt} />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <SmallTag text={lead.source} />
              <SmallTag text={`Assigned: ${lead.assignedTo}`} />
            </div>
          </div>
        </div>

        <button className="h-9 w-9 rounded-xl border border-neutral-900 flex items-center justify-center hover:bg-neutral-900 transition">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  );
}

function Info({ icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-neutral-600">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    New: "text-blue-400 border-blue-500/20 bg-blue-500/10",
    Contacted: "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
    Proposal: "text-purple-400 border-purple-500/20 bg-purple-500/10",
    Won: "text-green-400 border-green-500/20 bg-green-500/10",
    Lost: "text-red-400 border-red-500/20 bg-red-500/10",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wide ${
        styles[status] || "text-neutral-400 border-neutral-800 bg-neutral-900"
      }`}
    >
      {status}
    </span>
  );
}

function SmallTag({ text }) {
  return (
    <span className="rounded-full border border-neutral-900 bg-neutral-950 px-3 py-1 text-xs text-neutral-500">
      {text}
    </span>
  );
}

function PipelineItem({ title, count }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-neutral-900 bg-black px-4 py-3">
      <div className="flex items-center gap-3">
        <CheckCircle2 size={15} className="text-neutral-500" />
        <p className="text-sm text-neutral-400">{title}</p>
      </div>

      <span className="text-sm font-medium text-white">{count}</span>
    </div>
  );
}

function SourceItem({ title, count }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-neutral-900 bg-black px-4 py-3">
      <p className="text-sm text-neutral-400">{title}</p>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-white">{count}</span>
        <ArrowUpRight size={14} className="text-neutral-600" />
      </div>
    </div>
  );
}