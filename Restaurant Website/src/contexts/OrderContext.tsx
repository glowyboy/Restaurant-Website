import { createContext, useContext, useState, ReactNode } from 'react';
import { Plan } from '@/lib/supabase';

interface OrderContextType {
  selectedPlan: Plan | null;
  setSelectedPlan: (plan: Plan | null) => void;
  numberOfPeople: number | null;
  setNumberOfPeople: (num: number | null) => void;
  mealsPerDay: number | null;
  setMealsPerDay: (num: number | null) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState<number | null>(null);
  const [mealsPerDay, setMealsPerDay] = useState<number | null>(null);

  return (
    <OrderContext.Provider
      value={{
        selectedPlan,
        setSelectedPlan,
        numberOfPeople,
        setNumberOfPeople,
        mealsPerDay,
        setMealsPerDay,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
