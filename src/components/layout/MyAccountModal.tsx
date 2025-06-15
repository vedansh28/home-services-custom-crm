
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import InviteUserForm from "./InviteUserForm";

const AccountDetails = ({ profile, onEdit, loading }: any) => {
  const [form, setForm] = useState({
    username: profile?.username || "",
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    onEdit(form);
  };

  return (
    <form className="space-y-4 mt-2" onSubmit={onSubmit}>
      <div>
        <label className="block text-sm font-semibold">Email (username)</label>
        <Input value={profile?.username || ""} disabled className="bg-gray-100" />
      </div>
      <div>
        <label className="block text-sm font-semibold">First Name</label>
        <Input
          value={form.first_name}
          onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold">Last Name</label>
        <Input
          value={form.last_name}
          onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
        />
      </div>
      <Button type="submit" disabled={loading}>
        Save Changes
      </Button>
    </form>
  );
};

const MyAccountModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (b: boolean) => void }) => {
  const { user, role } = useAuth();
  const { profile, isLoading, updateProfile, updateStatus } = useProfile(user?.id);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>My Account</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">Account Details</TabsTrigger>
            <TabsTrigger value="settings">
              <span className="flex items-center gap-1"><Settings className="w-4 h-4" />Settings</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="pt-4">
            {isLoading ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : (
              <AccountDetails
                profile={profile}
                onEdit={async (data: any) => {
                  try {
                    await updateProfile(data);
                    toast({ title: "Profile updated" });
                  } catch (e: any) {
                    toast({ title: "Update failed", description: e.message, variant: "destructive" });
                  }
                }}
                loading={updateStatus === "pending"}
              />
            )}
          </TabsContent>
          <TabsContent value="settings" className="pt-4">
            {role === "admin" ? <InviteUserForm /> : <div className="text-gray-500 text-sm">No admin privileges.</div>}
          </TabsContent>
        </Tabs>
        <DialogClose asChild>
          <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">×</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default MyAccountModal;
