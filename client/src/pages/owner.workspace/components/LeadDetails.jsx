import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../../apis/Api";

import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MessageSquare,
  Building2,
  Clock,
  Globe,
  Flag,
  Calendar,
  StickyNote,
  Layers,
} from "lucide-react";

export default function LeadDetails() {
  const { id } = useParams();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["lead", id],
    queryFn: async () => {
      const res = await api.get(`/api/leads/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <section className="min-h-screen bg-black text-white px-8 py-10">
        <p className="text-neutral-500">Loading lead details...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-h-screen bg-black text-white px-8 py-10">
        <p className="text-red-400">
          {error?.response?.data?.message || "Failed to load lead"}
        </p>
      </section>
    );
  }

  const lead = data?.lead;
  const customFields = lead?.customFields || {};

  return (
    <section className="min-h-screen w-full bg-black text-white px-8 py-10">
      <div className="mx-auto w-full max-w-[1120px]">
        {/* Back */}
        <Link
          to="/workspace/leads"
          className="mb-7 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          Back to leads
        </Link>

        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-3xl border border-neutral-800 bg-neutral-950 flex items-center justify-center">
              <User size={22} />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-[32px] leading-none font-serif tracking-wide">
                  {lead?.name || "Unknown Lead"}
                </h1>

                <StatusBadge status={lead?.status} />
              </div>

              <p className="mt-2 text-sm text-neutral-500">
                Complete lead profile, contact details, message, notes and custom data.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <PriorityBadge priority={lead?.priority} />

            <button className="h-11 rounded-2xl bg-white px-5 text-sm font-medium text-black hover:bg-neutral-200 transition">
              Update Lead
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-7">
          {/* Left */}
          <div className="space-y-7">
            {/* Contact Info */}
            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-6">
              <SectionHeader
                icon={<User size={18} />}
                title="Lead Information"
                desc="Basic contact and source details"
              />

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard icon={<User size={16} />} label="Name" value={lead?.name} />
                <InfoCard icon={<Mail size={16} />} label="Email" value={lead?.email} />
                <InfoCard icon={<Phone size={16} />} label="Phone" value={lead?.phone} />
                <InfoCard icon={<Globe size={16} />} label="Source" value={lead?.source} />
                <InfoCard icon={<Flag size={16} />} label="Status" value={lead?.status} />
                <InfoCard icon={<Layers size={16} />} label="Priority" value={lead?.priority} />
              </div>
            </div>

            {/* Message */}
            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-6">
              <SectionHeader
                icon={<MessageSquare size={18} />}
                title="Message"
                desc="Message submitted by this lead"
              />

              <div className="mt-6 rounded-2xl border border-neutral-900 bg-black p-5">
                <p className="text-sm leading-7 text-neutral-400 whitespace-pre-line">
                  {lead?.message || "No message submitted."}
                </p>
              </div>
            </div>

            {/* Custom Fields */}
            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-6">
              <SectionHeader
                icon={<Building2 size={18} />}
                title="Custom Fields"
                desc="Extra data captured from forms"
              />

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(customFields).map(([key, value]) => (
                  <InfoCard
                    key={key}
                    icon={<Layers size={16} />}
                    label={formatLabel(key)}
                    value={String(value)}
                  />
                ))}

                {Object.entries(customFields).length === 0 && (
                  <div className="md:col-span-2 rounded-2xl border border-neutral-900 bg-black p-6 text-center">
                    <p className="text-sm text-neutral-500">
                      No custom fields available.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-6">
              <SectionHeader
                icon={<StickyNote size={18} />}
                title="Notes"
                desc="Internal notes for this lead"
              />

              <div className="mt-6 space-y-4">
                {lead?.notes?.map((note) => (
                  <div
                    key={note._id}
                    className="rounded-2xl border border-neutral-900 bg-black p-5"
                  >
                    <p className="text-sm leading-7 text-neutral-400">
                      {note.text}
                    </p>

                    <div className="mt-4 flex items-center justify-between text-xs text-neutral-600">
                      <span>
                        By {note.createdBy?.username || note.createdBy?.email || "Unknown"}
                      </span>
                      <span>{formatDateTime(note.createdAt)}</span>
                    </div>
                  </div>
                ))}

                {lead?.notes?.length === 0 && (
                  <div className="rounded-2xl border border-neutral-900 bg-black p-6 text-center">
                    <p className="text-sm text-neutral-500">No notes added yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-7">
            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-6">
              <SectionHeader
                icon={<Clock size={18} />}
                title="Timeline"
                desc="Lead creation and update info"
              />

              <div className="mt-6 space-y-3">
                <TimelineItem
                  title="Lead created"
                  date={formatDateTime(lead?.createdAt)}
                />

                <TimelineItem
                  title="Last updated"
                  date={formatDateTime(lead?.updatedAt)}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-6">
              <SectionHeader
                icon={<Calendar size={18} />}
                title="Quick Summary"
                desc="Important lead data"
              />

              <div className="mt-6 space-y-3">
                <SummaryRow label="Status" value={lead?.status || "new"} />
                <SummaryRow label="Priority" value={lead?.priority || "medium"} />
                <SummaryRow label="Source" value={lead?.source || "website"} />
                <SummaryRow label="Notes" value={lead?.notes?.length || 0} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ icon, title, desc }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-2xl border border-neutral-800 bg-black flex items-center justify-center">
        {icon}
      </div>

      <div>
        <h2 className="text-base font-medium">{title}</h2>
        <p className="text-xs text-neutral-500">{desc}</p>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-neutral-900 bg-black p-5">
      <div className="mb-3 flex items-center gap-2 text-neutral-600">
        {icon}
        <p className="text-xs uppercase tracking-wide">{label}</p>
      </div>

      <p className="text-sm text-neutral-300 break-words">
        {value || "Not available"}
      </p>
    </div>
  );
}

function TimelineItem({ title, date }) {
  return (
    <div className="rounded-2xl border border-neutral-900 bg-black p-4">
      <p className="text-sm text-neutral-300">{title}</p>
      <p className="mt-1 text-xs text-neutral-600">{date}</p>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-neutral-900 bg-black px-4 py-3">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="text-sm font-medium text-white capitalize">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const normalizedStatus = status?.toLowerCase();

  const styles = {
    new: "text-blue-400 border-blue-500/20 bg-blue-500/10",
    contacted: "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
    qualified: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
    proposal: "text-purple-400 border-purple-500/20 bg-purple-500/10",
    won: "text-green-400 border-green-500/20 bg-green-500/10",
    lost: "text-red-400 border-red-500/20 bg-red-500/10",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-wide ${
        styles[normalizedStatus] ||
        "text-neutral-400 border-neutral-800 bg-neutral-900"
      }`}
    >
      {normalizedStatus || "new"}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const normalizedPriority = priority?.toLowerCase();

  const styles = {
    low: "text-neutral-400 border-neutral-700 bg-neutral-900",
    medium: "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
    high: "text-red-400 border-red-500/20 bg-red-500/10",
  };

  return (
    <span
      className={`rounded-2xl border px-4 py-2 text-xs uppercase tracking-wide ${
        styles[normalizedPriority] ||
        "text-neutral-400 border-neutral-800 bg-neutral-900"
      }`}
    >
      {normalizedPriority || "medium"} priority
    </span>
  );
}

function formatDateTime(date) {
  if (!date) return "No date";

  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (str) => str.toUpperCase());
}