import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    menu: 'Menu',
    cart: 'Panier',
    
    // Hero Section
    heroTitle: 'Repas Marocains Faits Maison',
    heroSubtitle: 'Savourez l\'authenticité du Maroc',
    heroDescription: 'Découvrez nos délicieux plats marocains préparés avec amour',
    orderNow: 'Commander Maintenant',
    serviceNumber1: 'Le service #1 de repas',
    inCanada: 'au Canada !',
    mealsLikeHome: 'DES REPAS',
    asIfYouWereThere: 'COMME SI VOUS Y ÉTIEZ.',
    readyIn3Min: 'Prêts en 3 minutes sans effort',
    deliveryInAlgeria: 'Livraison en Algérie',
    dishesAvailable: '+20 plats disponibles chaque semaine !',
    seeMenu: 'Voir le menu',
    howItWorksQuestion: 'Comment ça marche ?',
    
    // Menu
    forHowManyPeople: 'Nbr. de personnes',
    howManyMealsPerDay: 'Nbr. de plats',
    chooseYourPlan: 'CHOISIR VOTRE PLAN',
    chooseIdealPlan: 'Choisissez votre plan idéal et profitez de repas marocains faits maison.',
    weUseThisInfo: 'Nous utilisons cette information pour vous proposer le plan idéal.',
    selectPlan: 'Choisir le repas',
    popular: 'Populaire',
    fromPrice: 'À partir de',
    perMeal: '/plat',
    justMe: 'Juste moi',
    mealToShare: 'Un repas à partager (pour deux)',
    oneMeal: '1 seul repas',
    dinnerAndSupper: 'Dîner et Souper',
    
    // Cart
    yourOrder: 'Votre Commande',
    empty: 'Vide',
    subtotal: 'Sous-total',
    delivery: 'Livraison',
    free: 'GRATUIT',
    total: 'Total',
    checkout: 'Passer la commande',
    
    // Common
    next: 'Suivant',
    back: 'Retour',
    loading: 'Chargement',
    
    // Footer
    usefulLinks: 'LIENS UTILES',
    mainMenu: 'MENU PRINCIPAL',
    contactUs: 'CONTACTEZ-NOUS',
    ourMenu: 'Notre menu',
    faqs: 'FAQs',
    privacyPolicy: 'Politique de confidentialité',
    terms: 'Conditions générales',
    returnPolicy: 'Politique de retour',
    support: 'Support',
    howItWorks: 'Comment ça marche',
    about: 'À propos',
    contact: 'Contact',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    menu: 'القائمة',
    cart: 'السلة',
    
    // Hero Section
    heroTitle: 'وجبات مغربية منزلية',
    heroSubtitle: 'تذوق أصالة المغرب',
    heroDescription: 'اكتشف أطباقنا المغربية اللذيذة المحضرة بحب',
    orderNow: 'اطلب الآن',
    serviceNumber1: 'الخدمة رقم 1 للوجبات',
    inCanada: 'في كندا !',
    mealsLikeHome: 'وجبات',
    asIfYouWereThere: 'كأنك هناك.',
    readyIn3Min: 'جاهزة في 3 دقائق بدون جهد',
    deliveryInAlgeria: 'التوصيل في الجزائر',
    dishesAvailable: '+20 طبق متاح كل أسبوع !',
    seeMenu: 'عرض القائمة',
    howItWorksQuestion: 'كيف يعمل ؟',
    
    // Menu
    forHowManyPeople: 'عدد الأشخاص',
    howManyMealsPerDay: 'عدد الوجبات',
    chooseYourPlan: 'اختر خطتك',
    chooseIdealPlan: 'اختر خطتك المثالية واستمتع بوجبات مغربية منزلية.',
    weUseThisInfo: 'نستخدم هذه المعلومات لاقتراح الخطة المثالية لك.',
    selectPlan: 'اختر الوجبة',
    popular: 'شائع',
    fromPrice: 'ابتداءً من',
    perMeal: '/وجبة',
    justMe: 'أنا فقط',
    mealToShare: 'وجبة للمشاركة (لشخصين)',
    oneMeal: 'وجبة واحدة فقط',
    dinnerAndSupper: 'غداء وعشاء',
    
    // Cart
    yourOrder: 'طلبك',
    empty: 'فارغ',
    subtotal: 'المجموع الفرعي',
    delivery: 'التوصيل',
    free: 'مجاني',
    total: 'المجموع',
    checkout: 'إتمام الطلب',
    
    // Common
    next: 'التالي',
    back: 'رجوع',
    loading: 'جاري التحميل',
    
    // Footer
    usefulLinks: 'روابط مفيدة',
    mainMenu: 'القائمة الرئيسية',
    contactUs: 'اتصل بنا',
    ourMenu: 'قائمتنا',
    faqs: 'الأسئلة الشائعة',
    privacyPolicy: 'سياسة الخصوصية',
    terms: 'الشروط والأحكام',
    returnPolicy: 'سياسة الإرجاع',
    support: 'الدعم',
    howItWorks: 'كيف يعمل',
    about: 'من نحن',
    contact: 'اتصل',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Load from localStorage or default to 'fr'
    const saved = localStorage.getItem('language');
    return (saved === 'ar' || saved === 'fr') ? saved : 'fr';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
