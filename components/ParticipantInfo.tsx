import { Database } from "@/types/supabase";
import ShowValue from "./ShowValue";

type Participant = Database["public"]["Tables"]["participant_profile"]["Row"];

export default function ParticipantInfo(props: { participant: Participant }) {
  return (
    <div className="flex flex-col gap-3">
      <ShowValue name="👕 Talla" value={props.participant.shirt_size} />
      <ShowValue
        name="🎫 Créditos"
        value={props.participant.credits ? "SI ✅" : "NO ❌"}
      />
      <ShowValue name="Edad" value={props.participant.age.toString()} />
      <ShowValue name="📍 Ciudad" value={props.participant.city} />
      <ShowValue name="📞 Teléfono" value={props.participant.phone} />
      <ShowValue
        name="Nivel de estudios"
        value={props.participant.study_level}
      />
      <ShowValue
        name="🏫 Institución de estudios"
        value={props.participant.school}
      />
      <ShowValue name="🎓 Nombre estudios" value={props.participant.studies} />
      <ShowValue name="🗓️ Curso" value={props.participant.year?.toString()} />
      <ShowValue
        name="📒 Motivación"
        value={props.participant.motivation || undefined}
      />
      <ShowValue
        name="📝 Observaciones"
        value={props.participant.notes || undefined}
      />
    </div>
  );
}
