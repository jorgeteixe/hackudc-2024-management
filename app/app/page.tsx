import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

const options = [
  { name: "Acreditaciones", href: "checkin" },
  { name: "Pases de comida", href: "foodpass" },
  { name: "Infomación QR", href: "info" },
];

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return (
    <div className="flex flex-col gap-4 mt-5">
      {options.map((opt) => {
        return (
          <Link href={`/app/${opt.href}`} key={opt.href}>
            <div className="border rounded-md text-center hover:bg-gray-50 transition-colors h-16 flex flex-col justify-center text-xl">
              <p>{opt.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
