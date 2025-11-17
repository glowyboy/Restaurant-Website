import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import Header from "@/components/Header";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import orderImage from "@/assets/order-image.jpg";
import { supabase, type Plan } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useOrder } from "@/contexts/OrderContext";

const Menu = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setSelectedPlan, setNumberOfPeople, setMealsPerDay } = useOrder();
  const [step, setStep] = useState(1);
  const [selectedPeople, setSelectedPeople] = useState<number | null>(null);
  const [selectedMealsPerDay, setSelectedMealsPerDay] = useState<number | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setNumberOfPeople(selectedPeople);
    setMealsPerDay(selectedMealsPerDay);
    navigate('/available-dishes');
  };

  // Fetch plans from Supabase
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data, error } = await supabase
          .from('plans')
          .select('*')
          .order('meals', { ascending: true });
        
        if (error) throw error;
        
        setPlans(data || []);
      } catch (error) {
        console.error('Error fetching plans:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les plans.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [toast]);

  return (
    <div className="min-h-screen pt-24">
      <Header />
      <PromoBanner />
      
      <main className="container py-12">
        {/* Progress Steps */}
        <div className="mb-12 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`flex h-16 w-16 items-center justify-center rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`}>
              <Users className={`h-8 w-8 ${step >= 1 ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
            </div>
            <span className="text-sm font-semibold">1. Nbr. de personnes</span>
          </div>
          
          <div className={`h-1 w-24 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
          
          <div className="flex items-center gap-2">
            <div className={`flex h-16 w-16 items-center justify-center rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}>
              <span className={`text-2xl ${step >= 2 ? 'text-primary-foreground' : 'text-muted-foreground'}`}>🍽️</span>
            </div>
            <span className="text-sm font-semibold">2. Nbr. de plats</span>
          </div>
          
          <div className={`h-1 w-24 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
          
          <div className="flex items-center gap-2">
            <div className={`flex h-16 w-16 items-center justify-center rounded-full ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}>
              <span className={`text-2xl ${step >= 3 ? 'text-primary-foreground' : 'text-muted-foreground'}`}>📋</span>
            </div>
            <span className="text-sm font-semibold">3. Choisir le plan</span>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Image */}
          <div className="rounded-3xl overflow-hidden">
            <img src={orderImage} alt="Repas marocain" className="h-full w-full object-cover" />
          </div>

          {/* Right: Steps */}
          <div>
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="mb-2 text-3xl font-black">POUR COMBIEN DE PERSONNES ?</h2>
                  <p className="text-muted-foreground">Nous utilisons cette information pour vous proposer le plan idéal.</p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setSelectedPeople(1);
                      setStep(2);
                    }}
                    className={`w-full rounded-full border-2 p-6 text-left transition-all ${
                      selectedPeople === 1 ? 'border-primary bg-primary-light' : 'border-border hover:border-primary'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta-soft">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-lg font-bold">Juste moi</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPeople(2);
                      setStep(2);
                    }}
                    className={`w-full rounded-full border-2 p-6 text-left transition-all ${
                      selectedPeople === 2 ? 'border-primary bg-primary-light' : 'border-border hover:border-primary'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta-soft">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-lg font-bold">Un repas à partager (pour deux)</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="mb-2 text-3xl font-black">COMBIEN DE REPAS PAR JOUR ?</h2>
                    <p className="text-muted-foreground">Nous utilisons cette information pour vous proposer le plan idéal.</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="rounded-full border-2 border-primary text-primary hover:bg-primary-light"
                  >
                    Retour
                  </Button>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setSelectedMealsPerDay(1);
                      setStep(3);
                    }}
                    className={`w-full rounded-full border-2 p-6 text-left transition-all ${
                      selectedMealsPerDay === 1 ? 'border-primary bg-primary-light' : 'border-border hover:border-primary'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                        <span className="text-xl text-primary">🍽️</span>
                      </div>
                      <span className="text-lg font-bold">1 seul repas</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedMealsPerDay(2);
                      setStep(3);
                    }}
                    className={`w-full rounded-full border-2 p-6 text-left transition-all ${
                      selectedMealsPerDay === 2 ? 'border-primary bg-primary-light' : 'border-border hover:border-primary'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                        <span className="text-xl text-primary">🍽️🍽️</span>
                      </div>
                      <span className="text-lg font-bold">Dîner et Souper</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="mb-2 text-3xl font-black">CHOISIR VOTRE PLAN</h2>
                    <p className="text-muted-foreground">Choisissez votre plan idéal et profitez de repas marocains faits maison.</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="rounded-full border-2 border-primary text-primary hover:bg-primary-light"
                  >
                    Retour
                  </Button>
                </div>

                {loading ? (
                  <div className="py-12 text-center">
                    <p className="text-lg text-muted-foreground">Chargement des plans...</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-3">
                    {plans.map((plan) => (
                      <Card key={plan.id} className="relative overflow-hidden border-2 transition-all hover:border-primary hover:shadow-lg">
                        {plan.is_popular && (
                          <div className="absolute left-0 right-0 top-0 bg-primary py-1 text-center text-sm font-bold text-primary-foreground">
                            Populaire
                          </div>
                        )}
                        <CardContent className={`space-y-4 p-6 ${plan.is_popular ? 'pt-10' : ''}`}>
                          <h3 className="border-b-2 border-primary pb-2 text-center text-xl font-bold">
                            {plan.name}
                          </h3>
                          <p className="text-center">
                            À partir de{" "}
                            <span className="text-2xl font-bold text-primary">${plan.price}</span>
                            /plat
                          </p>
                          <Button 
                            onClick={() => handlePlanSelect(plan)}
                            className="w-full rounded-full bg-primary py-6 font-bold hover:bg-primary-dark"
                          >
                            Choisir le repas
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>


      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;
