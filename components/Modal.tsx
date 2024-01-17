import { ReactNode } from "react";
import CloseIcon from "./CloseIcon";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal(props: ModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative p-4 bg-white rounded-lg shadow-lg w-80 mx-auto">
        <div className="flex justify-end pb-3">
          <button className="cursor-pointer z-50" onClick={props.onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="mb-4">{props.children}</div>
      </div>
    </div>
  );
}
