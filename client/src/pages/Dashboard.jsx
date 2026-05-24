import api from "../apis/Api";
import { useEffect } from "react";
export default function Dashboard() {
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/api/dashboard");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to the Dashboard</h1>
    </div>
  );
}