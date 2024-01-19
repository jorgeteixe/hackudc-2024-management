export default function ShowValue(props: {
  name: string;
  value?: string;
  href?: string;
}) {
  return (
    <div>
      <p className="uppercase text-xs tracking-tighter text-gray-600 font-bold">
        {props.name}:
      </p>
      {props.href ? (
        <a
          href={props.href}
          target="_blank"
          className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline"
        >
          {props.value || <span>&nbsp;</span>}
        </a>
      ) : (
        <p>{props.value || <span>&nbsp;</span>}</p>
      )}
    </div>
  );
}
