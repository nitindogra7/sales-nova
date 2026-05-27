import { useState } from "react";
import api from "../../../apis/Api.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Copy,
  KeyRound,
  RefreshCw,
  ShieldCheck,
  Code2,
  AlertTriangle,
  Globe,
} from "lucide-react";

const GenerateApi = () => {
  const [copied, setCopied] = useState(false);

  const queryClient = useQueryClient();

  // GET API KEY
  const { data, isLoading } = useQuery({
    queryKey: ["apiKey"],
    queryFn: async () => {
      const response = await api.get("/api/get-apiKey");
      return response.data;
    },
  });

  // GENERATE API KEY
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("/api/generate-api");
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["apiKey"],
      });
    },
  });

  const apiKey = data?.apiKey || "";

  const copyKey = async () => {
    if (!apiKey) return;

    await navigator.clipboard.writeText(apiKey);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <h1 className="text-3xl font-inter font-semibold">
            API Integration
          </h1>

          <p className="mt-2 text-neutral-500">
            Generate your API key and connect website forms with your CRM.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* API CARD */}

          <div className="rounded-2xl border border-neutral-900 bg-neutral-950 p-6 shadow-2xl">

            <div className="flex items-center gap-3 mb-6">

              <div className="h-12 w-12 rounded-xl border border-neutral-800 flex items-center justify-center">
                <KeyRound className="h-5 w-5 text-neutral-300" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Generate API Key
                </h2>

                <p className="text-sm text-neutral-500">
                  Use this key to submit leads from your website.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-black p-4 mb-5">

              <label className="text-sm text-neutral-500">
                Your API Key
              </label>

              <div className="mt-3 flex items-center gap-3">

                <input
                  value={apiKey || "No API key generated yet"}
                  readOnly
                  className="w-full bg-transparent text-sm text-neutral-300 outline-none"
                />

                <button
                  onClick={copyKey}
                  disabled={!apiKey}
                  className="rounded-lg border border-neutral-800 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-900 disabled:opacity-40"
                >
                  <Copy className="h-4 w-4" />
                </button>

              </div>

              {copied && (
                <p className="mt-2 text-xs text-green-500">
                  API key copied successfully.
                </p>
              )}

            </div>

            <button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className="w-full rounded-xl bg-white text-black py-3 font-medium hover:bg-neutral-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className="h-4 w-4" />

              {mutation.isPending
                ? "Generating..."
                : "Generate New API Key"}
            </button>

            <div className="mt-5 rounded-xl border border-yellow-900/40 bg-yellow-950/20 p-4 flex gap-3">

              <AlertTriangle className="h-5 w-5 text-yellow-500" />

              <p className="text-xs text-yellow-200">
                Keep this key private. Anyone with this key can send leads to
                your CRM workspace.
              </p>

            </div>
          </div>

          {/* DOCS CARD */}

          <div className="rounded-2xl border border-neutral-900 bg-neutral-950 p-6">

            <div className="flex items-center gap-3 mb-5">
              <Code2 className="h-5 w-5 text-neutral-300" />
              <h2 className="text-lg font-semibold">
                Quick Integration
              </h2>
            </div>

            <div className="space-y-4">

              <div className="rounded-xl border border-neutral-800 bg-black p-4">

                <p className="text-sm text-neutral-400 mb-2">
                  Endpoint
                </p>

                <code className="text-sm text-neutral-200">
                  POST https://yourcrm.com/api/leads
                </code>

              </div>

              <div className="rounded-xl border border-neutral-800 bg-black p-4">

                <p className="text-sm text-neutral-400 mb-2">
                  Headers
                </p>

                <pre className="overflow-x-auto text-sm text-neutral-300">
{`{
  "x-api-key": "${apiKey || "YOUR_API_KEY"}",
  "Content-Type": "application/json"
}`}
                </pre>

              </div>

              <div className="rounded-xl border border-neutral-800 bg-black p-4">

                <p className="text-sm text-neutral-400 mb-2">
                  Body Example
                </p>

                <pre className="overflow-x-auto text-sm text-neutral-300">
{`{
  "name": "jon snow",
  "email": "jon@example.com",
  "phone": "9876543210",
  "message": "Interested in your service"
}`}
                </pre>

              </div>

            </div>

          </div>

        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">

          <div className="rounded-xl border border-neutral-900 bg-neutral-950 p-5">
            <ShieldCheck className="h-5 w-5 text-neutral-300 mb-3" />

            <h3 className="font-medium">
              Secure Access
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              Each key belongs to one workspace only.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-900 bg-neutral-950 p-5">
            <Globe className="h-5 w-5 text-neutral-300 mb-3" />

            <h3 className="font-medium">
              Website Forms
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              Connect landing pages, contact forms, and campaign pages.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-900 bg-neutral-950 p-5">
            <Code2 className="h-5 w-5 text-neutral-300 mb-3" />

            <h3 className="font-medium">
              Developer Friendly
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              Simple REST API for posting leads directly.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default GenerateApi;