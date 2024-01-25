import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const uuid = requestUrl.searchParams.get("uuid");
  const email = requestUrl.searchParams.get("email");

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if ((!uuid && !email) || (uuid && email)) {
    return new Response("You must specify an uuid or an email", {
      status: 400,
    });
  }

  let accreditation;

  if (uuid) {
    const { data } = await supabase
      .from("accreditation")
      .select()
      .eq("uuid", uuid)
      .limit(1)
      .single();
    accreditation = data;
  } else {
    const { data } = await supabase
      .from("accreditation")
      .select()
      .eq("email", email)
      .limit(1)
      .single();
    accreditation = data;
  }

  if (!accreditation) {
    return new Response("Not found", {
      status: 404,
    });
  }

  return NextResponse.json(accreditation);
}
