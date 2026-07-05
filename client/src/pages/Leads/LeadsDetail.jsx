import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Calendar,
  Tag,
  Flag,
  Copy,
  Trash2,
} from "lucide-react";
import api from "../../apis/Api.js";

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

export default function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [copied, setCopied] = useState("");

  const { data: lead, isLoading, isError, error } = useQuery({
    queryKey: ["get-lead", id],
    queryFn: async () => {
      const res = await api.get(`/api/leads/${id}`);
      return res.data.lead; // unwrap { success, message, lead }
    },
  });

  const updateLeadMutation = useMutation({
    mutationFn: async (values) => {
      const res = await api.patch(`/api/leads/${id}`, values);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-lead", id] });
      queryClient.invalidateQueries({ queryKey: ["get-leads"] });
    },
  });

  const deleteLeadMutation = useMutation({
    mutationFn: async () => {
      const res = await api.delete(`/api/leads/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-leads"] });
      navigate("/workspace/leads"); // back to leads list, relative
    },
  });

  const copyToClipboard = (value, label) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  };

  const handleDeleteClick = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 2500);
      return;
    }
    deleteLeadMutation.mutate();
  };

  if (isLoading) {
    return (
      <section className="min-h-screen bg-black px-4 py-5 text-white sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[900px] items-center justify-center">
          <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 px-8 py-6 text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-white"></div>
            <p className="text-sm text-neutral-400">Loading lead...</p>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !lead) {
    return (
      <section className="min-h-screen bg-black px-4 py-5 text-white sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[900px] items-center justify-center">
          <div className="max-w-md rounded-3xl border border-red-900/50 bg-red-950/20 px-8 py-6 text-center">
            <h2 className="text-lg font-semibold text-red-400">
              Failed to load lead
            </h2>
            <p className="mt-2 text-sm text-red-300/80">
              {error?.response?.data?.message ||
                error?.message ||
                "Lead not found"}
            </p>
            <button
              onClick={() => navigate("../")}
              className="mt-5 inline-flex h-10 items-center justify-center rounded-xl border border-neutral-800 px-4 text-sm text-white hover:bg-neutral-900"
            >
              Back to Leads
            </button>
          </div>
        </div>
      </section>
    );
  }

  const hasEmail = Boolean(lead.email);

  return (
    <section className="min-h-screen bg-black px-4 py-5 text-white sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-[900px] space-y-6">
        {/* Back */}
        <button
          onClick={() => navigate("/workspace/leads")}
          className="inline-flex items-center gap-2 text-sm text-neutral-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Leads
        </button>

        {/* Header card */}
        <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {lead.name}
                </h1>
                <span
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize ${statusStyles[lead.status]}`}
                >
                  {lead.status}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${priorityStyles[lead.priority]}`}
                >
                  {lead.priority} priority
                </span>
              </div>
              {lead.company && (
                <p className="mt-2 text-sm text-neutral-500">{lead.company}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {hasEmail ? (
                <a
                  href={`mailto:${lead.email}`}
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-neutral-800 px-5 text-sm font-medium text-white transition hover:bg-neutral-900"
                >
                  Send Email
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex h-11 cursor-not-allowed items-center justify-center rounded-2xl border border-neutral-900 px-5 text-sm font-medium text-neutral-600"
                  title="No email on file"
                >
                  Send Email
                </button>
              )}

              <button
                onClick={handleDeleteClick}
                className={`inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-medium transition ${
                  confirmDelete
                    ? "bg-red-600 text-white hover:bg-red-500"
                    : "border border-red-900/50 text-red-400 hover:bg-red-950/30"
                }`}
              >
                <Trash2 size={15} />
                {confirmDelete ? "Confirm Delete" : "Delete"}
              </button>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => copyToClipboard(lead.email, "email")}
            className="flex items-center justify-between gap-2 rounded-2xl border border-neutral-900 bg-neutral-950/40 px-4 py-3 text-left transition hover:border-neutral-700"
          >
            <span className="flex items-center gap-2 truncate text-sm text-neutral-300">
              <Mail size={15} className="shrink-0 text-neutral-500" />
              {lead.email || "No email"}
            </span>
            <Copy size={14} className="shrink-0 text-neutral-600" />
          </button>

          <button
            onClick={() => copyToClipboard(lead.phone, "phone")}
            className="flex items-center justify-between gap-2 rounded-2xl border border-neutral-900 bg-neutral-950/40 px-4 py-3 text-left transition hover:border-neutral-700"
          >
            <span className="flex items-center gap-2 truncate text-sm text-neutral-300">
              <Phone size={15} className="shrink-0 text-neutral-500" />
              {lead.phone || "No phone"}
            </span>
            <Copy size={14} className="shrink-0 text-neutral-600" />
          </button>

          <div className="flex items-center gap-2 rounded-2xl border border-neutral-900 bg-neutral-950/40 px-4 py-3 text-sm text-neutral-300">
            <Building2 size={15} className="shrink-0 text-neutral-500" />
            {lead.source || "Unknown source"}
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-neutral-900 bg-neutral-950/40 px-4 py-3 text-sm text-neutral-300">
            <Calendar size={15} className="shrink-0 text-neutral-500" />
            {lead.createdAt
              ? new Date(lead.createdAt).toLocaleString()
              : "Unknown date"}
          </div>
        </div>

        {copied && (
          <p className="text-xs text-green-400">
            {copied === "email" ? "Email" : "Phone"} copied to clipboard
          </p>
        )}

        {/* Message */}
        <div>
          <h3 className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-600">
            <Tag size={13} /> Message
          </h3>
          <p className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-5 text-sm leading-6 text-neutral-400">
            {lead.message || "No message provided."}
          </p>
        </div>

        {/* Editable controls */}
        <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-5 sm:p-6">
          <h3 className="mb-4 text-sm font-medium text-white">Update Lead</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-neutral-600">
                <Flag size={12} /> Status
              </label>
              <select
                value={lead.status}
                onChange={(e) =>
                  updateLeadMutation.mutate({ status: e.target.value })
                }
                className="h-11 w-full rounded-xl border border-neutral-900 bg-black px-3 text-sm capitalize text-white outline-none focus:border-neutral-700"
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
              <label className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-neutral-600">
                <Flag size={12} /> Priority
              </label>
              <select
                value={lead.priority}
                onChange={(e) =>
                  updateLeadMutation.mutate({ priority: e.target.value })
                }
                className="h-11 w-full rounded-xl border border-neutral-900 bg-black px-3 text-sm capitalize text-white outline-none focus:border-neutral-700"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}