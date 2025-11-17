import { CheckCircle, Crown, Beef, Leaf } from "lucide-react";

const badges = [
  { icon: CheckCircle, text: "RECETTES AUTHENTIQUES" },
  { icon: Crown, text: "QUALITÉ PREMIUM" },
  { icon: Beef, text: "VIANDE DE QUALITÉ" },
  { icon: Leaf, text: "100% NATUREL" },
];

const QualityBadges = () => {
  return (
    <section className="w-full bg-muted py-8">
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-bold md:text-xl">ON S'ENGAGE À VOUS OFFRIR :</h3>
          <div className="flex flex-wrap items-center justify-end gap-8">
            {badges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="rounded-full bg-muted-foreground/10 p-2">
                  <badge.icon className="h-6 w-6 text-muted-foreground" />
                </div>
                <span className="hidden text-sm font-semibold md:inline">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityBadges;
