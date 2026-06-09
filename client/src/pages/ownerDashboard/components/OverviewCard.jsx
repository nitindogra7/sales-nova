export default function OverviewCards({ stats }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-3xl border border-neutral-900 bg-neutral-950/50 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-neutral-500">{item.label}</p>

                <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                  {item.value}
                </h3>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-neutral-900 text-neutral-300">
                <Icon size={18} />
              </div>
            </div>

            <p className="mt-4 text-xs text-neutral-500">{item.change}</p>
          </div>
        );
      })}
    </div>
  );
}