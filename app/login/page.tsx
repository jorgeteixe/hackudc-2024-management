import { createClient } from "@/utils/supabase/server";
import { IconChevronLeft } from "@tabler/icons-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/");

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=No se ha podido iniciar sesión");
    }

    return redirect("/app");
  };

  return (
    <div className="min-h-screen mt-16">
      <Link
        href="/"
        className="py-2 rounded-md no-underline inline-flex items-center group text-sm"
      >
        <IconChevronLeft
          size={20}
          className="transition-transform group-hover:-translate-x-1"
        />{" "}
        Volver
      </Link>

      <form
        className="animate-in flex flex-col w-full justify-center gap-2 mt-5"
        action={signIn}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          id="email"
          name="email"
          placeholder="nombre.apellido@gpul.org"
          required
        />
        <label className="text-md" htmlFor="password">
          Contraseña
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 transition-colors rounded-md px-4 py-2 text-white mb-2 w-full"
        >
          Login
        </button>
        {searchParams?.message && (
          <p className="mt-4 p-4 text-center ">{searchParams.message}</p>
        )}
      </form>
    </div>
  );
}
