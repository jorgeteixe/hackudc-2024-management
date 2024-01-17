"use client";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import InternalError from "@/components/InternalError";
import Loader from "@/components/Loading";
import Modal from "@/components/Modal";
import NotFound from "@/components/NotFound";
import ParticipantModalInfo from "@/components/ParticipantModalInfo";
import Title from "@/components/Title";
import { useState } from "react";

interface Result {
  error?: number;
  participant?: string;
}

export default function Page() {
  let modalContent;
  const [result, setResult] = useState<Result>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBarcodeDetected = (code: string) => {
    if (!isModalOpen) {
      setResult(undefined);
      fetch(`/api/participant?code=${code}`).then((data) => {
        // TODO: add logic to handle correctly error and success
        setResult({
          participant: "John Doe",
        });
      });
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isModalOpen) {
    if (!result) {
      modalContent = <Loader />;
    } else {
      if (result.error === 404) {
        modalContent = <NotFound />;
      }
      if (result.error) {
        modalContent = <InternalError />;
      }
      if (result.participant) {
        modalContent = <ParticipantModalInfo name={result.participant} />;
      }
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
