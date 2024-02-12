import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const event = requestUrl.searchParams.get("event");

  try {
    const { accreditation } = await request.json();

    if (!event || !accreditation) {
      return new Response("You must specify a event and an accreditation", {
        status: 400,
      });
    }

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase
      .from("pass")
      .insert({ accreditation, event });

    const { data: passes } = await supabase
      .from("pass")
      .select()
      .eq("accreditation", accreditation)
      .eq("event", event);

    if (error || !passes) {
      console.log(error);
      return new Response("An error ocurred", {
        status: 500,
      });
    }

    return NextResponse.json({ count: passes.length });
  } catch {
    return new Response("You must specify a event and an accreditation", {
      status: 400,
    });
  }
}
