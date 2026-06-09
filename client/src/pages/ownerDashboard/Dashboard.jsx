import {
  Activity,
  CheckCircle2,
  Clock,
  Target,
} from "lucide-react";

import OverviewCards from "./components/OverviewCard.jsx";
import PipelineOverview from "./components/PipelineOverview.jsx";
import RecentLeads from "./components/RecentLeads.jsx";
import WorkspaceHealth from "./components/WorkspaceHealth.jsx";
import ActivityFeed from "./components/ActivityFeed.jsx";

const stats = [
  {
    label: "Total Leads",
    value: "124",
    change: "+18 this week",
    icon: Target,
  },
  {
    label: "Qualified Leads",
    value: "36",
    change: "+8 this week",
    icon: CheckCircle2,
  },
  {
    label: "Pending Follow-ups",
    value: "17",
    change: "Needs attention",
    icon: Clock,
  },
  {
    label: "Conversion Rate",
    value: "24%",
    change: "+4.2% from last month",
    icon: Activity,
  },
];

const pipeline = [
  {
    label: "New",
    value: 38,
    percentage: 80,
  },
  {
    label: "Contacted",
    value: 27,
    percentage: 58,
  },
  {
    label: "Qualified",
    value: 21,
    percentage: 44,
  },
  {
    label: "Proposal",
    value: 14,
    percentage: 30,
  },
  {
    label: "Won",
    value: 9,
    percentage: 20,
  },
  {
    label: "Lost",
    value: 6,
    percentage: 12,
  },
];

const recentLeads = [
  {
    id: 1,
    name: "Rahul Sharma",
    company: "TechNova Labs",
    source: "Website Form",
    status: "new",
    priority: "high",
    time: "10:30 AM",
  },
  {
    id: 2,
    name: "Ananya Verma",
    company: "BrandHub",
    source: "LinkedIn",
    status: "contacted",
    priority: "medium",
    time: "Yesterday",
  },
  {
    id: 3,
    name: "Karan Mehta",
    company: "StartupX",
    source: "Cold DM",
    status: "qualified",
    priority: "high",
    time: "Jun 8",
  },
  {
    id: 4,
    name: "Priya Singh",
    company: "Digital Flow",
    source: "Referral",
    status: "proposal",
    priority: "low",
    time: "Jun 7",
  },
];

const activities = [
  {
    id: 1,
    title: "New lead captured",
    description: "Rahul Sharma submitted a website form.",
    time: "12 min ago",
  },
  {
    id: 2,
    title: "Lead marked as qualified",
    description: "Karan Mehta moved to qualified stage.",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "API key active",
    description: "Website lead capture API is connected.",
    time: "Today",
  },
  {
    id: 4,
    title: "Proposal stage updated",
    description: "Priya Singh moved to proposal stage.",
    time: "Yesterday",
  },
];

export default function Dashboard() {
  return (
    <section className="min-h-screen bg-black px-4 py-5 text-white sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-[1350px] space-y-6">
        {/* Header */}
        <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm text-neutral-500">Workspace / Dashboard</p>

              <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Owner Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
                Read-only overview of your leads, pipeline status, workspace
                health and recent CRM activity.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-900 bg-black px-4 py-3">
              <p className="text-xs text-neutral-600">Current Workspace</p>
              <p className="mt-1 text-sm font-medium text-white">
                Sales Nova CRM
              </p>
            </div>
          </div>
        </div>

        <OverviewCards stats={stats} />

        <div className="grid gap-5 xl:grid-cols-[1fr_370px]">
          <PipelineOverview pipeline={pipeline} />
          <WorkspaceHealth />
        </div>

        <div className="grid gap-5 xl:grid-cols-[1fr_370px]">
          <RecentLeads leads={recentLeads} />
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </section>
  );
}