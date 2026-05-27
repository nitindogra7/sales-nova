import api from "../../apis/Api";
import Nav from "./components/Nav";
import OwnerDashboard from "./ownerDashboard/OwnerDashboard";
import GenerateApi from "./components/GenerateApi";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading.jsx";
import Leads from ".././owner.workspace/components/Leads.jsx"
import InviteUser from "./components/InviteUser.jsx";
import Analytics from "./components/Analytics.jsx";

export default function Workspace() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["workspace"],
    queryFn: async () => {
      const res = await api.get("/api/workspace");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (error?.response?.status === 403) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <aside className="fixed left-0 top-0 z-50 h-screen w-[280px]">
        <Nav response={data} />
      </aside>

      <main className="ml-[280px] min-h-screen w-[calc(100%-280px)] bg-black">
        <Routes>
          <Route index element={<OwnerDashboard response={data} />} />
          <Route path="generate-api" element={<GenerateApi response={data} />} />
          <Route path="invite" element={<InviteUser />} />
          <Route path="leads" element={<Leads />} />
          <Route path="analytics" element={<Analytics />} />
        </Routes>
      </main>
    </div>
  );
}