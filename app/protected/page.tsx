import { createClient } from "@/utils/supabase/server";;
import { redirect } from "next/navigation";
import AuthButton from "@/components/AuthButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/components/Home";

export default async function ProtectedPage() {
  const supabase = createClient();;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3 w-full">
        <Header title="Welcome App Notes!!!" />
        <main className="flex-1 flex flex-col gap-6">
          <Home />
        </main>
      </div>
      <Footer />
    </div>
  );
}
