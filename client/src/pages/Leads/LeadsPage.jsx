import { useMemo, useState } from "react";
import LeadStats from "./components/LeadsStats.jsx";
import LeadToolbar from "./components/LeadToolBar.jsx";
import LeadCard from "./components/LeadCard.jsx";

const initialLeads = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@company.com",
    phone: "+91 98765 43210",
    company: "TechNova Labs",
    source: "Website Form",
    status: "new",
    priority: "high",
    message:
      "Interested in CRM setup for a small sales team. Wants a demo this week.",
    createdAt: "Today, 10:30 AM",
    assignedTo: "Nitin",
  },
  {
    id: 2,
    name: "Ananya Verma",
    email: "ananya@brandhub.in",
    phone: "+91 91234 56789",
    company: "BrandHub",
    source: "LinkedIn",
    status: "contacted",
    priority: "medium",
    message:
      "Asked about API integration for collecting leads from landing pages.",
    createdAt: "Yesterday, 6:15 PM",
    assignedTo: "Nitin",
  },
  {
    id: 3,
    name: "Karan Mehta",
    email: "karan@startupx.io",
    phone: "+91 99887 77665",
    company: "StartupX",
    source: "Cold DM",
    status: "qualified",
    priority: "high",
    message: "Needs lead tracking dashboard and sales pipeline management.",
    createdAt: "Jun 8, 2026",
    assignedTo: "Nitin",
  },
  {
    id: 4,
    name: "Priya Singh",
    email: "priya@digitalflow.com",
    phone: "+91 90000 11122",
    company: "Digital Flow",
    source: "Referral",
    status: "proposal",
    priority: "low",
    message:
      "Looking for simple CRM with lead notes, status updates and team access.",
    createdAt: "Jun 7, 2026",
    assignedTo: "Nitin",
  },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const updateLead = (leadId, updates) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, ...updates } : lead
      )
    );
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.company.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  return (
    <section className="min-h-screen bg-black px-4 py-5 text-white sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-[1350px] space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-neutral-900 bg-neutral-950/40 p-5 sm:p-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm text-neutral-500">Workspace / Leads</p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Leads Management
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
              Track leads, update status, set priority and manage your sales
              pipeline.
            </p>
          </div>

          <button className="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-5 text-sm font-medium text-black transition hover:bg-neutral-200">
            Add Lead
          </button>
        </div>

        <LeadStats leads={leads} />

        <LeadToolbar
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Full Width Leads */}
        <div className="w-full rounded-3xl border border-neutral-900 bg-neutral-950/30 p-3 sm:p-4">
          <div className="mb-4 flex items-center justify-between px-1">
            <div>
              <h2 className="text-sm font-medium text-white">All Leads</h2>
              <p className="mt-1 text-xs text-neutral-500">
                {filteredLeads.length} leads found
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onUpdate={updateLead}
              />
            ))}

            {filteredLeads.length === 0 && (
              <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-neutral-800">
                <p className="text-sm text-neutral-500">No leads found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}