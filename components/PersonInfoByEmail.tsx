import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import InternalError from "./InternalError";
import Loading from "./Loading";
import NotFound from "./NotFound";
import PersonInfo from "./PersonInfo";

type Person = Database["public"]["Tables"]["person"]["Row"];

export default function PersonInfoByEmail(props: { email: string }) {
  const [person, setPerson] = useState<Person>();
  const [error, setError] = useState<undefined | number>();

  useEffect(() => {
    // Reset states when email changes
    setPerson(undefined);
    setError(undefined);

    fetch(`/api/person?email=${props.email}`)
      .then(async (data) => {
        if (data.status === 200) {
          const result = await data.json();
          setPerson(result);
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
  } else if (!person) {
    content = <Loading />;
  } else {
    content = <PersonInfo person={person} />;
  }

  return <div>{content}</div>;
}
