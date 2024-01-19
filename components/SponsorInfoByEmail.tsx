import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import InternalError from "./InternalError";
import Loading from "./Loading";
import NotFound from "./NotFound";
import SponsorInfo from "./SponsorInfo";

type Sponsor = Database["public"]["Tables"]["sponsor_profile"]["Row"];

export default function SponsorInfoByEmail(props: { email: string }) {
  const [sponsor, setSponsor] = useState<Sponsor>();
  const [error, setError] = useState<undefined | number>();

  useEffect(() => {
    // Reset states when email changes
    setSponsor(undefined);
    setError(undefined);

    fetch(`/api/sponsor?email=${props.email}`)
      .then(async (data) => {
        if (data.status === 200) {
          const result = await data.json();
          setSponsor(result);
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
  } else if (!sponsor) {
    content = <Loading />;
  } else {
    content = <SponsorInfo sponsor={sponsor} />;
  }

  return <div>{content}</div>;
}
