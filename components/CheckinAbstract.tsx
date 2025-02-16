"use client";

import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";

type Person = Database["public"]["Tables"]["person"]["Row"];
type Mentor = Database["public"]["Tables"]["mentor_profile"]["Row"];
type Sponsor = Database["public"]["Tables"]["sponsor_profile"]["Row"];
type Participant = Database["public"]["Tables"]["participant_profile"]["Row"];

export default function CheckinAbstract(props: { person: Person }) {
  const person = props.person;

  const [data, setData] = useState<{ key: string; value: string }[]>([]);

  useEffect(() => {
    switch (person.type) {
      case 1: // mentor
        fetch(`/api/mentor?email=${person.email}`)
          .then((d) => d.json())
          .then((d: Mentor) => {
            setData([
              { key: "Tipo", value: "Mentor" },
              { key: "Talla", value: d.shirt_size },
            ]);
          });
        break;
      case 2: // sponsor
        fetch(`/api/sponsor?email=${person.email}`)
          .then((d) => d.json())
          .then((d: Sponsor) => {
            setData([
              { key: "Tipo", value: "Sponsor" },
              { key: "Company", value: d.company },
            ]);
          });
        break;
      case 3: // participante
        fetch(`/api/participant?email=${person.email}`)
          .then((d) => d.json())
          .then((d: Participant) => {
            setData([
              { key: "Tipo", value: "Participante" },
              { key: "Créditos", value: d.credits ? "SI ✅" : "NO ❌" },
              { key: "Talla", value: d.shirt_size },
            ]);
          });
        break;
    }
  }, [person]);

  return (
    <div>
      {data.map((d) => (
        <p>
          {d.key}: {d.value}
        </p>
      ))}
    </div>
  );
}
