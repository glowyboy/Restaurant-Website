import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase, type Dish } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

const MenuCarousel = () => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);

  // Fetch dishes from Supabase
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const { data, error } = await supabase
          .from('dishes')
          .select('*')
          .limit(6);
        
        if (error) throw error;
        
        setDishes(data || []);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 2;
    const scrollInterval = 20;

    const scroll = () => {
      if (scrollContainer) {
        scrollAmount += scrollStep;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
    };

    const intervalId = setInterval(scroll, scrollInterval);

    return () => clearInterval(intervalId);
  }, []);

  // Double the dishes array for seamless loop
  const duplicatedDishes = [...dishes, ...dishes];

  return (
    <section className="w-full bg-warm-cream py-16 md:py-24">
      <div className="container text-center">
        <h2 className="mb-4 text-3xl font-black md:text-4xl">
          {t('weeklyMenu')}
        </h2>
        <p className="mb-4 text-lg font-semibold">
          {t('deliciousDishes')}
        </p>
        <p className="mx-auto mb-12 max-w-2xl text-muted-foreground">
          {t('menuChangesWeekly')}
        </p>
      </div>

      <div
        ref={scrollRef}
        className="mb-12 flex gap-6 overflow-x-hidden px-4"
        style={{ scrollBehavior: "auto" }}
      >
        {duplicatedDishes.map((dish, index) => (
          <div
            key={index}
            className="min-w-[280px] flex-shrink-0 overflow-hidden rounded-2xl shadow-lg md:min-w-[320px]"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="h-64 w-full object-cover md:h-72"
            />
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="mb-6 text-lg font-semibold">
          {t('orderFavorites')}
        </p>
        <Button
          size="lg"
          className="rounded-full bg-primary px-8 py-6 text-base font-bold hover:bg-primary-dark"
          onClick={() => window.location.href = '/menu'}
        >
          {t('seeFullMenu')}
        </Button>
      </div>
    </section>
  );
};

export default MenuCarousel;
