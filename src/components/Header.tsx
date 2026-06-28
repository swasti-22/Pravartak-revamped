import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import type { Language } from '../context/NavigationContext';
import { ArrowLeft, Languages, Eye, Type, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentPage, 
    history, 
    goBack, 
    language, 
    setLanguage, 
    highContrast, 
    setHighContrast, 
    fontSize, 
    setFontSize,
    navigateTo 
  } = useNavigation();

  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);

  const getLanguageName = (lang: Language) => {
    switch (lang) {
      case 'en': return 'English';
      case 'hi': return 'हिन्दी';
      case 'gu': return 'ગુજરાતી';
    }
  };

  const isHome = currentPage === 'landing';

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-ivory/80 backdrop-blur-md border-b border-brand-sage/10 py-4 px-6 md:px-12 flex justify-between items-center transition-colors duration-250">
      <div className="flex items-center gap-4">
        {/* Dynamic Back button */}
        {!isHome && history.length > 0 && (
          <button 
            onClick={goBack} 
            className="p-2 hover:bg-brand-sage/10 text-brand-slate rounded-lg transition-colors flex items-center justify-center"
            title="Go back"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </button>
        )}
        
        {/* Logo and Brand Name */}
        <div 
          onClick={() => navigateTo('landing')} 
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          {/* Handcrafted Emblem: An elegant ashoka-inspired wheel segment or calm structural shield */}
          <div className="w-8 h-8 rounded border-2 border-brand-forest flex items-center justify-center font-serif text-brand-forest font-bold text-base bg-white shadow-warm-sm">
            प्र
          </div>
          <div>
            <h1 className="text-xl font-serif text-brand-forest tracking-wider font-bold m-0 p-0 leading-none">
              PRAVARTAK
            </h1>
            <p className="text-[9px] text-brand-sage font-sans tracking-widest mt-0.5 uppercase leading-none font-semibold">
              Government Trust Navigator
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 font-sans text-xs">
        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLanguageMenu(!showLanguageMenu);
              setShowAccessibilityMenu(false);
            }}
            className="flex items-center gap-1.5 px-3 py-2 border border-brand-sage/20 hover:border-brand-sage text-brand-slate bg-white rounded-lg transition-colors font-medium"
            aria-haspopup="true"
            aria-expanded={showLanguageMenu}
          >
            <Languages size={14} className="text-brand-sage" />
            <span>{getLanguageName(language)}</span>
          </button>
          
          {showLanguageMenu && (
            <div className="absolute right-0 mt-1.5 w-36 bg-white border border-brand-sage/20 rounded-lg shadow-warm-md py-1 animate-fade-in z-50">
              {(['en', 'hi', 'gu'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setShowLanguageMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-brand-ivory text-brand-slate transition-colors ${language === lang ? 'font-semibold text-brand-forest bg-brand-sage/10' : ''}`}
                >
                  {getLanguageName(lang)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Accessibility Panel Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              setShowAccessibilityMenu(!showAccessibilityMenu);
              setShowLanguageMenu(false);
            }}
            className={`p-2 border rounded-lg transition-colors flex items-center justify-center bg-white ${showAccessibilityMenu ? 'border-brand-forest bg-brand-forest/5 text-brand-forest' : 'border-brand-sage/20 hover:border-brand-sage text-brand-slate'}`}
            title="Accessibility Options"
            aria-label="Accessibility Options"
          >
            <Eye size={16} />
          </button>

          {showAccessibilityMenu && (
            <div className="absolute right-0 mt-1.5 w-60 bg-white border border-brand-sage/20 rounded-lg shadow-warm-md p-4 space-y-4 z-50">
              <p className="font-semibold text-brand-forest text-xs border-b border-brand-sage/10 pb-2">Accessibility Options</p>
              
              {/* High Contrast */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-brand-slate font-medium">High Contrast Mode</span>
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors ${highContrast ? 'bg-brand-forest' : 'bg-brand-sage/35'}`}
                  aria-pressed={highContrast}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-warm-sm transform transition-transform ${highContrast ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Font Size Adjustments */}
              <div className="space-y-2 text-xs">
                <span className="text-brand-slate font-medium flex items-center gap-1">
                  <Type size={12} /> Text Size
                </span>
                <div className="grid grid-cols-3 gap-1 p-0.5 bg-brand-ivory rounded border border-brand-sage/15">
                  {(['normal', 'large', 'extra-large'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`py-1 text-[10px] rounded transition-colors font-medium capitalize ${fontSize === size ? 'bg-white text-brand-forest shadow-warm-sm border border-brand-sage/10' : 'text-brand-slate/60 hover:text-brand-slate'}`}
                    >
                      {size === 'extra-large' ? 'XL' : size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Link or Login state indicator */}
        {currentPage !== 'auth' && currentPage !== 'landing' && currentPage !== 'language' && (
          <button
            onClick={() => navigateTo('profile')}
            className={`p-2 border rounded-lg transition-colors flex items-center justify-center bg-white ${currentPage === 'profile' ? 'border-brand-forest bg-brand-forest/5 text-brand-forest' : 'border-brand-sage/20 hover:border-brand-sage text-brand-slate'}`}
            title="Profile & Settings"
            aria-label="Profile & Settings"
          >
            <User size={16} />
          </button>
        )}
      </div>
    </header>
  );
};
