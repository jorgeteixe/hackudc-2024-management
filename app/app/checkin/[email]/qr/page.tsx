"use client";
import BarcodeScanner from "@/components/BarcodeScanner";
import InternalError from "@/components/InternalError";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import NotFound from "@/components/NotFound";
import Title from "@/components/Title";
import { Database } from "@/types/supabase";
import { IconLoader, IconQrcode } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Person = Database["public"]["Tables"]["person"]["Row"];

export default function Page({ params }: { params: { email: string } }) {
  const email = decodeURIComponent(params.email);

  const router = useRouter();

  const [uuid, setUuid] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState(false);
  const [person, setPerson] = useState<Person>();
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
  }, [email]);

  let content;

  if (error === 404) {
    content = <NotFound />;
  } else if (error) {
    content = <InternalError />;
  } else if (!person) {
    content = <Loading />;
  }

  async function assignAccreditation() {
    if (!uuid || !person) return;
    setLoading(true);
    const res = await fetch(`/api/accreditation/assign-email?uuid=${uuid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: person.email }),
    });
    if (res.status !== 200) {
      setError(res.status);
    }
    router.push(`/app/checkin/${email}`);
    setLoading(false);
  }

  function codeHandler(uuid: string) {
    if (modalOpen) return;
    setModalOpen(true);
    setUuid(uuid);
  }

  function handleModalClose() {
    setModalOpen(false);
    setUuid(undefined);
  }

  return (
    <div className="flex flex-col gap-4 mt-5">
      <Title title="Acreditación" />
      {person ? (
        <div className="text-center">
          <p>{person.name}</p>
          <p className="mb-2">{person.email}</p>
          <BarcodeScanner callback={codeHandler} />
          {modalOpen && (
            <Modal title={person.name} onClose={handleModalClose}>
              <p className="text-3xl">{uuid}</p>
              <button
                className="mt-2 bg-green-700 hover:bg-green-800 transition-colors rounded-md px-4 py-2 text-white w-full flex justify-center"
                onClick={assignAccreditation}
              >
                {loading && <IconLoader className="animate-spin" />} Asignar{" "}
                <IconQrcode className="ml-2" />
              </button>
            </Modal>
          )}
        </div>
      ) : (
        content
      )}
    </div>
  );
}
