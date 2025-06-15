import { User, Settings, Mail } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
  showInvitations?: boolean;
}

const nav = [
  { id: "profile", label: "Profile Details", icon: User },
  { id: "settings", label: "Settings", icon: Settings }
];

export default function AccountSidebar({ activeSection, onSelectSection }: SidebarProps) {
  return (
    <aside className="min-w-[220px] bg-white shadow-md h-screen p-6 flex flex-col gap-3 border-r border-gray-100">
      <div className="text-2xl font-semibold mb-8">My Account</div>
      <nav className="flex-1 flex flex-col gap-2">
        {nav.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`flex items-center gap-3 px-3 py-2 rounded text-left font-medium transition
                ${activeSection === item.id
                  ? "bg-indigo-100 text-indigo-600"
                  : "hover:bg-gray-100 text-gray-700"}`}
              onClick={() => onSelectSection(item.id)}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
