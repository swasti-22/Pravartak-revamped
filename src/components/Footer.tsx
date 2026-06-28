import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Shield, EyeOff, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, language } = useNavigation();

  const labels = {
    desc: {
      en: "Pravartak is an independent citizen trust portal mapping official public notifications into actionable step-by-step roadmaps. We operate without government affiliation to guarantee neutral verification and transparency.",
      hi: "प्रवर्तक एक स्वतंत्र नागरिक विश्वास पोर्टल है जो आधिकारिक सार्वजनिक सूचनाओं को चरण-दर-चरण रोडमैप में बदलता है। हम निष्पक्ष सत्यापन और पारदर्शिता सुनिश्चित करने के लिए किसी सरकारी संबद्धता के बिना काम करते हैं।",
      gu: "પ્રવર્તક એ એક સ્વતંત્ર નાગરિક ટ્રસ્ટ પોર્ટલ છે જે સત્તાવાર જાહેર સૂચનાઓને પગલું-દર-પગલાં રોડમેપમાં રૂપાંતરિત કરે છે. તટસ્થ ચકાસણી અને પારદર્શિતાની ખાતરી આપવા માટે અમે સરકારી જોડાણ વિના કામ કરીએ છીએ."
    },
    privacy: { en: "Privacy Policy", hi: "गोपनीयता नीति", gu: "પ્રાઇવેસી પોલિસી" },
    terms: { en: "Terms of Use", hi: "उपयोग की शर्तें", gu: "ઉપયોગની શરતો" },
    help: { en: "Help Center", hi: "सहायता केंद्र", gu: "મદદ કેન્દ્ર" },
    contact: { en: "Contact Us", hi: "हमसे संपर्क करें", gu: "સંપર્ક કરો" },
    accessibility: { en: "Accessibility Statement", hi: "अभिगम्यता विवरण", gu: "એક્સેસિબિલિટી સ્ટેટમેન્ટ" }
  };

  return (
    <footer className="w-full bg-brand-forest text-brand-ivory/80 py-12 px-6 md:px-12 mt-auto border-t border-brand-sage/20 font-sans text-xs transition-colors duration-250">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Information */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border border-brand-ivory/30 flex items-center justify-center font-serif text-brand-ivory font-bold text-xs bg-brand-forest/20">
              प्र
            </div>
            <span className="font-serif text-base tracking-wider font-bold text-white">
              PRAVARTAK
            </span>
          </div>
          <p className="text-brand-ivory/60 leading-relaxed max-w-sm">
            {labels.desc[language]}
          </p>
        </div>

        {/* Navigation links */}
        <div className="space-y-3">
          <h4 className="font-serif text-white font-semibold text-sm tracking-wide">Resources</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => navigateTo('profile')} className="hover:text-white transition-colors text-left">
                {labels.accessibility[language]}
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('landing')} className="hover:text-white transition-colors text-left">
                {labels.help[language]}
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('landing')} className="hover:text-white transition-colors text-left">
                {labels.contact[language]}
              </button>
            </li>
          </ul>
        </div>

        {/* Regulatory disclaimer info */}
        <div className="space-y-3">
          <h4 className="font-serif text-white font-semibold text-sm tracking-wide">Security</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-ivory/60">
              <Shield size={14} className="text-brand-sage" />
              <span>SSL Encryption & 2FA Ready</span>
            </div>
            <div className="flex items-center gap-2 text-brand-ivory/60">
              <EyeOff size={14} className="text-brand-sage" />
              <span>Zero-Tracker Architecture</span>
            </div>
            <div className="flex items-center gap-2 text-brand-ivory/60">
              <Globe size={14} className="text-brand-sage" />
              <span>Sovereign Indian Data Hosted</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-brand-sage/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-brand-ivory/45 gap-4">
        <div>
          &copy; {new Date().getFullYear()} Pravartak Navigator. Crafted with Care for Indian Citizens.
        </div>
        <div className="flex gap-6">
          <button className="hover:text-white transition-colors">{labels.privacy[language]}</button>
          <button className="hover:text-white transition-colors">{labels.terms[language]}</button>
        </div>
      </div>
    </footer>
  );
};
