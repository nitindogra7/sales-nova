import {
  CheckCircle2,
  Database,
  KeyRound,
  ShieldCheck,
  Users,
} from "lucide-react";

const healthItems = [
  {
    label: "API Key",
    value: "Active",
    icon: KeyRound,
  },
  {
    label: "Lead Capture",
    value: "Connected",
    icon: Database,
  },
  {
    label: "Workspace Role",
    value: "Owner",
    icon: ShieldCheck,
  },
  {
    label: "Team Access",
    value: "3 Users",
    icon: Users,
  },
];

export default function WorkspaceHealth() {
  return (
    <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-5 sm:p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-white">
          Workspace Health
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          System status and CRM setup
        </p>
      </div>

      <div className="space-y-3">
        {healthItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-2xl border border-neutral-900 bg-black px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-neutral-300">
                  <Icon size={16} />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-600">
                    Read-only status
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                <CheckCircle2 size={13} />
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}