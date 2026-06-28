import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { 
  VerifiedInfoCard, 
  TrustScoreCard, 
  CommunityInsightsCard, 
  StepByStepGuidanceCard 
} from '../components/FeatureCards';
import { ArrowRight, Landmark } from 'lucide-react';

export const Landing: React.FC = () => {
  const { navigateTo, language } = useNavigation();

  // Translations for the landing page texts
  const t = {
    tagline: {
      en: "It's how trust in every कदम is done.",
      hi: "हर कदम पर विश्वास, इसी तरह होता है।",
      gu: "દરેક પગલા પર વિશ્વાસ, આ રીતે થાય છે."
    },
    subText: {
      en: "Helping every Indian navigate complex government procedures with confidence through trusted, verified guidance.",
      hi: "हर भारतीय को विश्वसनीय, सत्यापित मार्गदर्शन के माध्यम से जटिल सरकारी प्रक्रियाओं को आत्मविश्वास के साथ पूरा करने में मदद करना।",
      gu: "દરેક ભારતીયને વિશ્વસનીય, ચકાસાયેલ માર્ગદર્શન દ્વારા જટિલ સરકારી પ્રક્રિયાઓ આત્મવિશ્વાસ સાથે પૂર્ણ કરવામાં મદદ કરવી."
    },
    primaryBtn: {
      en: "Get Started",
      hi: "शुरू करें",
      gu: "શરૂ કરો"
    },
    secondaryBtn: {
      en: "How It Works",
      hi: "यह कैसे काम करता है",
      gu: "તે કેવી રીતે કામ કરે છે"
    },
    whyTitle: {
      en: "Why Pravartak?",
      hi: "प्रवर्तक क्यों?",
      gu: "શા માટે પ્રવર્તક?"
    },
    whySub: {
      en: "We bridge the gap between raw policy manuals and citizen confidence.",
      hi: "हम नीति पुस्तिकाओं और नागरिक आत्मविश्वास के बीच की दूरी को पाटते हैं।",
      gu: "અમે સત્તાવાર પોલિસી પુસ્તકો અને નાગરિકના આત્મવિશ્વાસ વચ્ચેના અંતરને દૂર કરીએ છીએ."
    },
    howTitle: {
      en: "How It Works",
      hi: "यह कैसे काम करता है",
      gu: "આ પ્રક્રિયા કેવી રીતે કામ કરે છે"
    },
    step1Title: { en: "1. Choose Language", hi: "1. भाषा चुनें", gu: "1. ભાષા પસંદ કરો" },
    step1Desc: { en: "Access all guides in English, Hindi, or Gujarati.", hi: "अंग्रेजी, हिंदी या गुजराती में सभी गाइडों तक पहुंचें।", gu: "અંગ્રેજી, હિન્દી અથવા ગુજરાતીમાં તમામ માર્ગદર્શિકા મેળવો." },
    step2Title: { en: "2. Ask Your Question", hi: "2. अपना प्रश्न पूछें", gu: "2. તમારો પ્રશ્ન પૂછો" },
    step2Desc: { en: "Search for driving licence, passport, business setup, and more.", hi: "ड्राइविंग लाइसेंस, पासपोर्ट, व्यवसाय सेटअप और अधिक खोजें।", gu: "ડ્રાઇવિંગ લાઇસન્સ, પાસપોર્ટ, વ્યવસાય અને વધુ માટે શોધો." },
    step3Title: { en: "3. Receive Verified Path", hi: "3. सत्यापित मार्ग प्राप्त करें", gu: "3. ચકાસાયેલ માર્ગ મેળવો" },
    step3Desc: { en: "View real timelines, document checklists, and community warnings.", hi: "वास्तविक समय सीमा, दस्तावेज़ चेकलिस्ट और सामुदायिक चेतावनियां देखें।", gu: "વાસ્તવિક સમય મર્યાદા, દસ્તાવેજ ચેકલિસ્ટ અને સમુદાયની ચેતવણીઓ જુઓ." },
    step4Title: { en: "4. Complete Your Process", hi: "4. अपनी प्रक्रिया पूरी करें", gu: "4. તમારી પ્રક્રિયા પૂર્ણ કરો" },
    step4Desc: { en: "Navigate to official portals with exact guidelines, bypassing agents.", hi: "बिचौलियों से बचते हुए, सटीक दिशा-निर्देशों के साथ आधिकारिक पोर्टल्स पर जाएं।", gu: "વચેટિયાઓને ટાળીને, ચોક્કસ માર્ગદર્શિકા સાથે સત્તાવાર પોર્ટલ પર જાઓ." }
  };

  return (
    <div className="bg-brand-ivory text-brand-slate font-sans flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-16 text-center space-y-8">
        <div className="flex flex-col items-center space-y-4">
          
          {/* Decorative Ink Stamp / Seal */}
          <div className="relative flex items-center justify-center w-24 h-24 select-none mb-2">
            {/* Outer dashed decorative ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-brand-forest/30 animate-[spin_180s_linear_infinite]" />
            {/* Middle double ring */}
            <div className="absolute inset-1.5 rounded-full border border-brand-forest/20" />
            <div className="absolute inset-2.5 rounded-full border-2 border-brand-forest/70" />
            {/* Inner fill */}
            <div className="absolute inset-3.5 rounded-full bg-white flex items-center justify-center font-serif text-brand-forest font-bold text-2xl shadow-warm-sm border border-brand-forest/10">
              प्र
            </div>
          </div>
          
          {/* Tagline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-forest tracking-tight font-medium max-w-3xl leading-tight">
            {t.tagline[language]}
          </h2>
          
          {/* Subtext */}
          <p className="text-base md:text-lg text-brand-slate/80 font-sans max-w-2xl leading-relaxed">
            {t.subText[language]}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigateTo('language')}
            className="w-full sm:w-auto px-8 py-3.5 bg-brand-forest text-white hover:bg-brand-forest/95 font-medium rounded-lg shadow-warm-sm transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>{t.primaryBtn[language]}</span>
            <ArrowRight size={16} />
          </button>
          
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-3.5 border border-brand-sage/30 hover:border-brand-sage bg-white/50 text-brand-forest font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>{t.secondaryBtn[language]}</span>
          </a>
        </div>

        {/* Calm Schematic/Process Visualizer Instead of Robots */}
        <div className="pt-8">
          <div className="w-full max-w-2xl mx-auto bg-white border border-brand-sage/15 rounded-xl p-6 md:p-8 shadow-warm-sm">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-brand-sage mb-4 text-left">
              The Path to Trust Checkpoint
            </p>
            
            {/* Custom SVG Path Diagram */}
            <svg 
              viewBox="0 0 600 120" 
              className="w-full h-auto stroke-brand-sage/40 fill-none text-brand-forest font-sans"
              role="img" 
              aria-label="Process navigation schematic showing documentation input converging to a verified stamp."
            >
              {/* Converging dotted guide paths */}
              <path d="M50,20 Q150,20 280,60" strokeDasharray="3,3" strokeWidth="1.5" />
              <path d="M50,100 Q150,100 280,60" strokeDasharray="3,3" strokeWidth="1.5" />
              <path d="M280,60 L480,60" strokeWidth="2" className="stroke-brand-forest/30" />
              
              {/* Start nodes */}
              <circle cx="50" cy="20" r="6" className="fill-white stroke-brand-sage stroke-2" />
              <text x="70" y="24" className="fill-brand-slate text-[10px] font-medium stroke-none">Official Gazette Feed</text>

              <circle cx="50" cy="100" r="6" className="fill-white stroke-brand-sage stroke-2" />
              <text x="70" y="104" className="fill-brand-slate text-[10px] font-medium stroke-none">Citizen Validation Logs</text>

              {/* Convergence node */}
              <circle cx="280" cy="60" r="8" className="fill-brand-sage/20 stroke-brand-forest stroke-2" />
              <text x="260" y="44" className="fill-brand-forest text-[9px] font-bold stroke-none">CONVERGENCE</text>

              {/* Verified Badge Node */}
              <circle cx="480" cy="60" r="14" className="fill-brand-forest stroke-brand-forest stroke-2" />
              {/* Small lock emblem check inside circle */}
              <path d="M476,60 L479,63 L485,57" stroke="white" strokeWidth="2.5" />
              <text x="502" y="64" className="fill-brand-forest text-[11px] font-bold stroke-none tracking-wide text-left">VERIFIED ROADMAP</text>
            </svg>
            
            <div className="flex justify-between items-center mt-6 border-t border-brand-sage/10 pt-4 text-left">
              <div className="flex items-center gap-2">
                <Landmark size={14} className="text-brand-sage" />
                <span className="text-[11px] text-brand-slate/85">No algorithmic guesses. Just structured legislation logic.</span>
              </div>
              <span className="text-[10px] text-brand-sage italic">Version 2.0.4</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Pravartak Section */}
      <section className="w-full bg-white py-20 px-6 md:px-12 border-y border-brand-sage/10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl font-serif text-brand-forest">{t.whyTitle[language]}</h2>
            <p className="text-sm text-brand-slate/85">{t.whySub[language]}</p>
          </div>

          {/* Asymmetric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VerifiedInfoCard language={language} />
            <TrustScoreCard language={language} />
            <CommunityInsightsCard language={language} />
            <StepByStepGuidanceCard language={language} />
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section id="how-it-works" className="w-full py-20 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-serif text-brand-forest">{t.howTitle[language]}</h2>
            <div className="w-12 h-0.5 bg-brand-sage mx-auto"></div>
          </div>

          {/* Timeline Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-white border border-brand-sage/10 rounded-lg p-6 relative shadow-warm-sm flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-brand-saffron tracking-wider uppercase">Stage 01</span>
                <h4 className="font-serif font-semibold text-base text-brand-forest">{t.step1Title[language]}</h4>
                <p className="text-xs text-brand-slate leading-relaxed">{t.step1Desc[language]}</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-brand-sage/10 rounded-lg p-6 relative shadow-warm-sm flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-brand-saffron tracking-wider uppercase">Stage 02</span>
                <h4 className="font-serif font-semibold text-base text-brand-forest">{t.step2Title[language]}</h4>
                <p className="text-xs text-brand-slate leading-relaxed">{t.step2Desc[language]}</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-brand-sage/10 rounded-lg p-6 relative shadow-warm-sm flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-brand-saffron tracking-wider uppercase">Stage 03</span>
                <h4 className="font-serif font-semibold text-base text-brand-forest">{t.step3Title[language]}</h4>
                <p className="text-xs text-brand-slate leading-relaxed">{t.step3Desc[language]}</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-brand-sage/10 rounded-lg p-6 relative shadow-warm-sm flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-brand-saffron tracking-wider uppercase">Stage 04</span>
                <h4 className="font-serif font-semibold text-base text-brand-forest">{t.step4Title[language]}</h4>
                <p className="text-xs text-brand-slate leading-relaxed">{t.step4Desc[language]}</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Secondary CTAs */}
      <section className="w-full bg-brand-forest/5 py-16 px-6 md:px-12 text-center border-t border-brand-sage/10">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-2xl font-serif text-brand-forest">Ready to navigate your first application?</h3>
          <p className="text-xs text-brand-slate max-w-md mx-auto">
            Choose a language preference and continue either as a registered user to track application history, or immediately as a guest.
          </p>
          <button
            onClick={() => navigateTo('language')}
            className="px-8 py-3 bg-brand-forest text-white hover:bg-brand-forest/95 font-medium rounded-lg shadow-warm-sm transition-colors"
          >
            {t.primaryBtn[language]}
          </button>
        </div>
      </section>

    </div>
  );
};
