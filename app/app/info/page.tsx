"use client";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import Title from "@/components/Title";
import { useState } from "react";

export default function Page() {
  const [result, setResult] = useState("");

  return (
    <div className="flex flex-col gap-4 mt-5">
      <Title title="Información QR" />
      <div className="">
        <BarcodeScanner callback={setResult} />
      </div>
      <div>Code: {result}</div>
    </div>
  );
}
