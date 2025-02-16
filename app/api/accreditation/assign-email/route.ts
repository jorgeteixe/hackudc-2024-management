import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const uuid = requestUrl.searchParams.get("uuid");

  const { email } = await request.json();

  if (!uuid || !email) {
    return new Response("You must specify both uuid and email", {
      status: 400,
    });
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data } = await supabase
      .from("accreditation")
      .select()
      .eq("uuid", uuid)
      .limit(1)
      .single();

    if (data.email != null) {
      return new Response("UUID already in use", { status: 400 });
    }

    await supabase.from("accreditation").update({ email }).eq("uuid", uuid);
  } catch (e) {
    return new Response("An error ocurred", {
      status: 500,
    });
  }

  return new Response("Success", { status: 200 });
}
