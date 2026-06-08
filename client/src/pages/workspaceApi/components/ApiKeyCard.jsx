import { KeyRound, Copy, RefreshCw } from "lucide-react";
import { useQueryClient , useMutation , useQuery} from "@tanstack/react-query";
import api from "../../../apis/Api";
import { useState } from "react";

export default function ApiKeyCard() {

  const [copy , setCopy] = useState(false)

  const queryClient = useQueryClient();
  const generateKeyMutation = useMutation({
    mutationFn : async()=>{
      const res = await api.post("/api/generate-api");
      return res
    },
      onSuccess : () => {
        queryClient.invalidateQueries({queryKey : ["api-key"]})
      },
     onError: (error) => {
      console.log(error);
    },
  })

  const {data , isLoading , isError , error} = useQuery({
    queryKey : ["api-key"],
    queryFn : async()=>{
       const res = await api.get("/api/get-apiKey");
      return res.data;
    }
  })


  const handleCopy = async () => {
  if (!data?.apiKey) return;
  try {
    await navigator.clipboard.writeText(data.apiKey);
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 3000);
  } catch (error) {
    console.log("Copy failed", error);
    setCopy(false)
  }
};

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

        <button
        onClick={() => generateKeyMutation.mutate()}
        disabled={generateKeyMutation.isPending}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-200">
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
               {isLoading
                ? "Loading..."
                : isError
                ? error?.response?.data?.message || "Failed to fetch API key"
                : data?.apiKey || "No API key generated yet"}
            </p>
          </div>

          <button
  onClick={handleCopy}
  disabled={!data?.apiKey}
  className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-4 text-sm transition-all ease-in-out disabled:cursor-not-allowed disabled:opacity-50 ${
    copy
      ? "scale-95 border-green-700 bg-green-500 text-black hover:bg-green-600"
      : "scale-100 border-neutral-800 text-neutral-300 hover:bg-neutral-900"
  }`}
>
  {copy ? "Copied" : "Copy Key"}
</button>
        </div>
      </div>
    </div>
  );
}