import { ShieldCheck } from "lucide-react";
import ApiKeyCard from "./components/ApiKeyCard";
import IntegrationSteps from "./components/IntegrationSteps";
import CodeExamples from "./components/CodeExamples";
import ApiNotes from "./components/ApiNotes";
import { fetchCode, axiosCode, requestBodyCode } from "./data/apiDocs";

export default function WorkspaceApiPage() {
  return (
    <section className="min-h-screen w-full bg-black px-4 py-6 text-white sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto w-full max-w-[1120px] space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 rounded-3xl border border-neutral-900 bg-neutral-950/40 p-5 sm:p-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm text-neutral-500">Workspace API</p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Your API Integration
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-400">
              Generate your workspace API key and use it to capture leads from
              your website, landing pages, forms, or custom applications.
            </p>
          </div>

          <div className="w-fit rounded-2xl border border-neutral-900 bg-neutral-950 px-4 py-3 sm:px-5 sm:py-4">
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <ShieldCheck size={18} className="text-green-400" />
              Secured with API key
            </div>
          </div>
        </div>

        <ApiKeyCard />

        <IntegrationSteps />

        <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
          <CodeExamples title="Using Fetch" label="JavaScript" code={fetchCode} />
          <CodeExamples title="Using Axios" label="JavaScript" code={axiosCode} />
        </div>

        <CodeExamples
          title="Request Body Example"
          label="JSON"
          code={requestBodyCode}
        />

        <ApiNotes />
      </div>
    </section>
  );
}