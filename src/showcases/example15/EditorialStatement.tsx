type EditorialStatementProps = {
  label: string;
  title: string;
  body: string;
};

export function EditorialStatement({ label, title, body }: EditorialStatementProps) {
  return (
    <section className="e15-statement" id="studio" aria-labelledby="e15-statement-title">
      <p className="e15-kicker">{label}</p>
      <div>
        <h2 id="e15-statement-title">{title}</h2>
        <p>{body}</p>
      </div>
    </section>
  );
}
