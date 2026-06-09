import { Globe, KeyRound, Send } from "lucide-react";

const steps = [
  {
    icon: Globe,
    title: "Endpoint",
    description: "Send a POST request to your lead capture endpoint.",
    value: "POST /api/leads",
  },
  {
    icon: KeyRound,
    title: "Headers",
    description: "Add your API key inside the request headers.",
    value: "x-api-key: your_api_key",
  },
  {
    icon: Send,
    title: "Body",
    description: "Send lead data like name, email, phone, and message.",
    value: "JSON payload",
  },
];

export default function IntegrationSteps() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
      {steps.map((step) => {
        const Icon = step.icon;

        return (
          <div
            key={step.title}
            className="rounded-3xl border border-neutral-900 bg-neutral-950/60 p-5 sm:p-6"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-900">
              <Icon size={20} />
            </div>

            <h3 className="text-lg font-semibold">{step.title}</h3>

            <p className="mt-2 text-sm leading-6 text-neutral-400">
              {step.description}
            </p>

            <div className="mt-5 overflow-hidden rounded-xl border border-neutral-900 bg-black p-4">
              <p className="truncate font-mono text-sm text-neutral-300">
                {step.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}