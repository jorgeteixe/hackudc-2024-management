import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const email = requestUrl.searchParams.get("email");

  const { dni } = await request.json();

  if (!email || !dni) {
    return new Response("You must specify both dni and email", {
      status: 400,
    });
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    await supabase.from("person").update({ dni }).eq("email", email);
  } catch (e) {
    return new Response("An error ocurred", {
      status: 500,
    });
  }

  return new Response("Success", { status: 200 });
}
