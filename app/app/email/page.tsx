"use client";
import PersonInfoByEmail from "@/components/PersonInfoByEmail";
import Title from "@/components/Title";
import { FormEvent, useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const emailValue = formData.get("email");
    if (typeof emailValue === "string") {
      setEmail(emailValue);
    }
  }

  return (
    <div className="flex flex-col gap-4 mt-5">
      <Title title="Información email" />
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          id="email"
          type="email"
          name="email"
          placeholder="name.surname@example.com"
          required
          className="bg-white border border-gray-300 w-full rounded-md shadow-sm p-2 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 transition-colors rounded-md px-4 py-2 text-white w-full"
        >
          Buscar
        </button>
        {email && <PersonInfoByEmail email={email} />}
      </form>
    </div>
  );
}
