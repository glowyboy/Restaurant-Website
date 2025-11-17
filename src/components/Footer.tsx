import logo from "@/assets/logo.png";
import { useSettings } from "@/hooks/useSettings";

const Footer = () => {
  const { settings } = useSettings();
  const contactEmail = settings.contactEmail;

  return (
    <footer className="w-full bg-primary py-12 text-primary-foreground">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo */}
          <div>
            <img src={logo} alt="La Box Marocaine" className="h-64 w-auto" />
          </div>

          {/* Liens Utiles */}
          <div>
            <h3 className="mb-4 text-lg font-bold">LIENS UTILES</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/menu" className="hover:underline">
                  Notre menu
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/politique-confidentialite" className="hover:underline">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="/conditions" className="hover:underline">
                  Conditions générales
                </a>
              </li>
              <li>
                <a href="/retour" className="hover:underline">
                  Politique de retour
                </a>
              </li>
              <li>
                <a href="/support" className="hover:underline">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Menu Principal */}
          <div>
            <h3 className="mb-4 text-lg font-bold">MENU PRINCIPAL</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:underline">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/comment-ca-marche" className="hover:underline">
                  Comment ça marche
                </a>
              </li>
              <li>
                <a href="/a-propos" className="hover:underline">
                  À propos
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold">CONTACTEZ-NOUS</h3>
            <ul className="space-y-2 text-sm">
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
        <div className="mt-12 border-t border-primary-foreground/20 pt-6 text-center text-sm">
          <p>Copyright © 2025 La Box Marocaine. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
