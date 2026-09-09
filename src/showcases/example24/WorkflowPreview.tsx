type WorkflowPreviewProps = {
  isPlaying: boolean;
  image: string;
  onToggle: () => void;
  title: string;
  description: string;
  playingTitle: string;
  playingDescription: string;
  playLabel: string;
  pauseLabel: string;
};

export function WorkflowPreview({
  isPlaying,
  image,
  onToggle,
  title,
  description,
  playingTitle,
  playingDescription,
  playLabel,
  pauseLabel,
}: WorkflowPreviewProps) {
  return (
    <div className={`e24-hero-art${isPlaying ? " is-playing" : ""}`}>
      <img src={image} alt={title} />
      <button
        className="e24-play"
        type="button"
        onClick={onToggle}
        aria-label={isPlaying ? pauseLabel : playLabel}
        aria-pressed={isPlaying}
      >
        <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
        <span>{isPlaying ? pauseLabel : playLabel}</span>
      </button>
      <div className="e24-caption" aria-live="polite">
        <span aria-hidden="true">01</span>
        <b>{isPlaying ? playingTitle : title}</b>
        <small>{isPlaying ? playingDescription : description}</small>
        <div className="e24-progress" aria-hidden="true"><span /></div>
      </div>
    </div>
  );
}
