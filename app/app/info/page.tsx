"use client";
import BarcodeScanner from "@/components/BarcodeScanner";
import InternalError from "@/components/InternalError";
import Loader from "@/components/Loading";
import Modal from "@/components/Modal";
import NotFound from "@/components/NotFound";
import PersonInfoByEmail from "@/components/PersonInfoByEmail";
import Title from "@/components/Title";
import { Database } from "@/types/supabase";
import { useState } from "react";

type Accreditation = Database["public"]["Tables"]["accreditation"]["Row"];

export default function Page() {
  let modalContent;
  const [email, setEmail] = useState<string | undefined>();
  const [error, setError] = useState<number | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBarcodeDetected = (code: string) => {
    if (!isModalOpen) {
      setEmail(undefined);
      setError(undefined);
      fetch(`/api/accreditation?uuid=${code}`)
        .then(async (data) => {
          if (data.status === 200) {
            const result = (await data.json()) as Accreditation;
            if (result.email) {
              setEmail(result.email);
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
    } else if (!email) {
      modalContent = <Loader />;
    } else {
      modalContent = <PersonInfoByEmail email={email} />;
    }
  }

  return (
    <div className="flex flex-col gap-4 mt-5">
      <Title title="Información QR" />
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
