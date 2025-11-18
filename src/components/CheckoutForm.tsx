import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

export interface CheckoutData {
  fullName: string;
  phone: string;
  address: string;
}

const CheckoutForm = ({ onSubmit, isSubmitting, onCancel }: CheckoutFormProps) => {
  const [formData, setFormData] = useState<CheckoutData>({
    fullName: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState<Partial<CheckoutData>>({});

  const validateForm = () => {
    const newErrors: Partial<CheckoutData> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Nom complet requis";
    if (!formData.phone.trim()) newErrors.phone = "Numéro de téléphone requis";
    if (!formData.address.trim()) newErrors.address = "Adresse complète requise";

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
          value={formData.fullName || ''}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="Jean Dupont"
          className={errors.fullName ? "border-destructive" : ""}
        />
        {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Numéro de téléphone *</Label>
        <PhoneInput
          international
          defaultCountry="CA"
          value={formData.phone}
          onChange={(phone) => setFormData({ ...formData, phone: phone || "" })}
          className={`phone-input-wrapper ${errors.phone ? "border-destructive" : ""}`}
        />
        {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Adresse complète de livraison *</Label>
        <Input
          id="address"
          value={formData.address || ''}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="123 Rue Example, Montréal, QC H2X 1Y7"
          className={errors.address ? "border-destructive" : ""}
        />
        {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
        <p className="text-xs text-muted-foreground">
          Incluez le numéro, rue, ville et code postal
        </p>
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
