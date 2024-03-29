import Image from "next/image";
import Link from "next/link";
import hackUDCLogo from "../assets/logo.svg";

export default function HackUDCLogo() {
  return (
    <Link href="/app">
      <span className="flex gap-2 font-semibold">
        <Image src={hackUDCLogo} height={30} alt="HackUDC Logo" />{" "}
        <span style={{ lineHeight: "30px" }}>HackUDC</span>
      </span>
    </Link>
  );
}
