import { KeyRound, Copy, RefreshCw } from "lucide-react";

export default function ApiKeyCard() {
  const apiKey =
    "sn_14da4a740bf81951f3f528cf3b8fbb67f2ee601b50b5604d7627d6e019c65c85";

  return (
    <div className="rounded-3xl border border-neutral-900 bg-neutral-950/60 p-6">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900">
            <KeyRound size={22} />
          </div>

          <div>
            <h2 className="text-xl font-semibold">API Key</h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-400">
              Use this key in your request headers. Keep it private and do not
              expose it directly in frontend code.
            </p>
          </div>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-200">
          <RefreshCw size={16} />
          Generate New Key
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-neutral-900 bg-black p-4">
        <p className="mb-3 text-xs uppercase tracking-[3px] text-neutral-500">
          Current Key
        </p>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex-1 overflow-hidden rounded-xl border border-neutral-900 bg-neutral-950 px-4 py-4">
            <p className="truncate font-mono text-sm text-neutral-300">
              {apiKey}
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-800 px-5 py-4 text-sm text-neutral-300 transition hover:bg-neutral-900">
            <Copy size={16} />
            Copy Key
          </button>
        </div>
      </div>
    </div>
  );
}