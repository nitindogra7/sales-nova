import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  KeyRound,
  BarChart3,
  Settings,
  User,
  LogOut,
  UserPlus,
} from "lucide-react";

export default function Nav({ response, onLinkClick }) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const menuClass = ({ isActive }) =>
    `w-full flex items-center gap-3 px-4 sm:px-5 py-3 rounded-xl border border-neutral-900 transition text-sm ${
      isActive ? "bg-neutral-900" : "hover:bg-neutral-950"
    }`;

  return (
    <aside className="flex h-full w-full flex-col justify-between overflow-y-auto border-r border-neutral-900 bg-black px-4 py-6 text-white sm:px-6 lg:w-[280px] lg:px-7 lg:py-10">
      <div>
        {/* Logo */}
        <h1 className="mb-8 text-2xl font-serif tracking-wide lg:mb-12">
          Sales Nova
        </h1>

        {/* Main Menu */}
        <div className="space-y-3 lg:space-y-4">
          <h2 className="text-xs uppercase tracking-[3px] text-neutral-500">
            Main Menu
          </h2>

          <NavLink
            to="/workspace"
            end
            className={menuClass}
            onClick={onLinkClick}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/workspace/leads"
            className={menuClass}
            onClick={onLinkClick}
          >
            <Users size={18} />
            Leads
          </NavLink>

          <NavLink
            to="/workspace/generate-api"
            className={menuClass}
            onClick={onLinkClick}
          >
            <KeyRound size={18} />
            Your API
          </NavLink>

          <NavLink
            to="/workspace/analytics"
            className={menuClass}
            onClick={onLinkClick}
          >
            <BarChart3 size={18} />
            Analytics
          </NavLink>

          <NavLink
            to="/workspace/invite"
            className={menuClass}
            onClick={onLinkClick}
          >
            <UserPlus size={18} />
            Invite
          </NavLink>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative mt-8 space-y-4">
        {/* Profile */}
        <div className="flex items-center gap-4 rounded-xl border border-neutral-900 px-4 py-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-900">
            <User size={18} />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-medium">
              {response?.user?.username || "User"}
            </h1>

            <p className="truncate text-xs text-neutral-500">
              {response?.user?.role || "Role"}
            </p>
          </div>
        </div>

        {/* Settings */}
        <div className="relative">
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={`flex w-full items-center gap-3 rounded-xl border border-neutral-900 px-4 py-3 text-sm transition sm:px-5 ${
              settingsOpen ? "bg-neutral-900" : "hover:bg-neutral-950"
            }`}
          >
            <Settings size={18} />
            Settings
          </button>

          {settingsOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-full rounded-xl border border-neutral-900 bg-neutral-950 p-2">
              <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition hover:bg-neutral-900">
                <User size={16} />
                Profile
              </button>

              <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition hover:bg-neutral-900">
                Workspace
              </button>

              <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-400 transition hover:bg-neutral-900">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}