import { useState } from "react";
import { Minus, Plus, Trash2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useOrder } from "@/contexts/OrderContext";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartPopupProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    items: CartItem[];
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemoveItem: (id: number) => void;
}

const CartPopup = ({ open, onOpenChange, items, onUpdateQuantity, onRemoveItem }: CartPopupProps) => {
    const { toast } = useToast();
    const { selectedPlan, numberOfPeople, mealsPerDay } = useOrder();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleStripeCheckout = async () => {
        setIsSubmitting(true);

        try {
            // First, save order to Supabase
            const orderData = {
                plan_id: selectedPlan?.id || null,
                plan_name: selectedPlan?.name || null,
                number_of_people: numberOfPeople || null,
                meals_per_day: mealsPerDay || null,
                items: items.map(item => ({
                    dish_id: item.id,
                    dish_name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                })),
                total: total,
                status: 'pending',
            };

            const { data: orderResult, error } = await supabase
                .from('orders')
                .insert([orderData])
                .select();

            if (error) throw error;

            const orderId = orderResult[0].id;

            // For demo purposes, simulate Stripe payment
            // In production, you would create a Stripe Checkout session here
            toast({
                title: "Mode Test Stripe",
                description: "En production, vous seriez redirigé vers Stripe Checkout.",
            });

            // Simulate successful payment after 2 seconds
            setTimeout(async () => {
                // Update order status
                await supabase
                    .from('orders')
                    .update({ 
                        status: 'paid',
                        stripe_session_id: 'test_session_' + Date.now()
                    })
                    .eq('id', orderId);

                // Clear cart
                localStorage.removeItem('cart');
                window.dispatchEvent(new Event('cartUpdated'));

                toast({
                    title: "Paiement réussi! 🎉",
                    description: `Commande #${orderId} confirmée. Merci pour votre achat!`,
                });

                onOpenChange(false);
                setIsSubmitting(false);
            }, 2000);

        } catch (error) {
            console.error('Error creating order:', error);
            toast({
                title: "Erreur",
                description: "Impossible de créer la commande. Veuillez réessayer.",
                variant: "destructive",
            });
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black">VOTRE PANIER</DialogTitle>
                </DialogHeader>

                {items.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-lg text-muted-foreground">Votre panier est vide</p>
                        <Button
                            onClick={() => onOpenChange(false)}
                            className="mt-6 rounded-full bg-primary px-8 py-6 font-bold hover:bg-primary-dark"
                        >
                            Continuer vos achats
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Cart Items */}
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 rounded-2xl border-2 border-border p-4 transition-all hover:border-primary"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-24 w-24 rounded-xl object-cover"
                                    />
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold text-lg">{item.name}</h3>
                                            <p className="text-primary font-bold text-xl">${item.price}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="h-8 w-8 rounded-full border-2 border-primary"
                                                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                            >
                                                <Minus className="h-4 w-4 text-primary" />
                                            </Button>
                                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="h-8 w-8 rounded-full border-2 border-primary"
                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="h-4 w-4 text-primary" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="ml-auto h-8 w-8 rounded-full border-2 border-destructive"
                                                onClick={() => onRemoveItem(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-4 rounded-2xl bg-accent p-6">
                            {selectedPlan && (
                                <div className="border-b border-border pb-4">
                                    <h3 className="font-bold text-lg mb-2">Votre Plan</h3>
                                    <div className="space-y-1 text-sm">
                                        <p><span className="font-semibold">Plan:</span> {selectedPlan.name}</p>
                                        <p><span className="font-semibold">Prix par plat:</span> ${selectedPlan.price}</p>
                                        {numberOfPeople && (
                                            <p><span className="font-semibold">Personnes:</span> {numberOfPeople}</p>
                                        )}
                                        {mealsPerDay && (
                                            <p><span className="font-semibold">Repas par jour:</span> {mealsPerDay}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center justify-between text-xl font-bold">
                                <span>Total:</span>
                                <span className="text-primary text-2xl">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <Button
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="flex-1 rounded-full border-2 border-primary py-6 font-bold text-primary hover:bg-primary-light"
                                disabled={isSubmitting}
                            >
                                Continuer vos achats
                            </Button>
                            <Button
                                onClick={handleStripeCheckout}
                                className="flex-1 rounded-full bg-primary py-6 font-bold hover:bg-primary-dark"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    "Traitement..."
                                ) : (
                                    <>
                                        <CreditCard className="mr-2 h-5 w-5" />
                                        Payer avec Stripe
                                    </>
                                )}
                            </Button>
                        </div>
                        
                        <p className="text-center text-xs text-muted-foreground">
                            🔒 Paiement sécurisé avec Stripe (Mode Test)
                        </p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CartPopup;
