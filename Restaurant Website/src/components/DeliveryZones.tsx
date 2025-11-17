import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";

const DeliveryZones = () => {
  const { zones, loading } = useSettings();

  if (loading) {
    return (
      <section className="container py-16 md:py-24">
        <div className="text-center">
          <p className="text-muted-foreground">Chargement des zones...</p>
        </div>
      </section>
    );
  }

  // Group zones into rows of 4
  const rows: string[][] = [];
  for (let i = 0; i < zones.length; i += 4) {
    rows.push(zones.slice(i, i + 4).map(z => z.name.toUpperCase()));
  }

  return (
    <section className="container py-16 md:py-24">
      <div className="text-center">
        <p className="mb-4 text-lg font-semibold text-primary">Villes</p>
        <h2 className="mb-12 text-3xl font-black md:text-4xl">
          ZONES DE LIVRAISON
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
          Nous livrons des repas frais et savoureux dans les villes suivantes :
        </p>
      </div>

      <div className="mx-auto max-w-4xl space-y-4">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {row.map((city) => (
              <Button
                key={city}
                className="h-14 rounded-full bg-primary text-base font-bold hover:bg-primary-dark"
              >
                {city}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DeliveryZones;
