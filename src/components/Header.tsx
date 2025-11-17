import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartPopup from "@/components/CartPopup";
import logo from "@/assets/logo.png";

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      const existingCart = localStorage.getItem('cart');
      if (existingCart) {
        setCartItems(JSON.parse(existingCart));
      }
    };
    
    loadCart();
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', loadCart);
    
    return () => {
      window.removeEventListener('cartUpdated', loadCart);
    };
  }, []);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    let updatedCart;
    if (quantity === 0) {
      updatedCart = cartItems.filter(item => item.id !== id);
    } else {
      updatedCart = cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
    }
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b bg-background shadow-md">
        <div className="container flex h-24 items-center justify-between">
          <a href="/" className="flex items-center -my-16 cursor-pointer">
            <img src={logo} alt="Lamsalna" className="h-56 w-auto" />
          </a>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="relative rounded-full border-2 border-primary hover:bg-primary-light"
            onClick={() => setCartOpen(true)}
            data-cart-icon
          >
            <ShoppingCart className="h-5 w-5 text-primary" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </Button>
        </div>
      </header>

      <CartPopup
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </>
  );
};

export default Header;
