import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

export interface CheckoutData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

const CheckoutForm = ({ onSubmit, isSubmitting, onCancel }: CheckoutFormProps) => {
  const [formData, setFormData] = useState<CheckoutData>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState<Partial<CheckoutData>>({});
  const addressInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (!addressInputRef.current) return;

    // Check if Google Maps API is loaded
    if (typeof google === "undefined" || !google.maps || !google.maps.places) {
      console.warn("Google Maps API not loaded");
      return;
    }

    try {
      autocompleteRef.current = new google.maps.places.Autocomplete(
        addressInputRef.current,
        {
          types: ["address"],
          componentRestrictions: { country: ["ca", "us"] }, // Canada and US
        }
      );

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (!place || !place.address_components) return;

        let street = "";
        let city = "";
        let postalCode = "";

        place.address_components.forEach((component) => {
          const types = component.types;
          if (types.includes("street_number")) {
            street = component.long_name + " ";
          }
          if (types.includes("route")) {
            street += component.long_name;
          }
          if (types.includes("locality")) {
            city = component.long_name;
          }
          if (types.includes("postal_code")) {
            postalCode = component.long_name;
          }
        });

        setFormData((prev) => ({
          ...prev,
          address: street || place.formatted_address || "",
          city: city,
          postalCode: postalCode,
        }));
      });
    } catch (error) {
      console.error("Error initializing Google Places:", error);
    }

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  const validateForm = () => {
    const newErrors: Partial<CheckoutData> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Nom complet requis";
    if (!formData.phone.trim()) newErrors.phone = "Numéro de téléphone requis";
    if (!formData.address.trim()) newErrors.address = "Adresse requise";
    if (!formData.city.trim()) newErrors.city = "Ville requise";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Code postal requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Nom complet *</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="Jean Dupont"
          className={errors.fullName ? "border-destructive" : ""}
        />
        {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Numéro de téléphone *</Label>
        <PhoneInput
          defaultCountry="ca"
          value={formData.phone}
          onChange={(phone) => setFormData({ ...formData, phone })}
          inputClassName={`w-full ${errors.phone ? "border-destructive" : ""}`}
          className="phone-input-custom"
        />
        {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Adresse *</Label>
        <Input
          id="address"
          ref={addressInputRef}
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Commencez à taper votre adresse..."
          className={errors.address ? "border-destructive" : ""}
          autoComplete="off"
        />
        {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
        <p className="text-xs text-muted-foreground">
          💡 L'adresse se complète automatiquement
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Ville *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Montréal"
            className={errors.city ? "border-destructive" : ""}
          />
          {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Code postal *</Label>
          <Input
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            placeholder="H2X 1Y7"
            className={errors.postalCode ? "border-destructive" : ""}
          />
          {errors.postalCode && <p className="text-xs text-destructive">{errors.postalCode}</p>}
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 rounded-full border-2 border-primary py-6 font-bold text-primary hover:bg-primary-light"
          disabled={isSubmitting}
        >
          Retour
        </Button>
        <Button
          type="submit"
          className="flex-1 rounded-full bg-primary py-6 font-bold hover:bg-primary-dark"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Traitement..."
          ) : (
            <>
              <CreditCard className="mr-2 h-5 w-5" />
              Continuer au paiement
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
