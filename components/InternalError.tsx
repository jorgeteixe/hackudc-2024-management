import { IconCircleX } from "@tabler/icons-react";

export default function InternalError() {
  return (
    <div>
      <IconCircleX color="red" size={100} className="mx-auto" />
      <p className="text-center">Error interno</p>
    </div>
  );
}
