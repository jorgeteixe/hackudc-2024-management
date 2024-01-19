import { Database } from "@/types/supabase";
import ShowValue from "./ShowValue";

type Mentor = Database["public"]["Tables"]["mentor_profile"]["Row"];

export default function MentorInfo(props: { mentor: Mentor }) {
  return (
    <div className="flex flex-col gap-3">
      <ShowValue name="👕 Talla" value={props.mentor.shirt_size} />
      <ShowValue
        name="🏢 Alojamiento"
        value={props.mentor.sleep ? "SI" : "NO"}
      />
      {props.mentor.share_cv && (
        <ShowValue
          name="CV"
          value="Enlace DRIVE"
          href={props.mentor.cv_link || ""}
        />
      )}
      <ShowValue
        name="📝 Observaciones"
        value={props.mentor.notes || undefined}
      />
    </div>
  );
}
