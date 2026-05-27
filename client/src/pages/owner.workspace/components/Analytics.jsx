import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from "lucide-react";

const leadGrowthData = [
  { month: "Jan", leads: 24 },
  { month: "Feb", leads: 38 },
  { month: "Mar", leads: 45 },
  { month: "Apr", leads: 62 },
  { month: "May", leads: 80 },
  { month: "Jun", leads: 96 },
];

const sourceData = [
  { source: "Website", leads: 45 },
  { source: "Landing Page", leads: 28 },
  { source: "Ads", leads: 22 },
  { source: "Referral", leads: 15 },
];

const statusData = [
  { name: "New", value: 35 },
  { name: "Contacted", value: 28 },
  { name: "Proposal", value: 18 },
  { name: "Won", value: 12 },
];

const conversionData = [
  { stage: "New", value: 100 },
  { stage: "Contacted", value: 72 },
  { stage: "Proposal", value: 44 },
  { stage: "Won", value: 26 },
];

export default function Analytics() {
  return (
    <section className="min-h-screen w-full bg-black text-white px-8 py-10">
      <div className="mx-auto w-full max-w-[1180px]">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl border border-neutral-800 bg-neutral-950 flex items-center justify-center">
              <BarChart3 size={22} />
            </div>

            <div>
              <h1 className="text-[28px] leading-none font-serif tracking-wide">
                Analytics
              </h1>
              <p className="mt-2 text-sm text-neutral-500">
                Track leads, conversion, sources, and workspace performance.
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-neutral-900 bg-neutral-950 px-4 py-2 text-xs text-neutral-400">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Live Overview
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-7 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCard
            title="Total Leads"
            value="286"
            change="+18.2%"
            icon={<Users size={20} />}
          />

          <StatCard
            title="Conversion Rate"
            value="26%"
            change="+4.5%"
            icon={<Target size={20} />}
          />

          <StatCard
            title="Won Leads"
            value="74"
            change="+12.8%"
            icon={<CheckCircle2 size={20} />}
          />

          <StatCard
            title="Pending Followups"
            value="32"
            change="-6.1%"
            icon={<Clock size={20} />}
          />
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-7">
          {/* Lead Growth */}
          <ChartCard
            title="Lead Growth"
            description="Monthly leads captured from connected websites and forms."
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={leadGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#171717" />
                <XAxis dataKey="month" stroke="#737373" fontSize={12} />
                <YAxis stroke="#737373" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "#050505",
                    border: "1px solid #262626",
                    borderRadius: "14px",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="#ffffff"
                  fill="#262626"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Lead Status */}
          <ChartCard
            title="Lead Status"
            description="Current distribution of leads by stage."
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={4}
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={["#ffffff", "#a3a3a3", "#737373", "#404040"][index]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "#050505",
                    border: "1px solid #262626",
                    borderRadius: "14px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-2 grid grid-cols-2 gap-3">
              {statusData.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-neutral-900 bg-black px-4 py-3"
                >
                  <p className="text-xs text-neutral-500">{item.name}</p>
                  <h4 className="mt-1 text-lg font-medium">{item.value}</h4>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Bottom Charts */}
        <div className="mt-7 grid grid-cols-1 xl:grid-cols-2 gap-7">
          {/* Lead Sources */}
          <ChartCard
            title="Lead Sources"
            description="Where your leads are coming from."
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#171717" />
                <XAxis dataKey="source" stroke="#737373" fontSize={12} />
                <YAxis stroke="#737373" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "#050505",
                    border: "1px solid #262626",
                    borderRadius: "14px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="leads" fill="#ffffff" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Conversion Funnel */}
          <ChartCard
            title="Conversion Funnel"
            description="How many leads move through each sales stage."
          >
            <div className="space-y-5">
              {conversionData.map((item) => (
                <div key={item.stage}>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm text-neutral-300">{item.stage}</p>
                    <p className="text-sm text-neutral-500">{item.value}%</p>
                  </div>

                  <div className="h-3 w-full rounded-full bg-neutral-900 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-white"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-neutral-900 bg-black p-5">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h4 className="text-base font-medium">
                    Funnel Health
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-neutral-500">
                    Your biggest drop is between contacted and proposal stage.
                    Improve follow-up speed to increase conversion.
                  </p>
                </div>

                <div className="h-10 w-10 shrink-0 rounded-2xl bg-neutral-900 flex items-center justify-center">
                  <TrendingUp size={18} />
                </div>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, value, change, icon }) {
  const isPositive = change.startsWith("+");

  return (
    <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="h-11 w-11 rounded-2xl border border-neutral-800 bg-black flex items-center justify-center">
          {icon}
        </div>

        <div
          className={`flex items-center gap-1 rounded-full border border-neutral-800 px-3 py-1 text-xs ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}
        >
          <ArrowUpRight size={13} />
          {change}
        </div>
      </div>

      <p className="text-sm text-neutral-500">{title}</p>
      <h3 className="mt-2 text-3xl font-medium tracking-tight">{value}</h3>
    </div>
  );
}

function ChartCard({ title, description, children }) {
  return (
    <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="mt-1 text-sm text-neutral-500">{description}</p>
      </div>

      {children}
    </div>
  );
}