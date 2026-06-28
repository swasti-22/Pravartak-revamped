import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import type { Language } from '../context/NavigationContext';
import { Check } from 'lucide-react';

export const LanguageSelection: React.FC = () => {
  const { language, setLanguage, navigateTo } = useNavigation();

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const handleContinue = () => {
    navigateTo('auth');
  };

  const greetings = {
    en: {
      welcome: "Choose Your Language",
      sub: "Please select the language you prefer for navigating government services. You can change this at any time.",
      continue: "Continue to Sign In",
      desc: "Information will be loaded in English layout"
    },
    hi: {
      welcome: "अपनी भाषा चुनें",
      sub: "कृपया वह भाषा चुनें जिसमें आप सरकारी सेवाओं को देखना चाहते हैं। आप इसे किसी भी समय बदल सकते हैं।",
      continue: "आगे बढ़ें",
      desc: "जानकारी हिंदी भाषा में लोड की जाएगी"
    },
    gu: {
      welcome: "તમારી ભાષા પસંદ કરો",
      sub: "કૃપા કરીને સરકારી સેવાઓ નેવિગેટ કરવા માટે તમારી પસંદગીની ભાષા પસંદ કરો. તમે આ ગમે ત્યારે બદલી શકો છો.",
      continue: "આગળ વધો",
      desc: "માહિતી ગુજરાતી ભાષામાં લોડ કરવામાં આવશે"
    }
  };

  const currentText = greetings[language] || greetings.en;

  const languagesList = [
    {
      code: 'en' as Language,
      nativeName: 'English',
      englishName: 'English',
      emblem: 'Aa',
      sampleGreeting: 'Welcome to Pravartak'
    },
    {
      code: 'hi' as Language,
      nativeName: 'हिन्दी',
      englishName: 'Hindi',
      emblem: 'अ',
      sampleGreeting: 'प्रवर्तक में आपका स्वागत है'
    },
    {
      code: 'gu' as Language,
      nativeName: 'ગુજરાતી',
      englishName: 'Gujarati',
      emblem: 'અ',
      sampleGreeting: 'પ્રવર્તક માં આપનું સ્વાગત છે'
    }
  ];

  return (
    <div className="bg-brand-ivory text-brand-slate font-sans min-h-[70vh] flex flex-col justify-center items-center px-6 py-12">
      <div className="w-full max-w-2xl space-y-8 text-center">
        
        {/* Intro */}
        <div className="space-y-3">
          <h2 className="text-3xl font-serif text-brand-forest">
            {currentText.welcome}
          </h2>
          <p className="text-sm text-brand-slate/85 max-w-md mx-auto">
            {currentText.sub}
          </p>
        </div>

        {/* Large touch targets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {languagesList.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`flex flex-col items-center justify-between p-6 bg-white border rounded-xl shadow-warm-sm transition-all duration-200 text-center relative group min-h-[180px] ${isSelected ? 'border-brand-forest ring-2 ring-brand-forest/15' : 'border-brand-sage/20 hover:border-brand-sage/60 hover:shadow-warm-md'}`}
              >
                {/* Active check indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-brand-forest text-white p-1 rounded-full flex items-center justify-center">
                    <Check size={10} strokeWidth={3} />
                  </div>
                )}

                {/* Decorative letter emblem */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-lg font-bold border transition-colors ${isSelected ? 'bg-brand-forest/5 border-brand-forest/30 text-brand-forest' : 'bg-brand-ivory border-brand-sage/10 text-brand-slate/60 group-hover:text-brand-forest'}`}>
                  {lang.emblem}
                </div>

                <div className="space-y-1 mt-4">
                  <h4 className="font-serif font-bold text-lg text-brand-forest">{lang.nativeName}</h4>
                  <p className="text-[10px] text-brand-sage font-medium tracking-wider uppercase">{lang.englishName}</p>
                </div>

                <p className="text-[10px] text-brand-slate/60 mt-3 italic">
                  "{lang.sampleGreeting}"
                </p>
              </button>
            );
          })}
        </div>

        {/* Action Trigger */}
        <div className="pt-4 flex flex-col items-center gap-3">
          <button
            onClick={handleContinue}
            className="w-full sm:w-auto px-10 py-3.5 bg-brand-forest text-white hover:bg-brand-forest/95 font-medium rounded-lg shadow-warm-sm transition-all duration-200"
          >
            {currentText.continue}
          </button>
          <p className="text-[10px] text-brand-sage font-medium italic">
            {currentText.desc}
          </p>
        </div>

      </div>
    </div>
  );
};
