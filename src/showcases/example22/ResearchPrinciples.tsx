type ResearchPrinciplesProps = {
  label: string;
  title: string;
  principles: Array<{ name: string; description: string }>;
};

export function ResearchPrinciples({
  label,
  title,
  principles,
}: ResearchPrinciplesProps) {
  return (
    <section className="e22-about" id="about" aria-labelledby="about-title">
      <div className="e22-about-intro">
        <p className="e22-eyebrow">{label}</p>
        <h2 id="about-title">{title}</h2>
      </div>
      <div className="e22-principles">
        {principles.map((principle, index) => (
          <div key={principle.name}>
            <b>{String(index + 1).padStart(2, "0")}</b>
            <strong>{principle.name}</strong>
            <p>{principle.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
