
import { useState } from "react";
import { User } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import MyAccountModal from "./MyAccountModal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const ProfileDropdown = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  if (!user) return null;

  const onSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast({ title: "Sign out failed", description: error.message, variant: "destructive" });
    else toast({ title: "Signed out", variant: "default" });
  };

  return (
    <>
      <DropdownMenu onOpenChange={setOpen} open={open}>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full border border-gray-200 p-2 hover:bg-gray-100 transition">
            <User className="w-6 h-6 text-gray-700" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => setAccountOpen(true)}>
            My Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onSignOut}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <MyAccountModal open={accountOpen} onOpenChange={setAccountOpen} />
    </>
  );
};
