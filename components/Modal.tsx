import { IconX } from "@tabler/icons-react";
import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  title?: string;
  onClose: () => void;
}

export default function Modal(props: ModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative pb-4 bg-white rounded-lg shadow-lg w-11/12 sm:max-w-screen-sm mx-auto max-h-screen overflow-y-scroll">
        <div className="flex justify-between pb-3 pt-4 rounded-t-lg border-b bg-slate-100">
          <div className="pl-4">{props.title}</div>
          <button className="cursor-pointer z-50 pr-4" onClick={props.onClose}>
            <IconX />
          </button>
        </div>
        <div className="p-4 pb-0">{props.children}</div>
      </div>
    </div>
  );
}
