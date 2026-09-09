type CommunityFeatureProps = {
  label: string;
  title: string;
  description: string;
  action: string;
  onAction: () => void;
};

export function CommunityFeature({
  label,
  title,
  description,
  action,
  onAction,
}: CommunityFeatureProps) {
  return (
    <header>
      <div>
        <p className="e23-eyebrow">{label}</p>
        <h2 id="e23-hub-title">{title}</h2>
        <p className="e23-hub-intro">{description}</p>
      </div>
      <button className="e23-text-button" onClick={onAction}>
        {action}
      </button>
    </header>
  );
}
