"use client";

import { IconLoader } from "@tabler/icons-react";
import { FormEvent } from "react";

export default function SetDNI(props: {
  handler: (dni: string) => void;
  loading: boolean;
}) {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const dniValue = formData.get("dni");
    if (typeof dniValue === "string") {
      props.handler(dniValue);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          id="dni"
          type="text"
          name="dni"
          placeholder="0000000X"
          disabled={props.loading}
          required
          className="bg-white border border-gray-300 w-full rounded-md shadow-sm p-2 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-200"
        />
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 transition-colors rounded-md px-4 py-2 text-white w-full flex justify-center"
        >
          {props.loading && <IconLoader className="animate-spin" />} Assignar
          DNI
        </button>
      </form>
    </div>
  );
}
