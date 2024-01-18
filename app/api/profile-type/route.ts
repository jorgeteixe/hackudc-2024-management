import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const id = requestUrl.searchParams.get("id");

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: profileType } = await supabase
    .from("profile_type")
    .select()
    .eq("id", id)
    .limit(1)
    .single();

  if (!id) {
    return new Response("You must specify an id", {
      status: 400,
    });
  }

  if (!profileType) {
    return new Response("Not found", {
      status: 404,
    });
  }

  return NextResponse.json(profileType);
}
