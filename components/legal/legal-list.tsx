interface LegalListProps {
  items: readonly string[] | string;
}

export function LegalList({ items }: LegalListProps) {
  if (typeof items === "string") {
    return <p>{items}</p>;
  }

  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
