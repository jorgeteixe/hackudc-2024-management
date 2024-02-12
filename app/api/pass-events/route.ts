import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: passEvents } = await supabase.from("pass_event").select();

  if (!passEvents) {
    return new Response("Not found", {
      status: 404,
    });
  }

  return NextResponse.json(passEvents);
}
