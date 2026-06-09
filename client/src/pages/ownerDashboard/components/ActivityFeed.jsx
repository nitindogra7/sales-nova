import { Activity } from "lucide-react";

export default function ActivityFeed({ activities }) {
  return (
    <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-5 sm:p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-white">Recent Activity</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Latest CRM movements and updates
        </p>
      </div>

      <div className="space-y-4">
        {activities.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-neutral-300">
              <Activity size={15} />
            </div>

            <div className="min-w-0 flex-1 border-b border-neutral-900 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="shrink-0 text-xs text-neutral-600">
                  {item.time}
                </p>
              </div>

              <p className="mt-1 text-sm leading-6 text-neutral-500">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}