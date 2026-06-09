import { BadgeCheck, Inbox, Trophy, Users } from "lucide-react";

export default function LeadStats({ leads }) {
  const stats = [
    {
      label: "Total Leads",
      value: leads.length,
      icon: Users,
    },
    {
      label: "New Leads",
      value: leads.filter((lead) => lead.status === "new").length,
      icon: Inbox,
    },
    {
      label: "Qualified",
      value: leads.filter((lead) => lead.status === "qualified").length,
      icon: BadgeCheck,
    },
    {
      label: "Won",
      value: leads.filter((lead) => lead.status === "won").length,
      icon: Trophy,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-3xl border border-neutral-900 bg-neutral-950/50 p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-500">{item.label}</p>

              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-900 text-neutral-300">
                <Icon size={18} />
              </div>
            </div>

            <h3 className="mt-5 text-3xl font-semibold tracking-tight">
              {item.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
}