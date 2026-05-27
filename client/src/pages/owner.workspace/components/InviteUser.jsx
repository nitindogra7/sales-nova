import { useState } from "react";
import {
  UserPlus,
  Mail,
  Shield,
  Send,
  Users,
  Info,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export default function InviteUser() {
  const [formData, setFormData] = useState({
    email: "",
    role: "sales",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Invite Data:", formData);

      /*
      const res = await api.post("/api/invite-user", formData);
      console.log(res.data);
      */

      setFormData({
        email: "",
        role: "sales",
        message: "",
      });
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen w-full bg-black text-white px-8 py-8">
      <div className="mx-auto w-full max-w-[1180px]">
        {/* Header */}
        <div className="mb-7 flex items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl border border-neutral-800 bg-neutral-950 flex items-center justify-center">
              <UserPlus size={21} />
            </div>

            <div>
              <h1 className="text-[28px] leading-none font-serif tracking-wide">
                Invite Team Member
              </h1>
              <p className="text-sm text-neutral-500 mt-2">
                Add people to your workspace and control their access level.
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-neutral-900 bg-neutral-950 px-4 py-2 text-xs text-neutral-400">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Owner Access
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-6">
          {/* Left Form */}
          <div className="rounded-3xl border border-neutral-900 bg-neutral-950/50 overflow-hidden">
            <div className="border-b border-neutral-900 px-7 py-5">
              <h2 className="text-lg font-medium">Invite Details</h2>
              <p className="text-sm text-neutral-500 mt-1">
                Enter user email and assign a role before sending invite.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-7 space-y-5">
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm text-neutral-300">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="teammate@example.com"
                    className="h-12 w-full rounded-2xl border border-neutral-800 bg-black pl-11 pr-4 text-sm text-white outline-none placeholder:text-neutral-700 transition focus:border-neutral-600"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="mb-2 block text-sm text-neutral-300">
                  Role
                </label>

                <div className="relative">
                  <Shield
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                  />

                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="h-12 w-full appearance-none rounded-2xl border border-neutral-800 bg-black pl-11 pr-11 text-sm text-white outline-none transition focus:border-neutral-600"
                  >
                    <option value="sales">Sales</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>

                  <ChevronDown
                    size={17}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
                  />
                </div>

                <p className="mt-2 text-xs text-neutral-600">
                  Owner role is not assignable. Only workspace creator stays owner.
                </p>
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm text-neutral-300">
                  Message{" "}
                  <span className="text-neutral-600 font-normal">
                    optional
                  </span>
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write a short message for this invite..."
                  rows="4"
                  className="w-full resize-none rounded-2xl border border-neutral-800 bg-black px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-neutral-700 transition focus:border-neutral-600"
                />
              </div>

              {/* Action Row */}
              <div className="flex items-center justify-between gap-4 pt-2">
                <p className="hidden sm:block text-xs text-neutral-600">
                  Invite link will be sent to this email.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 min-w-[170px] rounded-2xl bg-white px-6 text-sm font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  <Send size={17} />
                  {loading ? "Sending..." : "Send Invite"}
                </button>
              </div>
            </form>
          </div>

          {/* Right Panel */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/50 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl border border-neutral-800 bg-black flex items-center justify-center">
                  <Users size={18} />
                </div>

                <div>
                  <h3 className="text-base font-medium">Role Access</h3>
                  <p className="text-xs text-neutral-500">
                    Permissions by role
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <RoleCard
                  role="Sales"
                  description="Can view and manage assigned leads."
                />
                <RoleCard
                  role="Manager"
                  description="Can monitor team leads and sales progress."
                />
                <RoleCard
                  role="Admin"
                  description="Can manage users, settings, and all leads."
                />
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-900 bg-neutral-950/50 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl border border-neutral-800 bg-black flex items-center justify-center">
                  <Info size={18} />
                </div>

                <div>
                  <h3 className="text-base font-medium">Invite Flow</h3>
                  <p className="text-xs text-neutral-500">
                    How access is given
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Step text="Owner sends an invite." />
                <Step text="User accepts from email link." />
                <Step text="Account joins this workspace." />
                <Step text="Role controls dashboard access." />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function RoleCard({ role, description }) {
  return (
    <div className="rounded-2xl border border-neutral-900 bg-black px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-medium text-white">{role}</h4>
        <span className="rounded-full border border-neutral-800 px-2 py-1 text-[10px] uppercase tracking-wide text-neutral-500">
          Role
        </span>
      </div>

      <p className="mt-2 text-xs leading-5 text-neutral-500">
        {description}
      </p>
    </div>
  );
}

function Step({ text }) {
  return (
    <div className="flex items-center gap-3 text-sm text-neutral-400">
      <div className="h-7 w-7 rounded-full border border-neutral-800 bg-black flex items-center justify-center shrink-0">
        <CheckCircle2 size={14} className="text-neutral-500" />
      </div>

      <p className="leading-5">{text}</p>
    </div>
  );
}