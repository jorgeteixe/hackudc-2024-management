"use client";
import CheckinAbstract from "@/components/CheckinAbstract";
import InternalError from "@/components/InternalError";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import SetDNI from "@/components/SetDNI";
import Title from "@/components/Title";
import { Database } from "@/types/supabase";
import { IconQrcode, IconScan } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Person = Database["public"]["Tables"]["person"]["Row"];
type Accreditation = Database["public"]["Tables"]["accreditation"]["Row"];

export default function Page({ params }: { params: { email: string } }) {
  const email = decodeURIComponent(params.email);

  const router = useRouter();

  const [person, setPerson] = useState<Person>();
  const [accreditation, setAccreditation] = useState<
    Accreditation | undefined
  >();
  const [error, setError] = useState<undefined | number>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Reset states when email changes
    setPerson(undefined);
    setError(undefined);

    fetch(`/api/person?email=${email}`)
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

    fetch(`/api/accreditation?email=${email}`)
      .then(async (data) => {
        if (data.status === 200) {
          const result = await data.json();
          setAccreditation(result);
        } else if (data.status !== 404) {
          setError(data.status);
        }
      })
      .catch(() => {
        setError(500);
      });
  }, [email]);

  let content;

  if (error === 404) {
    content = <NotFound />;
  } else if (error) {
    content = <InternalError />;
  } else if (!person) {
    content = <Loading />;
  }

  async function assignDni(dni: string) {
    setLoading(true);
    const res = await fetch(`/api/person/assign-dni?email=${person?.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dni }),
    });
    if (person && res.status === 200) {
      person.dni = dni;
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-4 mt-5">
      <Title title="Acreditación" />
      {person ? (
        <div className="text-xl text-center">
          <p>{person.name}</p>
          <p className="mb-2">{person.email}</p>
          <CheckinAbstract person={person} />
          <p className="mt-2">Registrado: {person.dni ? "SI ✅" : "NO ❌"}</p>
          {person.dni ? (
            <>
              <p className="text-xl">DNI: {person.dni}</p>
            </>
          ) : (
            <div className="mt-4 mb-10">
              <SetDNI handler={assignDni} loading={loading} />
            </div>
          )}

          {accreditation ? (
            <p className="text-xl mt-5">Acc.: {accreditation?.uuid}</p>
          ) : (
            <button
              className="mt-2 bg-green-700 hover:bg-green-800 transition-colors rounded-md px-4 py-2 text-white w-full flex justify-center"
              onClick={() => router.push(`/app/checkin/${person.email}/qr`)}
            >
              Asignar QR <IconQrcode className="ml-2" />
            </button>
          )}

          {person.dni && accreditation && (
            <button
              className="mt-5 bg-green-700 hover:bg-green-800 transition-colors rounded-md px-4 py-2 text-white w-full flex justify-center"
              onClick={() => router.push(`/app/checkin`)}
            >
              Acreditar otr@ <IconScan className="ml-2" />
            </button>
          )}
        </div>
      ) : (
        content
      )}
    </div>
  );
}
