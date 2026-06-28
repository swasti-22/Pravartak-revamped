import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import type { Language } from '../context/NavigationContext';
import { mockProcesses } from '../data/mockData';
import { 
  Eye, 
  Type, 
  Languages, 
  Bookmark, 
  MessageSquareCode, 
  Info, 
  Check, 
  Heart
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    savedProcessIds, 
    toggleSaveProcess, 
    highContrast, 
    setHighContrast, 
    fontSize, 
    setFontSize,
    setSelectedProcess,
    navigateTo,
    user,
    signOut
  } = useNavigation();

  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const savedProcessesList = mockProcesses.filter(p => savedProcessIds.includes(p.id));

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSubmitted(true);
    setFeedbackText('');
    setTimeout(() => setFeedbackSubmitted(false), 4000);
  };

  const getLanguageName = (lang: Language) => {
    switch (lang) {
      case 'en': return 'English';
      case 'hi': return 'हिन्दी';
      case 'gu': return 'ગુજરાતી';
    }
  };

  const labels = {
    title: { en: "Profile & Portal Settings", hi: "प्रोफ़ाइल और पोर्टल सेटिंग्स", gu: "પ્રોફાઇલ અને પોર્ટલ સેટિંગ્સ" },
    sub: { en: "Customize your accessibility preferences and review your saved guidelines.", hi: "अपनी पहुंच प्राथमिकताओं को अनुकूलित करें और अपने सहेजे गए दिशानिर्देशों की समीक्षा करें।", gu: "તમારી ઍક્સેસિબિલિટી પસંદગીઓને કસ્ટમાઇઝ કરો અને તમારી સાચવેલી માર્ગદર્શિકાની સમીક્ષા કરો." },
    accessibility: { en: "Accessibility Control", hi: "अभिगम्यता नियंत्रण", gu: "ઍક્સેસિબિલિટી નિયંત્રણ" },
    feedbackTitle: { en: "Citizen Feedback", hi: "नागरिक प्रतिक्रिया", gu: "नागरिक प्रतिसवाद" },
    feedbackPlaceholder: { en: "Tell us about a procedure that needs updating or an RTO/PSK experience...", hi: "हमें किसी ऐसी प्रक्रिया के बारे में बताएं जिसे अपडेट करने की आवश्यकता है...", gu: "અમને એવી પ્રક્રિયા વિશે કહો કે જેને અપડેટ કરવાની જરૂર છે..." },
    feedbackBtn: { en: "Submit Feedback", hi: "प्रतिक्रिया भेजें", gu: "પ્રતિસાદ સબમિટ કરો" },
    aboutTitle: { en: "About Pravartak", hi: "प्रवर्तक के बारे में", gu: "પ્રવર્તક વિશે" },
    aboutDesc: { 
      en: "Pravartak was built by policy experts and product designers to resolve anxiety in government filings. Every roadmap is backed by official links to avoid middlemen and agents.",
      hi: "सरकारी फाइलिंग में चिंता को दूर करने के लिए नीति विशेषज्ञों और उत्पाद डिजाइनरों द्वारा प्रवर्तक का निर्माण किया गया था।",
      gu: "સરકારી ફાઇલિંગમાં ચિંતા દૂર કરવા માટે નીતિ નિષ્ણાતો અને પ્રોડક્ટ ડિઝાઇનર્સ દ્વારા પ્રવર્તક બનાવવામાં આવ્યું હતું."
    }
  };

  return (
    <div className="bg-brand-ivory text-brand-slate font-sans py-8 px-6 md:px-12 max-w-6xl mx-auto space-y-8">
      
      {/* Title Header */}
      <div className="border-b border-brand-sage/15 pb-6">
        <h1 className="text-3xl font-serif text-brand-forest tracking-tight m-0">{labels.title[language]}</h1>
        <p className="text-xs text-brand-slate/70 mt-1">{labels.sub[language]}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Accessibility & Customizations */}
        <div className="space-y-6 md:col-span-1">

          {/* User Account Settings */}
          <div className="bg-white border border-brand-sage/20 rounded-xl p-6 shadow-warm-sm space-y-4">
            <h4 className="font-serif font-bold text-sm text-brand-forest">
              Account Information
            </h4>
            {user ? (
              <div className="space-y-3">
                <div className="text-xs">
                  <p className="text-brand-slate/60 font-medium">Logged in as:</p>
                  <p className="font-semibold text-brand-forest break-all">{user.email}</p>
                </div>
                <button
                  onClick={signOut}
                  className="w-full py-2 bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200/50 rounded-lg text-xs font-semibold transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-xs">
                  <p className="text-brand-slate/60 font-medium">Account status:</p>
                  <p className="font-semibold text-brand-forest">Guest Mode</p>
                  <p className="text-[10px] text-brand-slate/50 mt-1 leading-normal">Authenticate to synchronize saved guidelines across devices and access personalized checklists.</p>
                </div>
                <button
                  onClick={() => navigateTo('auth')}
                  className="w-full py-2 bg-brand-forest text-white hover:bg-brand-forest/95 rounded-lg text-xs font-semibold transition-colors"
                >
                  Sign In / Register
                </button>
              </div>
            )}
          </div>
          
          {/* Accessibility Settings */}
          <div className="bg-white border border-brand-sage/20 rounded-xl p-6 shadow-warm-sm space-y-5">
            <h4 className="font-serif font-bold text-sm text-brand-forest flex items-center gap-2">
              <Eye size={16} className="text-brand-sage" /> {labels.accessibility[language]}
            </h4>

            {/* High Contrast Mode Toggle */}
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

            {/* Text Sizing Toggles */}
            <div className="space-y-2 text-xs">
              <span className="text-brand-slate font-medium flex items-center gap-1">
                <Type size={14} /> Text Scaling
              </span>
              <div className="grid grid-cols-3 gap-1 p-0.5 bg-brand-ivory rounded border border-brand-sage/15">
                {(['normal', 'large', 'extra-large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`py-1.5 text-[10px] rounded transition-all font-semibold capitalize ${fontSize === size ? 'bg-white text-brand-forest shadow-warm-sm border border-brand-sage/10' : 'text-brand-slate/60 hover:text-brand-slate'}`}
                  >
                    {size === 'extra-large' ? 'XL' : size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Language preference settings card */}
          <div className="bg-white border border-brand-sage/20 rounded-xl p-6 shadow-warm-sm space-y-4">
            <h4 className="font-serif font-bold text-sm text-brand-forest flex items-center gap-2">
              <Languages size={16} className="text-brand-sage" /> Language Preference
            </h4>
            <div className="space-y-2">
              {(['en', 'hi', 'gu'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`w-full flex justify-between items-center p-3 text-xs border rounded-lg transition-colors ${language === lang ? 'bg-brand-forest/5 border-brand-forest text-brand-forest font-bold' : 'bg-brand-ivory/50 border-brand-sage/10 hover:border-brand-sage/40 text-brand-slate'}`}
                >
                  <span>{getLanguageName(lang)}</span>
                  {language === lang && <Check size={14} className="text-brand-forest" />}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Saved lists, Feedback, Info */}
        <div className="space-y-6 md:col-span-2">
          
          {/* Saved Applications List */}
          <div className="bg-white border border-brand-sage/20 rounded-xl p-6 shadow-warm-sm space-y-4">
            <h4 className="font-serif font-bold text-sm text-brand-forest flex items-center gap-2">
              <Bookmark size={16} className="text-brand-sage" /> Saved Verification Roadmaps
            </h4>
            {savedProcessesList.length > 0 ? (
              <div className="divide-y divide-brand-sage/10">
                {savedProcessesList.map(p => (
                  <div key={p.id} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">
                    <div>
                      <button
                        onClick={() => {
                          setSelectedProcess(p);
                          navigateTo('results');
                        }}
                        className="font-serif font-bold text-sm text-brand-forest hover:text-brand-saffron transition-colors text-left"
                      >
                        {p.name[language]}
                      </button>
                      <p className="text-[10px] text-brand-sage font-medium">{p.category} Category</p>
                    </div>
                    <button
                      onClick={() => toggleSaveProcess(p.id)}
                      className="text-[10px] text-brand-saffron hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-brand-slate/60 italic text-center py-4">
                You haven't saved any guidelines yet.
              </p>
            )}
          </div>

          {/* Citizen Feedback Form */}
          <div className="bg-white border border-brand-sage/20 rounded-xl p-6 shadow-warm-sm space-y-4">
            <h4 className="font-serif font-bold text-sm text-brand-forest flex items-center gap-2">
              <MessageSquareCode size={16} className="text-brand-sage" /> {labels.feedbackTitle[language]}
            </h4>
            
            {feedbackSubmitted ? (
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-4 rounded-lg text-xs leading-relaxed">
                Thank you. Your verification feedback has been logged securely in our civic vault. Our team will verify and refresh guidelines within 48 hours if necessary.
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <textarea
                  placeholder={labels.feedbackPlaceholder[language]}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  required
                  rows={3}
                  className="w-full p-3 text-xs bg-brand-ivory/50 border border-brand-sage/20 rounded-lg focus:border-brand-sage leading-relaxed"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-forest text-white hover:bg-brand-forest/95 font-medium rounded-lg text-xs transition-colors"
                >
                  {labels.feedbackBtn[language]}
                </button>
              </form>
            )}
          </div>

          {/* About Banner */}
          <div className="bg-brand-ivory border border-brand-sage/15 rounded-xl p-6 space-y-3">
            <h4 className="font-serif font-bold text-sm text-brand-forest flex items-center gap-2">
              <Info size={16} className="text-brand-sage" /> {labels.aboutTitle[language]}
            </h4>
            <p className="text-xs text-brand-slate leading-relaxed">
              {labels.aboutDesc[language]}
            </p>
            <div className="flex gap-4 pt-2 text-[10px] text-brand-sage font-medium italic">
              <span className="flex items-center gap-1"><Heart size={10} className="text-brand-saffron fill-brand-saffron" /> Citizen Initiative</span>
              <span>&bull;</span>
              <span>Fully Open-Source Data</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
