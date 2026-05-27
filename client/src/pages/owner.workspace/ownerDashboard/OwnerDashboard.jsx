import {
  LayoutDashboard,
  Users,
  KeyRound,
  UserPlus,
  BarChart3,
  Globe,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function OwnerDashboard({ response }) {
  const user = response?.user;

  return (
    <section className="min-h-screen w-full bg-black text-white px-8 py-10">
      <div className="mx-auto w-full max-w-[1120px]">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-2xl border border-neutral-800 bg-neutral-950 flex items-center justify-center">
                <LayoutDashboard size={21} />
              </div>

              <div>
                <h1 className="text-[30px] leading-none font-serif tracking-wide">
                  Owner Dashboard
                </h1>

                <p className="mt-2 text-sm text-neutral-500">
                  Welcome back, {user?.username || "Owner"}. Manage your CRM
                  workspace from one place.
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-neutral-900 bg-neutral-950 px-4 py-2 text-xs text-neutral-400">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Workspace Active
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
          <StatCard
            title="Total Leads"
            value="0"
            description="Captured from website forms"
            icon={<Users size={19} />}
          />

          <StatCard
            title="New Leads"
            value="0"
            description="Waiting for first response"
            icon={<Activity size={19} />}
          />

          <StatCard
            title="Team Members"
            value="1"
            description="Owner account active"
            icon={<UserPlus size={19} />}
          />

          <StatCard
            title="Conversion"
            value="0%"
            description="Won leads percentage"
            icon={<BarChart3 size={19} />}
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-7">
          {/* Left */}
          <div className="space-y-7">
            {/* Workspace Overview */}
            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 overflow-hidden">
              <div className="border-b border-neutral-900 px-7 py-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium">Workspace Overview</h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    Basic information about your CRM workspace.
                  </p>
                </div>

                <div className="h-10 w-10 rounded-2xl border border-neutral-800 bg-black flex items-center justify-center">
                  <Globe size={18} />
                </div>
              </div>

              <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-5">
                <InfoBox
                  label="Owner Name"
                  value={user?.username || "Not available"}
                />

                <InfoBox
                  label="Role"
                  value={user?.role || "owner"}
                />

                <InfoBox
                  label="Workspace Status"
                  value="Active"
                />

                <InfoBox
                  label="Plan"
                  value="Starter"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-7">
              <div className="mb-6">
                <h2 className="text-lg font-medium">Quick Actions</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Important actions to set up your CRM faster.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ActionCard
                  to="/workspace/generate-api"
                  icon={<KeyRound size={18} />}
                  title="Generate API"
                  description="Create API key for website forms."
                />

                <ActionCard
                  to="/workspace/invite"
                  icon={<UserPlus size={18} />}
                  title="Invite User"
                  description="Give access to your team members."
                />

                <ActionCard
                  to="/workspace/leads"
                  icon={<Users size={18} />}
                  title="View Leads"
                  description="Track incoming website leads."
                />
              </div>
            </div>

            {/* Lead Pipeline */}
            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-7">
              <div className="mb-6">
                <h2 className="text-lg font-medium">Lead Pipeline</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Basic stages your leads will move through.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <PipelineCard title="New" count="0" />
                <PipelineCard title="Contacted" count="0" />
                <PipelineCard title="Proposal" count="0" />
                <PipelineCard title="Won" count="0" />
              </div>
            </div>
          </div>

          {/* Right */}
          <aside className="space-y-7">
            {/* API Status */}
            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl border border-neutral-800 bg-black flex items-center justify-center">
                  <KeyRound size={18} />
                </div>

                <div>
                  <h3 className="text-base font-medium">API Integration</h3>
                  <p className="text-xs text-neutral-500">
                    Connect external website forms
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-900 bg-black p-4 mb-4">
                <p className="text-xs text-neutral-500 mb-2">Status</p>

                <div className="flex items-center gap-2 text-sm text-white">
                  <CheckCircle2 size={16} className="text-green-500" />
                  Ready to configure
                </div>
              </div>

              <Link
                to="/workspace/generate-api"
                className="h-11 w-full rounded-2xl bg-white text-black text-sm font-medium flex items-center justify-center gap-2 hover:bg-neutral-200 transition"
              >
                Manage API
                <ArrowUpRight size={16} />
              </Link>
            </div>

            {/* Access Control */}
            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl border border-neutral-800 bg-black flex items-center justify-center">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <h3 className="text-base font-medium">Access Control</h3>
                  <p className="text-xs text-neutral-500">
                    Your permission level
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <AccessItem text="Can manage workspace" />
                <AccessItem text="Can generate API keys" />
                <AccessItem text="Can invite users" />
                <AccessItem text="Can view all leads" />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl border border-neutral-800 bg-black flex items-center justify-center">
                  <Clock size={18} />
                </div>

                <div>
                  <h3 className="text-base font-medium">Recent Activity</h3>
                  <p className="text-xs text-neutral-500">
                    Latest workspace updates
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <ActivityItem text="Workspace dashboard created" />
                <ActivityItem text="Owner account verified" />
                <ActivityItem text="Ready for API setup" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, value, description, icon }) {
  return (
    <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="h-10 w-10 rounded-2xl border border-neutral-800 bg-black flex items-center justify-center text-neutral-300">
          {icon}
        </div>

        <span className="rounded-full border border-neutral-900 px-3 py-1 text-[10px] uppercase tracking-wide text-neutral-500">
          Live
        </span>
      </div>

      <h3 className="text-sm text-neutral-500">{title}</h3>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-xs leading-5 text-neutral-600">{description}</p>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-2xl border border-neutral-900 bg-black p-4">
      <p className="text-xs uppercase tracking-wide text-neutral-600">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function ActionCard({ to, icon, title, description }) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-neutral-900 bg-black p-5 hover:bg-neutral-950 transition"
    >
      <div className="mb-4 h-10 w-10 rounded-2xl border border-neutral-800 bg-neutral-950 flex items-center justify-center text-neutral-300">
        {icon}
      </div>

      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium">{title}</h3>
        <ArrowUpRight
          size={15}
          className="text-neutral-600 group-hover:text-white transition"
        />
      </div>

      <p className="mt-2 text-xs leading-5 text-neutral-500">
        {description}
      </p>
    </Link>
  );
}

function PipelineCard({ title, count }) {
  return (
    <div className="rounded-2xl border border-neutral-900 bg-black p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium">{title}</p>
        <span className="h-2 w-2 rounded-full bg-neutral-700" />
      </div>

      <p className="text-2xl font-semibold">{count}</p>
      <p className="mt-1 text-xs text-neutral-600">leads</p>
    </div>
  );
}

function AccessItem({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-neutral-900 bg-black px-4 py-3">
      <CheckCircle2 size={15} className="text-green-500" />
      <p className="text-sm text-neutral-400">{text}</p>
    </div>
  );
}

function ActivityItem({ text }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 h-2 w-2 rounded-full bg-neutral-600" />

      <div>
        <p className="text-sm text-neutral-400">{text}</p>
        <p className="mt-1 text-xs text-neutral-600">Just now</p>
      </div>
    </div>
  );
}