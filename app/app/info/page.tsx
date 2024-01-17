"use client";
import { useState } from "react";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import Title from "@/components/Title";
import Modal from "@/components/Modal"; // Import or define your modal component

export default function Page() {
  const [result, setResult] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBarcodeDetected = (newCode: string) => {
    if (!isModalOpen) {
      fetch(`/api/participant?code=${newCode}`)
        .then((res) => res.json())
        .then((data) => {
          setResult(data);
        });
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 mt-5">
      <Title title="Información QR" />
      <div>
        <BarcodeScanner callback={handleBarcodeDetected} />
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <pre>{result.Email}</pre>
        </Modal>
      )}
    </div>
  );
}
