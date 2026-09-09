type StoryHighlightsProps = {
  label: string;
  title: string;
  description: string;
  highlights: string[];
};

export function StoryHighlights({
  label,
  title,
  description,
  highlights,
}: StoryHighlightsProps) {
  return (
    <section className="e18-story" id="story" aria-labelledby="e18-story-title">
      <p className="e18-eyebrow">{label}</p>
      <h2 id="e18-story-title">{title}</h2>
      <p>{description}</p>
      <div className="e18-stats">
        {highlights.map((highlight, index) => (
          <span key={highlight}>
            <b>{String(index + 1).padStart(2, "0")}</b> {highlight}
          </span>
        ))}
      </div>
    </section>
  );
}
