import { useState } from "react";
import api from "../../apis/Api.js";
import Nav from "./components/Nav.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Menu, X } from "lucide-react";
import Dashboard from "./../ownerDashboard/Dashboard.jsx";
import LeadsPage from "./../Leads/LeadsPage.jsx";
import WorkspaceApiPage from "./../generate-api-Page/workspaceApi/WorkspaceApiPage.jsx";

export default function Workspace() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["workspace"],
    queryFn: async () => {
      const res = await api.get("/api/workspace");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center">
        <p className="text-sm text-neutral-400">loading...</p>
      </div>
    );
  }

  if (error?.response?.status === 403 || error?.response?.status === 401) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Mobile / Tablet Top Bar */}
      <header className="fixed left-0 top-0 z-40 flex h-16 w-full items-center justify-between border-b border-neutral-900 bg-black px-4 lg:hidden">
        <h1 className="text-xl font-serif tracking-wide">Sales Nova</h1>

        <button
          onClick={() => setSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Desktop Sidebar */}
      <div className="fixed left-0 top-0 z-50 hidden h-screen w-[280px] lg:block">
        <Nav response={data} />
      </div>

      {/* Mobile / Tablet Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-black/70"
          />

          {/* Drawer */}
          <div className="relative h-full w-[280px] max-w-[85vw]">
            <Nav response={data} onLinkClick={() => setSidebarOpen(false)} />

            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="min-h-screen w-full bg-black pt-16 lg:ml-[280px] lg:w-[calc(100%-280px)] lg:pt-0">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="generate-api" element={<WorkspaceApiPage />} />
        </Routes>
      </main>
    </div>
  );
}