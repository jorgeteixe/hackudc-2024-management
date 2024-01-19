import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import InternalError from "./InternalError";
import Loading from "./Loading";
import MentorInfo from "./MentorInfo";
import NotFound from "./NotFound";

type Mentor = Database["public"]["Tables"]["mentor_profile"]["Row"];

export default function MentorInfoByEmail(props: { email: string }) {
  const [mentor, setMentor] = useState<Mentor>();
  const [error, setError] = useState<undefined | number>();

  useEffect(() => {
    setMentor(undefined);
    setError(undefined);

    fetch(`/api/mentor?email=${props.email}`)
      .then(async (data) => {
        if (data.status === 200) {
          const result = await data.json();
          setMentor(result);
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
  } else if (!mentor) {
    content = <Loading />;
  } else {
    content = <MentorInfo mentor={mentor} />;
  }

  return <div>{content}</div>;
}
