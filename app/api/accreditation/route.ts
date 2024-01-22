import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const uuid = requestUrl.searchParams.get("uuid");

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: person } = await supabase
    .from("accreditation")
    .select()
    .eq("uuid", uuid)
    .limit(1)
    .single();

  if (!uuid) {
    return new Response("You must specify an uuid", {
      status: 400,
    });
  }

  if (!person) {
    return new Response("Not found", {
      status: 404,
    });
  }

  return NextResponse.json(person);
}
