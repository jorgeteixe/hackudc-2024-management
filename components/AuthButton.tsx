import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <div className="flex items-center gap-4">
      {user?.email}
      <form action={signOut}>
        <button className="bg-red-700 hover:bg-red-800 transition-colors rounded-md px-4 py-1 text-white">
          Salir
        </button>
      </form>
    </div>
  );
}
