
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import AccountSidebar from "@/components/account/AccountSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const sections = [
  { id: "profile", label: "Profile Details" },
  { id: "settings", label: "Settings" },
];

const Account = () => {
  const { user, role, isLoading } = useAuth();
  const [section, setSection] = useState("profile");
  const { profile, isLoading: profileLoading, updateProfile } = useProfile(user?.id);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState({ first_name: "", last_name: "" });

  // State for Invite email field (UI only)
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);

  // Fill local state when switching sections
  function loadProfileFields() {
    setDetails({
      first_name: profile?.first_name ?? "",
      last_name: profile?.last_name ?? ""
    });
  }

  if (isLoading || profileLoading) return <div className="p-10 text-gray-500">Loading…</div>;

  // Main section content
  let content: React.ReactNode = null;

  if (section === "profile") {
    content = (
      <div className="space-y-5 max-w-lg">
        <h2 className="text-xl font-semibold mb-4">My Profile</h2>
        {!edit ? (
          <div>
            <div className="mb-3"><b>Name:</b>{" "}
              {(profile?.first_name || profile?.last_name) ?
                `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim() :
                <span className="italic text-gray-400">Not set</span>}
            </div>
            <div className="mb-3"><b>Email:</b> {user?.email}</div>
            <Button onClick={() => { loadProfileFields(); setEdit(true); }}>Edit</Button>
          </div>
        ) : (
          <form className="space-y-3"
            onSubmit={async e => {
              e.preventDefault();
              await updateProfile(details);
              toast({ title: "Profile updated!" });
              setEdit(false);
            }}
          >
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <Input
                value={details.first_name}
                onChange={e => setDetails({ ...details, first_name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <Input
                value={details.last_name}
                onChange={e => setDetails({ ...details, last_name: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Save</Button>
              <Button variant="secondary" type="button" onClick={() => setEdit(false)}>Cancel</Button>
            </div>
          </form>
        )}
      </div>
    );
  } else if (section === "settings") {
    content = (
      <div className="space-y-7 max-w-lg">
        <div>
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <p className="text-gray-500 mb-6">No settings available yet.</p>
        </div>
        {/* Admin see Invite UI */}
        {role === "admin" && (
          <div className="bg-white border rounded-lg p-5 shadow-sm">
            <div className="text-lg font-semibold mb-3">Invite User</div>
            <form
              className="flex flex-col sm:flex-row items-start sm:items-end gap-3"
              onSubmit={e => {
                e.preventDefault();
                setInviteLoading(true);
                setTimeout(() => {
                  setInviteLoading(false);
                  setInviteEmail("");
                  toast({ title: "Invitation created (UI only)" });
                }, 900);
              }}
            >
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1" htmlFor="inviteEmail">Email</label>
                <Input
                  id="inviteEmail"
                  type="email"
                  placeholder="user@email.com"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  required
                  className="max-w-xs"
                />
              </div>
              <Button
                type="submit"
                disabled={inviteLoading || !inviteEmail}
                className="min-w-[120px] mt-2 sm:mt-0"
              >
                {inviteLoading ? "Inviting..." : "Invite"}
              </Button>
            </form>
            <div className="mt-2 text-xs text-gray-400">
              (This is demo UI only - no email is sent!)
            </div>
          </div>
        )}
      </div>
    );
  } else {
    content = <div>Section not found.</div>;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-100">
      <AccountSidebar
        activeSection={section}
        onSelectSection={setSection}
        showInvitations={false}
      />
      <div className="flex-1 p-10">
        {content}
      </div>
    </div>
  );
};

export default Account;

