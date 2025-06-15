
import { ProfileDropdown } from "./ProfileDropdown";
import { useAuth } from "@/hooks/useAuth";

export const HeaderBar = () => {
  const { user } = useAuth();
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 flex items-center h-16 justify-between">
        <span className="font-bold text-blue-700 text-lg">WindowWashing CRM</span>
        <div>{user ? <ProfileDropdown /> : null}</div>
      </div>
    </header>
  );
};
