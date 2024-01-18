export default function ShowValue(props: { name: string; value: string }) {
  return (
    <div>
      <p className="uppercase text-xs tracking-tighter text-gray-600 font-bold">
        {props.name}:
      </p>
      <p>{props.value}</p>
    </div>
  );
}
