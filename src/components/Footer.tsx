import logo from "@/assets/logo.png";
import { useSettings } from "@/hooks/useSettings";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { settings } = useSettings();
  const { t } = useLanguage();
  const contactEmail = settings.contactEmail;

  return (
    <footer className="w-full bg-primary py-8 md:py-12 text-primary-foreground">
      <div className="container">
        <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <img src={logo} alt="La Box Marocaine" className="h-32 md:h-48 w-auto" />
          </div>

          {/* Liens Utiles */}
          <div className="text-center md:text-left">
            <h3 className="mb-3 md:mb-4 text-base md:text-lg font-bold">{t('usefulLinks')}</h3>
            <ul className="space-y-1.5 md:space-y-2 text-sm">
              <li>
                <a href="/menu" className="hover:underline">
                  {t('ourMenu')}
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  {t('faqs')}
                </a>
              </li>
              <li>
                <a href="/politique-confidentialite" className="hover:underline">
                  {t('privacyPolicy')}
                </a>
              </li>
              <li>
                <a href="/conditions" className="hover:underline">
                  {t('terms')}
                </a>
              </li>
              <li>
                <a href="/retour" className="hover:underline">
                  {t('returnPolicy')}
                </a>
              </li>
              <li>
                <a href="/support" className="hover:underline">
                  {t('support')}
                </a>
              </li>
            </ul>
          </div>

          {/* Menu Principal */}
          <div className="text-center md:text-left">
            <h3 className="mb-3 md:mb-4 text-base md:text-lg font-bold">{t('mainMenu')}</h3>
            <ul className="space-y-1.5 md:space-y-2 text-sm">
              <li>
                <a href="/" className="hover:underline">
                  {t('home')}
                </a>
              </li>
              <li>
                <a href="/comment-ca-marche" className="hover:underline">
                  {t('howItWorks')}
                </a>
              </li>
              <li>
                <a href="/a-propos" className="hover:underline">
                  {t('about')}
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  {t('contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="mb-3 md:mb-4 text-base md:text-lg font-bold">{t('contactUs')}</h3>
            <ul className="space-y-1.5 md:space-y-2 text-sm">
              <li>
                <a href={`mailto:${contactEmail}`} className="hover:underline">
                  {contactEmail}
                </a>
              </li>
              <li>Alger, Algérie</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 md:mt-12 border-t border-primary-foreground/20 pt-4 md:pt-6 text-center text-xs md:text-sm">
          <p>Copyright © 2025 La Box Marocaine. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
