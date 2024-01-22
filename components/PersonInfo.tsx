"use client";
import { Database } from "@/types/supabase";
import {
  IconUserCode,
  IconUserCog,
  IconUserHexagon,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import MentorInfoByEmail from "./MentorInfoByEmail";
import ParticipantInfoByEmail from "./ParticipantInfoByEmail";
import ShowValue from "./ShowValue";
import SponsorInfoByEmail from "./SponsorInfoByEmail";

type Person = Database["public"]["Tables"]["person"]["Row"];
type FoodRestriction = Database["public"]["Tables"]["food_restriction"]["Row"];
type ProfileType = Database["public"]["Tables"]["profile_type"]["Row"];

export default function PersonInfo(props: { person: Person }) {
  let icon;
  let extraInfo;

  const [foodRestriction, setFoodRestriction] = useState<
    FoodRestriction | undefined
  >();
  const [profileType, setProfileType] = useState<ProfileType | undefined>();

  useEffect(() => {
    setFoodRestriction(undefined);
    setProfileType(undefined);

    fetch(`/api/food-restriction?id=${props.person.food_restriction}`).then(
      async (data) => {
        if (data.status === 200) {
          const result = await data.json();
          setFoodRestriction(result);
        } else {
          setFoodRestriction(undefined);
        }
      }
    );

    fetch(`/api/profile-type?id=${props.person.type}`).then(async (data) => {
      if (data.status === 200) {
        const result = await data.json();
        setProfileType(result);
      } else {
        setProfileType(undefined);
      }
    });
  }, [props.person]);

  switch (profileType?.name) {
    case "Participante":
      icon = <IconUserCode size={100} className="mx-auto" />;
      extraInfo = <ParticipantInfoByEmail email={props.person.email} />;
      break;
    case "Sponsor":
      icon = <IconUserHexagon size={100} className="mx-auto" />;
      extraInfo = <SponsorInfoByEmail email={props.person.email} />;
      break;
    case "Mentor":
      icon = <IconUserCog size={100} className="mx-auto" />;
      extraInfo = <MentorInfoByEmail email={props.person.email} />;
      break;
  }

  return (
    <div>
      {icon || <div className="h-[100px]"></div>}
      <div className="flex flex-col gap-3 mb-3">
        <ShowValue name="Nombre" value={props.person.name} />
        <ShowValue name="📧 Email" value={props.person.email} />
        <ShowValue
          name="🥪 Restr. alimentarias"
          value={foodRestriction?.content}
        />
        <ShowValue name="🪪 DNI" value={props.person.dni || undefined} />
      </div>
      {extraInfo}
    </div>
  );
}
