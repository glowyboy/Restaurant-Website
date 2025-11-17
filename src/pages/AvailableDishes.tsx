import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase, type Dish } from "@/lib/supabase";

const AvailableDishes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [flyingItem, setFlyingItem] = useState<{ 
    id: number; 
    x: number; 
    y: number; 
    width: number;
    height: number;
    image: string; 
    name: string;
    price: number;
    targetX: number; 
    targetY: number;
    stage: 'initial' | 'shrink' | 'fly';
  } | null>(null);

  // Fetch dishes from Supabase
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const { data, error } = await supabase
          .from('dishes')
          .select('*')
          .order('id', { ascending: true });
        
        if (error) throw error;
        
        setDishes(data || []);
      } catch (error) {
        console.error('Error fetching dishes:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les plats.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, [toast]);

  const handleAddToCart = (dish: Dish, event: React.MouseEvent<HTMLButtonElement>) => {
    const card = event.currentTarget.closest('.dish-card') as HTMLElement;
    
    // Get cart icon position - the button itself
    const cartButton = document.querySelector('[data-cart-icon]');
    
    if (card && cartButton) {
      const cardRect = card.getBoundingClientRect();
      const cartRect = cartButton.getBoundingClientRect();
      
      // Calculate the center of the cart button
      const cartCenterX = cartRect.left + cartRect.width / 2;
      const cartCenterY = cartRect.top + cartRect.height / 2;
      
      // Calculate card center
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      
      // Calculate the distance to move from card center to cart center
      const deltaX = cartCenterX - cardCenterX;
      const deltaY = cartCenterY - cardCenterY;
      
      // Stage 1: Initial state
      setFlyingItem({
        id: dish.id,
        x: cardRect.left,
        y: cardRect.top,
        width: cardRect.width,
        height: cardRect.height,
        image: dish.image,
        name: dish.name,
        price: dish.price,
        targetX: deltaX,
        targetY: deltaY,
        stage: 'initial',
      });

      // Stage 2: Shrink in place after brief delay
      setTimeout(() => {
        setFlyingItem(prev => prev ? { ...prev, stage: 'shrink' } : null);
      }, 40);

      // Stage 3: Fly to cart after shrinking
      setTimeout(() => {
        setFlyingItem(prev => prev ? { ...prev, stage: 'fly' } : null);
      }, 400);

      // Remove flying item after animation completes
      setTimeout(() => {
        setFlyingItem(null);
      }, 930);
    }

    // Get existing cart from localStorage
    const existingCart = localStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];
    
    // Check if item already exists
    const existingItemIndex = cart.findIndex((item: any) => item.id === dish.id);
    
    if (existingItemIndex >= 0) {
      // Increment quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new item
      cart.push({ ...dish, quantity: 1 });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Trigger a custom event to update header cart count
    window.dispatchEvent(new Event('cartUpdated'));

    // Show toast notification
    toast({
      title: "Ajouté au panier!",
      description: `${dish.name} a été ajouté à votre panier.`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen pt-24">
      <Header />
      <PromoBanner />

      {/* Flying dish animation */}
      {flyingItem && (
        <div
          className="pointer-events-none fixed z-[100] rounded-xl shadow-2xl overflow-hidden bg-card"
          style={{
            left: `${flyingItem.x}px`,
            top: `${flyingItem.y}px`,
            width: `${flyingItem.width}px`,
            height: `${flyingItem.height}px`,
            transition: flyingItem.stage === 'shrink' 
              ? 'transform 0.36s cubic-bezier(0.4, 0, 0.2, 1)' 
              : 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.26s ease-out 0.26s',
            transform: flyingItem.stage === 'initial' 
              ? 'translate(0, 0) scale(1)' 
              : flyingItem.stage === 'shrink'
              ? 'translate(0, 0) scale(0.2)'
              : `translate(${flyingItem.targetX}px, ${flyingItem.targetY}px) scale(0.2)`,
            transformOrigin: 'center center',
            opacity: flyingItem.stage === 'fly' ? 0 : 1,
          }}
        >
          <img src={flyingItem.image} alt={flyingItem.name} className="h-48 w-full object-cover" />
          <div className="p-6">
            <h3 className="mb-2 text-xl font-bold">{flyingItem.name}</h3>
            <p className="text-2xl font-bold text-primary">${flyingItem.price}</p>
          </div>
        </div>
      )}
      
      <main className="container py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black">NOS PLATS DISPONIBLES</h1>
            <p className="mt-2 text-muted-foreground">Choisissez vos plats préférés et ajoutez-les à votre panier</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/menu')}
            className="rounded-full border-2 border-primary px-6 py-6 font-bold text-primary hover:bg-primary-light"
          >
            Retour au menu
          </Button>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">Chargement des plats...</p>
          </div>
        ) : dishes.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">Aucun plat disponible pour le moment.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dishes.map((dish) => (
            <Card key={dish.id} className="dish-card overflow-hidden transition-all hover:shadow-xl">
              <img src={dish.image} alt={dish.name} className="h-48 w-full object-cover" />
              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-bold">{dish.name}</h3>
                <p className="mb-4 text-2xl font-bold text-primary">${dish.price}</p>
                <Button 
                  onClick={(e) => handleAddToCart(dish, e)}
                  className="w-full rounded-full bg-primary font-bold hover:bg-primary-dark"
                >
                  Ajouter au panier
                </Button>
              </CardContent>
            </Card>
          ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default AvailableDishes;
