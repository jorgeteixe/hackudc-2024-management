import { IconError404 } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <div>
      <IconError404 size={100} className="mx-auto" />
      <p className="text-center">No encontrado</p>
    </div>
  );
}
