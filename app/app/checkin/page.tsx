"use client";
import BarcodeScanner from "@/components/BarcodeScanner";
import InternalError from "@/components/InternalError";
import Loader from "@/components/Loading";
import Modal from "@/components/Modal";
import NotFound from "@/components/NotFound";
import Title from "@/components/Title";
import { Database } from "@/types/supabase";
import {
  IconUserCode,
  IconUserCog,
  IconUserHexagon,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Person = Database["public"]["Tables"]["person"]["Row"];

export default function Page() {
  let modalContent;
  let icon;

  const router = useRouter();
  const [person, setPerson] = useState<Person | undefined>();
  const [error, setError] = useState<number | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBarcodeDetected = (code: string) => {
    if (!isModalOpen) {
      setPerson(undefined);
      setError(undefined);
      fetch(`/api/person?email=${code}`)
        .then(async (data) => {
          if (data.status === 200) {
            const result = (await data.json()) as Person;
            if (result) {
              setPerson(result);
            } else {
              setError(404);
            }
          } else {
            setError(data.status);
          }
        })
        .catch(() => {
          setError(500);
        });
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isModalOpen) {
    if (error === 404) {
      modalContent = <NotFound />;
    } else if (error) {
      modalContent = <InternalError />;
    } else if (!person) {
      modalContent = <Loader />;
    } else {
      switch (person?.type) {
        case 1:
          icon = <IconUserCode size={100} className="mx-auto" />;
          break;
        case 2:
          icon = <IconUserHexagon size={100} className="mx-auto" />;
          break;
        case 3:
          icon = <IconUserCog size={100} className="mx-auto" />;
          break;
      }
      modalContent = (
        <>
          {icon}
          <p className="text-center">{person.name}</p>
          <p className="text-center">{person.email}</p>
          <button
            className="bg-green-700 hover:bg-green-800 transition-colors rounded-md px-4 py-2 text-white mb-2 w-full mt-2"
            onClick={() => router.push(`/app/checkin/${person.email}`)}
          >
            Hacer check-in
          </button>
        </>
      );
    }
  }

  return (
    <div className="flex flex-col gap-4 mt-5">
      <Title title="Acreditación" />
      <div>
        <BarcodeScanner callback={handleBarcodeDetected} />
      </div>
      {isModalOpen && (
        <Modal title="Información" onClose={handleCloseModal}>
          {modalContent}
        </Modal>
      )}
    </div>
  );
}
