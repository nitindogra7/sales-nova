import { useMemo, useState } from "react";
import LeadStats from "./components/LeadsStats.jsx";
import LeadToolbar from "./components/LeadToolBar.jsx";
import LeadCard from "./components/LeadCard.jsx";
import LeadDetail from "./LeadsDetail.jsx";
import api from "../../apis/Api.js";
import { useSearchParams } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export default function LeadsPage() {

   const [searchParams, setSearchParams] = useSearchParams();
   const page = Number(searchParams.get("page")) || 1;
   const limit = Number(searchParams.get("limit")) || 10;

  const {data , isLoading , isError , error} = useQuery({
    queryKey : ["get-leads" , page , limit],
    queryFn : async() => {
      const res = await api.get(`/api/leads?page=${page}&limit=${limit}`)
      return res.data
    }
  })
  const queryClient = useQueryClient();

  const updateLeadMutation = useMutation({
    mutationFn: async ({ id, values }) => {
      const res = await api.patch(`/api/leads/${id}`, values);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-leads"] });
    },
  });

  const deleteLeadMutation = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/api/leads/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-leads"] });
    },
  });

  const handleUpdateLead = (id, values) => {
    updateLeadMutation.mutate({ id, values });
    // keep modal lead in sync if open
    if (selectedLead?._id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, ...values } : prev));
    }
  };

  const handleDeleteLead = (id) => {
    deleteLeadMutation.mutate(id);
  };

  function nextPage(e){
    e.preventDefault()
    if(!data.hasNextPage) return
    setSearchParams({ page : String(page + 1) , limit : String(limit) })
  }

  function prevPage(e){
    e.preventDefault()
    if(!data.hasPrevPage) return
    setSearchParams({ page : String(page - 1), limit : String(limit) })
  }

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState(null);

  const leads = data?.leads || []

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const text = search.toLowerCase();
      const matchesSearch =
        (lead.name ?? "").toLowerCase().includes(text) ||
        (lead.email ?? "").toLowerCase().includes(text) ||
        (lead.phone ?? "").toLowerCase().includes(text) ||
        (lead.company ?? "").toLowerCase().includes(text);

      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  if (isLoading) {
    return (
      <section className="min-h-screen bg-black px-4 py-5 text-white sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[1350px] items-center justify-center">
          <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 px-8 py-6 text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-white"></div>
            <p className="text-sm text-neutral-400">Loading leads...</p>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-h-screen bg-black px-4 py-5 text-white sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[1350px] items-center justify-center">
          <div className="max-w-md rounded-3xl border border-red-900/50 bg-red-950/20 px-8 py-6 text-center">
            <h2 className="text-lg font-semibold text-red-400">Failed to load leads</h2>
            <p className="mt-2 text-sm text-red-300/80">
              {error?.response?.data?.message || error?.message || "Something went wrong"}
            </p>
          </div>
        </div>
      </section>
    );
  }

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
              Track leads, update status, set priority and manage your sales pipeline.
            </p>
          </div>

          <button className="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-5 text-sm font-medium text-black transition hover:bg-neutral-200">
            Add Lead
          </button>
        </div>

        <LeadStats leads={leads} data={data} />

        <LeadToolbar
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

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
                key={lead._id}
                lead={lead}
                onUpdate={handleUpdateLead}
                onDelete={handleDeleteLead}
                onView={setSelectedLead}
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

      <div className="mt-5 flex flex-col gap-3 border-t border-neutral-900 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-neutral-500">
          Page {data?.page} of {data?.totalPages} • Total {data?.total} leads
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={prevPage}
            disabled={!data?.hasPrevPage}
            className="rounded-xl border border-neutral-800 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>
          <button
            onClick={nextPage}
            disabled={!data?.hasNextPage}
            className="rounded-xl border border-neutral-800 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {selectedLead && (
        <LeadDetail
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={handleUpdateLead}
          onDelete={handleDeleteLead}
        />
      )}
    </section>
  );
}