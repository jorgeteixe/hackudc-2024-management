import { IconUser } from "@tabler/icons-react";

interface ParticipantModalProps {
  name: string;
}

export default function ParticipantModalInfo(props: ParticipantModalProps) {
  return (
    <div>
      <IconUser size={100} className="mx-auto" />
      <p className="text-center">{props.name}</p>
    </div>
  );
}
