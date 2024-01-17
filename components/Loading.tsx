import { IconLoader } from "@tabler/icons-react";

export default function Loader() {
  return (
    <div>
      <IconLoader size={100} className="mx-auto animate-spin" />
      <p className="text-center">Cargando...</p>
    </div>
  );
}
