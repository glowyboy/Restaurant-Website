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
    
    // How It Works Section
    howItWorksTitle: 'COMMENT LA BOX MAROCAINE VOUS SIMPLIFIE LA VIE',
    howItWorksSubtitle: 'Chaque semaine, recevez des repas marocains faits maison en trois étapes simples :',
    step1Title: 'CHOISISSEZ VOS REPAS',
    step1Description: 'Un menu varié qui change chaque semaine.',
    step2Title: 'LIVRÉ CHEZ VOUS !',
    step2Description: 'Des plats frais, jamais congelés, livrés directement à votre porte.',
    step3Title: 'RÉCHAUFFEZ ET SAVOUREZ',
    step3Description: 'Au micro-ondes, au four ou à la poêle, prêts en 3 minutes.',
    
    // Quality Badges
    qualityCommitment: 'ON S\'ENGAGE À VOUS OFFRIR :',
    authenticRecipes: 'RECETTES AUTHENTIQUES',
    premiumQuality: 'QUALITÉ PREMIUM',
    qualityMeat: 'VIANDE DE QUALITÉ',
    naturalIngredients: '100% NATUREL',
    
    // Menu Carousel
    weeklyMenu: 'LE MENU DE LA SEMAINE',
    deliciousDishes: 'Des plats savoureux, du petit-déjeuner aux desserts.',
    menuChangesWeekly: 'Notre menu change chaque semaine pour vous offrir de la fraîcheur et de la variété.',
    orderFavorites: 'Commandez vos repas favoris dès maintenant !',
    seeFullMenu: 'Voir le menu complet',
    
    // FAQ
    faqTitle: 'FOIRE AUX QUESTIONS',
    faq1Q: 'Vos repas sont-ils frais ou congelés ?',
    faq1A: 'Tous nos repas sont préparés frais et livrés directement chez vous. Ils ne sont jamais congelés, garantissant ainsi une qualité et un goût authentiques.',
    faq2Q: 'Comment réchauffer mes repas ?',
    faq2A: 'Nos repas peuvent être réchauffés au micro-ondes en 2-3 minutes, au four traditionnel ou à la poêle selon vos préférences. Des instructions détaillées sont fournies avec chaque commande.',
    faq3Q: 'Livrez-vous dans ma ville ?',
    faq3A: 'Nous livrons actuellement dans les régions de Montréal, Laval, Longueuil, et plusieurs autres villes de la région métropolitaine. Consultez notre section \'Zones de livraison\' pour voir la liste complète.',
    faq4Q: 'Puis-je commander des repas en format familial ?',
    faq4A: 'Oui ! Nous proposons des portions individuelles ainsi que des formats familiaux pour 2, 4 ou 6 personnes. Vous pouvez choisir le format qui vous convient lors de votre commande.',
    faq5Q: 'Comment fonctionne l\'abonnement ?',
    faq5A: 'Notre service d\'abonnement vous permet de recevoir automatiquement vos repas préférés chaque semaine. Vous pouvez modifier, suspendre ou annuler votre abonnement à tout moment sans frais.',
    faq6Q: 'Puis-je annuler ma commande ?',
    faq6A: 'Oui, vous pouvez annuler votre commande jusqu\'à 24 heures avant la date de livraison prévue. Pour toute annulation, veuillez nous contacter directement.',
    
    // Promo Banner
    freeDeliveryOn: 'Livraison GRATUITE sur toutes les commandes de',
    
    // Delivery Zones
    cities: 'Villes',
    deliveryZones: 'ZONES DE LIVRAISON',
    deliveryZonesDescription: 'Nous livrons des repas frais et savoureux dans les villes suivantes :',
    loadingZones: 'Chargement des zones...',
    
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
    
    // How It Works Section
    howItWorksTitle: 'كيف تبسط لك صندوق الطعام المغربي حياتك',
    howItWorksSubtitle: 'كل أسبوع، احصل على وجبات مغربية منزلية في ثلاث خطوات بسيطة:',
    step1Title: 'اختر وجباتك',
    step1Description: 'قائمة متنوعة تتغير كل أسبوع.',
    step2Title: 'يتم التوصيل إلى منزلك!',
    step2Description: 'أطباق طازجة، غير مجمدة أبداً، يتم توصيلها مباشرة إلى بابك.',
    step3Title: 'سخن واستمتع',
    step3Description: 'في الميكروويف أو الفرن أو المقلاة، جاهزة في 3 دقائق.',
    
    // Quality Badges
    qualityCommitment: 'نلتزم بتقديم:',
    authenticRecipes: 'وصفات أصيلة',
    premiumQuality: 'جودة ممتازة',
    qualityMeat: 'لحوم عالية الجودة',
    naturalIngredients: '100٪ طبيعي',
    
    // Menu Carousel
    weeklyMenu: 'قائمة الأسبوع',
    deliciousDishes: 'أطباق لذيذة، من الإفطار إلى الحلويات.',
    menuChangesWeekly: 'تتغير قائمتنا كل أسبوع لنقدم لك النضارة والتنوع.',
    orderFavorites: 'اطلب وجباتك المفضلة الآن!',
    seeFullMenu: 'عرض القائمة الكاملة',
    
    // FAQ
    faqTitle: 'الأسئلة الشائعة',
    faq1Q: 'هل وجباتكم طازجة أم مجمدة؟',
    faq1A: 'جميع وجباتنا يتم تحضيرها طازجة وتوصيلها مباشرة إلى منزلك. لا يتم تجميدها أبداً، مما يضمن جودة وطعم أصيل.',
    faq2Q: 'كيف أسخن وجباتي؟',
    faq2A: 'يمكن تسخين وجباتنا في الميكروويف لمدة 2-3 دقائق، أو في الفرن التقليدي أو المقلاة حسب تفضيلاتك. يتم توفير تعليمات مفصلة مع كل طلب.',
    faq3Q: 'هل توصلون إلى مدينتي؟',
    faq3A: 'نقوم حالياً بالتوصيل في مناطق مونتريال ولافال ولونغويل والعديد من المدن الأخرى في المنطقة الحضرية. راجع قسم "مناطق التوصيل" لرؤية القائمة الكاملة.',
    faq4Q: 'هل يمكنني طلب وجبات بحجم عائلي؟',
    faq4A: 'نعم! نقدم حصصاً فردية بالإضافة إلى أحجام عائلية لـ 2 أو 4 أو 6 أشخاص. يمكنك اختيار الحجم الذي يناسبك عند الطلب.',
    faq5Q: 'كيف يعمل الاشتراك؟',
    faq5A: 'تتيح لك خدمة الاشتراك الخاصة بنا استلام وجباتك المفضلة تلقائياً كل أسبوع. يمكنك تعديل أو تعليق أو إلغاء اشتراكك في أي وقت دون رسوم.',
    faq6Q: 'هل يمكنني إلغاء طلبي؟',
    faq6A: 'نعم، يمكنك إلغاء طلبك حتى 24 ساعة قبل تاريخ التسليم المقرر. لأي إلغاء، يرجى الاتصال بنا مباشرة.',
    
    // Promo Banner
    freeDeliveryOn: 'توصيل مجاني على جميع الطلبات من',
    
    // Delivery Zones
    cities: 'المدن',
    deliveryZones: 'مناطق التوصيل',
    deliveryZonesDescription: 'نقوم بتوصيل وجبات طازجة ولذيذة في المدن التالية:',
    loadingZones: 'جاري تحميل المناطق...',
    
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
