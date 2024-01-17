import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import hackudcLogo from "../assets/logo.svg";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <Image
          src={hackudcLogo}
          height={200}
          alt="HackUDC Logo"
          priority={false}
        />
      </div>
      <h1 className="text-center my-5 font-semibold text-2xl">
        HackUCD management
      </h1>
      <Link href={user ? "/app" : "/login"}>
        <button className="bg-green-700 hover:bg-green-800 transition-colors rounded-md px-4 py-2 text-white mb-2 w-full">
          {user ? "Ir a la aplicación" : "Iniciar sesión"}
        </button>
      </Link>
    </div>
  );
}
