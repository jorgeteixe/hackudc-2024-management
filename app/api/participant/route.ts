import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: participant } = await supabase
    .from("participants")
    .select()
    .eq("Email", code)
    .limit(1);

  if (!code) {
    return new Response("You must specify a code", {
      status: 400,
    });
  }

  if (!participant) {
    return new Response("Not found", {
      status: 404,
    });
  }

  return NextResponse.json(participant[0]);
}
