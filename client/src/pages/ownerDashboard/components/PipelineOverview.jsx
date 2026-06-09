export default function PipelineOverview({ pipeline }) {
  return (
    <div className="rounded-3xl border border-neutral-900 bg-neutral-950/40 p-5 sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">
            Sales Pipeline
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Read-only lead distribution by stage
          </p>
        </div>

        <span className="rounded-full border border-neutral-900 bg-black px-3 py-1 text-xs text-neutral-500">
          Overview
        </span>
      </div>

      <div className="space-y-5">
        {pipeline.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-neutral-300">
                {item.label}
              </p>

              <p className="text-sm text-neutral-500">{item.value} leads</p>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-neutral-900">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}