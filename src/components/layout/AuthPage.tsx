
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const AuthPage = () => {
  const { user, isLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Welcome!" });
      }
    } else {
      // Always use correct redirect URL!
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { emailRedirectTo: redirectUrl },
      });
      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Check your email to confirm sign up." });
      }
    }
    setLoading(false);
  };

  if (isLoading) return <div className="text-center pt-10 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded shadow-md p-8 w-full max-w-sm space-y-6">
        <h2 className="text-2xl font-bold text-center">{isLogin ? "Login" : "Sign Up"}</h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-semibold">Email</label>
            <Input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              autoComplete="username"
              required
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Password</label>
            <Input
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
              placeholder="********"
            />
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "..." : isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
        <div className="text-center text-sm">
          {isLogin ? (
            <>
              New here?{" "}
              <button className="underline text-blue-600" onClick={() => setIsLogin(false)}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Have an account?{" "}
              <button className="underline text-blue-600" onClick={() => setIsLogin(true)}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
