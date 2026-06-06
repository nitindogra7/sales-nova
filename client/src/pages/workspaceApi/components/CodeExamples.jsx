import { Code2, Terminal } from "lucide-react";

export default function CodeExamples({ title, label, code }) {
  const lines = code.split("\n");

  return (
    <div className="rounded-3xl border border-white/5 bg-[#030303] p-4 shadow-[0_0_40px_rgba(255,255,255,0.03)] sm:p-5 lg:p-6">
      {/* Card Header */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
            <Code2 size={18} className="text-white" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              {title}
            </h2>
            <p className="mt-1 text-xs text-zinc-500">{label}</p>
          </div>
        </div>

        <div className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400 sm:block">
          API Docs
        </div>
      </div>

      {/* Code Editor */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#050505]">
        {/* Editor Top Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.025] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black px-3 py-1 text-xs text-zinc-400">
            <Terminal size={13} />
            <span>{label}</span>
          </div>
        </div>

        {/* Code Body */}
        <div className="max-w-full overflow-x-auto">
          <pre className="min-w-max p-0 text-xs leading-6 sm:text-sm pt-5 pb-5">
            <code>
              {lines.map((line, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[44px_1fr] hover:bg-white/[0.035] sm:grid-cols-[52px_1fr]"
                >
                  {/* Line Number */}
                  <span className="select-none border-r border-white/10 px-3 py-0.5 text-right font-mono text-zinc-700 sm:px-4">
                    {index + 1}
                  </span>

                  {/* Code Line */}
                  <span className="whitespace-pre px-4 py-0.5 font-mono text-zinc-300">
                    {line || " "}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}