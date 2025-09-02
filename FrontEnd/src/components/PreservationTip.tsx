import tips from "@/data/preservationTips.json";

interface Props {
  ingredient: string;
}

const PreservationTip = ({ ingredient }: Props) => {
  const tip = tips[ingredient.toLowerCase()];

  if (!tip) return null;

  return (
    <div className="mt-2 p-3 bg-muted rounded-2xl shadow">
      <p className="text-sm text-muted-foreground">
        💡 Preservation tip for <span className="font-semibold">{ingredient}</span>: {tip}
      </p>
    </div>
  );
};

export default PreservationTip;
