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
import { useLanguage } from "@/contexts/LanguageContext";

const Menu = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setSelectedPlan, setNumberOfPeople, setMealsPerDay } = useOrder();
  const { t } = useLanguage();
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
    <div className="min-h-screen pt-20 md:pt-24">
      <Header />
      <PromoBanner />
      
      <main className="container py-12">
        {/* Progress Steps - Responsive */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 px-4 py-4">
          <div className="flex items-center gap-3 w-full md:w-auto justify-center">
            <div className={`flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full shrink-0 ${step >= 1 ? 'bg-primary' : 'bg-muted'}`}>
              <Users className={`h-7 w-7 md:h-8 md:w-8 ${step >= 1 ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
            </div>
            <span className="text-sm md:text-sm font-semibold whitespace-nowrap">1. {t('forHowManyPeople')}</span>
          </div>
          
          <div className={`h-10 w-1 md:h-1 md:w-20 shrink-0 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
          
          <div className="flex items-center gap-3 w-full md:w-auto justify-center">
            <div className={`flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full shrink-0 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}>
              <span className={`text-2xl md:text-2xl ${step >= 2 ? 'text-primary-foreground' : 'text-muted-foreground'}`}>🍽️</span>
            </div>
            <span className="text-sm md:text-sm font-semibold whitespace-nowrap">2. {t('howManyMealsPerDay')}</span>
          </div>
          
          <div className={`h-10 w-1 md:h-1 md:w-20 shrink-0 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
          
          <div className="flex items-center gap-3 w-full md:w-auto justify-center">
            <div className={`flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full shrink-0 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}>
              <span className={`text-2xl md:text-2xl ${step >= 3 ? 'text-primary-foreground' : 'text-muted-foreground'}`}>📋</span>
            </div>
            <span className="text-sm md:text-sm font-semibold whitespace-nowrap">3. {t('chooseYourPlan')}</span>
          </div>
        </div>

        <div className="grid gap-6 md:gap-12 lg:grid-cols-2 px-4">
          {/* Left: Image - Hidden on mobile, shown on tablet+ */}
          <div className="hidden lg:block rounded-3xl overflow-hidden">
            <img src={orderImage} alt="Repas marocain" className="h-full w-full object-cover" />
          </div>

          {/* Right: Steps */}
          <div>
            {step === 1 && (
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h2 className="mb-2 text-2xl md:text-3xl font-black">{t('forHowManyPeople')}</h2>
                  <p className="text-sm md:text-base text-muted-foreground">{t('weUseThisInfo')}</p>
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
                      <span className="text-lg font-bold">{t('justMe')}</span>
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
                      <span className="text-lg font-bold">{t('mealToShare')}</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="mb-2 text-2xl md:text-3xl font-black">{t('howManyMealsPerDay')}</h2>
                    <p className="text-sm md:text-base text-muted-foreground">{t('weUseThisInfo')}</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="rounded-full border-2 border-primary text-primary hover:bg-primary-light w-full md:w-auto shrink-0"
                  >
                    {t('back')}
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
                      <span className="text-lg font-bold">{t('oneMeal')}</span>
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
                      <span className="text-lg font-bold">{t('dinnerAndSupper')}</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="mb-2 text-2xl md:text-3xl font-black">{t('chooseYourPlan')}</h2>
                    <p className="text-sm md:text-base text-muted-foreground">{t('chooseIdealPlan')}</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="rounded-full border-2 border-primary text-primary hover:bg-primary-light w-full md:w-auto shrink-0"
                  >
                    Retour
                  </Button>
                </div>

                {loading ? (
                  <div className="py-8 md:py-12 text-center">
                    <p className="text-base md:text-lg text-muted-foreground">{t('loading')}...</p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                      <Card key={plan.id} className="relative overflow-hidden border-2 transition-all hover:border-primary hover:shadow-lg">
                        {plan.is_popular && (
                          <div className="absolute left-0 right-0 top-0 bg-primary py-1 text-center text-sm font-bold text-primary-foreground">
                            {t('popular')}
                          </div>
                        )}
                        <CardContent className={`space-y-4 p-6 ${plan.is_popular ? 'pt-10' : ''}`}>
                          <h3 className="border-b-2 border-primary pb-2 text-center text-xl font-bold">
                            {plan.name}
                          </h3>
                          <p className="text-center">
                            {t('fromPrice')}{" "}
                            <span className="text-2xl font-bold text-primary">${plan.price}</span>
                            {t('perMeal')}
                          </p>
                          <Button 
                            onClick={() => handlePlanSelect(plan)}
                            className="w-full rounded-full bg-primary py-6 font-bold hover:bg-primary-dark"
                          >
                            {t('selectPlan')}
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
