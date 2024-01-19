import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import InternalError from "./InternalError";
import Loading from "./Loading";
import NotFound from "./NotFound";
import ParticipantInfo from "./ParticipantInfo";

type Participant = Database["public"]["Tables"]["participant_profile"]["Row"];

export default function ParticipantInfoByEmail(props: { email: string }) {
  const [participant, setParticipant] = useState<Participant>();
  const [error, setError] = useState<undefined | number>();

  useEffect(() => {
    setParticipant(undefined);
    setError(undefined);

    fetch(`/api/participant?email=${props.email}`)
      .then(async (data) => {
        if (data.status === 200) {
          const result = await data.json();
          setParticipant(result);
        } else {
          setError(data.status);
        }
      })
      .catch(() => {
        setError(500);
      });
  }, [props.email]);

  let content;

  if (error === 404) {
    content = <NotFound />;
  } else if (error) {
    content = <InternalError />;
  } else if (!participant) {
    content = <Loading />;
  } else {
    content = <ParticipantInfo participant={participant} />;
  }

  return <div>{content}</div>;
}
