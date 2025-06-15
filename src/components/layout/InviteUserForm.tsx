
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { inviteUser } from "@/hooks/useInviteUser";
import { toast } from "@/hooks/use-toast";

const InviteUserForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onInvite = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await inviteUser(email);
    if (error) {
      toast({ title: "Invite Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Invitation Sent", description: "User has been invited." });
      setEmail("");
    }
    setLoading(false);
  };

  return (
    <form className="flex items-center gap-2" onSubmit={onInvite}>
      <Input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        required
        className="max-w-[250px]"
      />
      <Button type="submit" disabled={loading || !email}>
        Invite
      </Button>
    </form>
  );
};

export default InviteUserForm;
