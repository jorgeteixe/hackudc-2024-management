import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const email = requestUrl.searchParams.get("email");

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: person } = await supabase
    .from("participant_profile")
    .select()
    .eq("email", email)
    .limit(1)
    .single();

  if (!email) {
    return new Response("You must specify an email", {
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
