import AuthButton from "./AuthButton";
import HackUDCLogo from "./HackUDCLogo";

export default function Header() {
  return (
    <div className="flex justify-between">
      <HackUDCLogo />
      <AuthButton />
    </div>
  );
}
