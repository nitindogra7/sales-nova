import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function ApiNotes() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-neutral-900 bg-neutral-950/60 p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <CheckCircle2 size={20} className="text-green-400" />
          <h3 className="text-lg font-semibold">Good Use Cases</h3>
        </div>

        <div className="space-y-3 text-sm leading-6 text-neutral-400">
          <p>• Capture leads from your website contact form</p>
          <p>• Send leads from landing pages</p>
          <p>• Connect custom forms to your CRM</p>
          <p>• Store client inquiries directly in Sales Nova</p>
        </div>
      </div>

      <div className="rounded-3xl border border-neutral-900 bg-neutral-950/60 p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <AlertCircle size={20} className="text-yellow-400" />
          <h3 className="text-lg font-semibold">Important Notes</h3>
        </div>

        <div className="space-y-3 text-sm leading-6 text-neutral-400">
          <p>• Do not expose your API key in public frontend code</p>
          <p>• Use the key only from trusted websites or backend servers</p>
          <p>• Regenerate your key if you think it was leaked</p>
          <p>• Always send data as JSON</p>
        </div>
      </div>
    </div>
  );
}