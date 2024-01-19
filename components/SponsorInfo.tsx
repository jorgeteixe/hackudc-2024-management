import { Database } from "@/types/supabase";
import ShowValue from "./ShowValue";

type Sponsor = Database["public"]["Tables"]["sponsor_profile"]["Row"];

export default function SponsorInfo(props: { sponsor: Sponsor }) {
  return (
    <div>
      <ShowValue name="🏢 Empresa" value={props.sponsor.company} />
    </div>
  );
}
