import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  KeyRound,
  BarChart3,
  Settings,
  UserPlus,
  Sparkles,
} from "lucide-react";

export default function Nav({ response, onLinkClick }) {
  const user = response?.user || response?.data?.user;
  const workspace = response?.workspace || response?.data?.workspace;

  const companyName =
    workspace?.companyName || user?.companyName || "Sales Nova";

  const userName = user?.username || user?.fullName || user?.name || "Owner";
  const userEmail = user?.email || "workspace owner";

  const navItems = [
    {
      label: "Dashboard",
      path: "/workspace",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "Leads",
      path: "/workspace/leads",
      icon: Users,
    },
    {
      label: "API Integration",
      path: "/workspace/generate-api",
      icon: KeyRound,
    },
  ];

  const comingSoonItems = [
    {
      label: "Users",
      icon: UserPlus,
    },
    {
      label: "Analytics",
      icon: BarChart3,
    },
    {
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="flex h-screen w-full flex-col border-r border-neutral-900 bg-black text-white">
      {/* Brand */}
      <div className="border-b border-neutral-900 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
            <Sparkles size={17} />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold tracking-tight">
              Sales Nova
            </h1>
            <p className="text-xs text-neutral-500">CRM Workspace</p>
          </div>
        </div>
      </div>

      {/* User / Workspace */}
      <div className="px-3 py-4">
        <div className="rounded-2xl border border-neutral-900 bg-neutral-950/60 px-3 py-3">
          <p className="truncate text-sm font-medium text-white">
            {companyName}
          </p>

          <div className="mt-3 flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold uppercase text-neutral-200">
              {userName?.charAt(0)}
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-neutral-300">
                {userName}
              </p>
              <p className="truncate text-[11px] text-neutral-600">
                {userEmail}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto px-3">
        <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-600">
          Main
        </p>

        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.end}
                onClick={onLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white text-black shadow-sm"
                      : "text-neutral-400 hover:bg-neutral-950 hover:text-white"
                  }`
                }
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        <div className="mt-6">
          <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-600">
            Manage
          </p>

          <div className="space-y-1">
            {comingSoonItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  disabled
                  className="flex w-full cursor-not-allowed items-center justify-between rounded-xl px-3 py-2.5 text-sm text-neutral-600"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={17} />
                    {item.label}
                  </span>

                  <span className="rounded-full bg-neutral-950 px-2 py-0.5 text-[10px] text-neutral-600">
                    soon
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom CTA */}
      <div className="border-t border-neutral-900 p-3">
        <NavLink
          to="/workspace/generate-api"
          onClick={onLinkClick}
          className="flex items-center justify-between rounded-2xl border border-neutral-900 bg-neutral-950/70 px-3 py-3 transition hover:bg-neutral-900"
        >
          <div>
            <p className="text-sm font-medium text-white">API Key</p>
            <p className="mt-0.5 text-xs text-neutral-500">
              Connect website forms
            </p>
          </div>

          <KeyRound size={17} className="text-neutral-400" />
        </NavLink>
      </div>
    </aside>
  );
}