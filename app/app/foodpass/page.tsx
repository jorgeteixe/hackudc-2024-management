"use client";
import BarcodeScanner from "@/components/BarcodeScanner";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import Title from "@/components/Title";
import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";

type Event = Database["public"]["Tables"]["pass_event"]["Row"];

export default function Page() {
  let modalContent;

  const [events, setEvents] = useState<Event[]>([]);
  const [event, setEvent] = useState<string>();
  const [count, setCount] = useState<number | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBarcodeDetected = (code: string) => {
    if (!isModalOpen) {
      setCount(undefined);
      setIsModalOpen(true);
      fetch(`/api/pass-accreditation?event=${event}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accreditation: code }),
      }).then(async (data): Promise<void> => {
        if (data.status === 200) {
          const result = await data.json();
          setIsModalOpen(true);
          setCount(result.count);
        }
      });
    }
  };

  const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEvent(event.target.value);
  };

  useEffect(() => {
    setEvents([]);
    setEvent(undefined);

    fetch(`/api/pass-events`).then(async (data): Promise<void> => {
      if (data.status === 200) {
        const result = await data.json();
        setEvents(result);
        setEvent(result[0].id);
      }
    });
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isModalOpen) {
    if (count) {
      modalContent =
        count === 1 ? (
          <p className="text-[150px] text-center text-green-600 font-bold">
            {count}
          </p>
        ) : (
          <p className="text-[150px] text-center text-orange-500 font-bold">
            {count}
          </p>
        );
    } else {
      modalContent = <Loading />;
    }
  }

  return (
    <div className="flex flex-col gap-4 mt-5">
      <Title title="Pases de comida" />
      <div>
        {event && events.length > 0 && (
          <select
            onChange={handleEventChange}
            value={event}
            className="bg-white border border-gray-300 w-full mb-2 rounded-md shadow-sm p-2 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name || "Camera"}
              </option>
            ))}
          </select>
        )}
      </div>
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
