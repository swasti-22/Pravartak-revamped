import React from 'react';
import { ShieldCheck, Percent, MessageSquare, Landmark, Clock, FileText } from 'lucide-react';

interface CardProps {
  language: 'en' | 'hi' | 'gu';
}

const translations = {
  verified: {
    title: { en: "Verified Information", hi: "सत्यापित जानकारी", gu: "ચકાસાયેલ માહિતી" },
    desc: {
      en: "Every procedure is mapped directly from official gazettes and ministry portals. No outdated guidelines.",
      hi: "हर प्रक्रिया सीधे आधिकारिक राजपत्रों और मंत्रालय के पोर्टल्स से ली गई है। कोई पुराने दिशानिर्देश नहीं।",
      gu: "દરેક પ્રક્રિયા સીધી સત્તાવાર ગેઝેટ અને મંત્રાલયના પોર્ટલ પરથી લેવામાં આવી છે. કોઈ જૂની માર્ગદર્શિકા નથી."
    },
    meta: { en: "Updated daily by expert policy researchers", hi: "नीति शोधकर्ताओं द्वारा दैनिक अपडेटेड", gu: "નીતિ સંશોધકો દ્વારા દૈનિક અપડેટ થાય છે" }
  },
  trust: {
    title: { en: "Trust Score Index", hi: "विश्वास स्कोर सूचकांक", gu: "ટ્રસ્ટ સ્કોર ઇન્ડેક્સ" },
    desc: {
      en: "A calculated confidence metric based on official data alignment, community success rate, and active risk alerts.",
      hi: "आधिकारिक डेटा संरेखण, सामुदायिक सफलता दर और सक्रिय जोखिम अलर्ट पर आधारित एक गणनाकृत आत्मविश्वास मीट्रिक।",
      gu: "સત્તાવાર ડેટા સંરેખણ, સમુદાય સફળતા દર અને સક્રિય જોખમ ચેતવણીઓ પર આધારિત ગણતરી કરેલ આત્મવિશ્વાસ મેટ્રિક."
    }
  },
  community: {
    title: { en: "Community Insights", hi: "सामुदायिक अंतर्दृष्टि", gu: "સમુદાય ઇનસાઇટ્સ" },
    desc: {
      en: "Real-world warnings, daily queue wait times, and documents check notes shared by citizens who just completed the process.",
      hi: "वास्तविक दुनिया की चेतावनियां, दैनिक कतार प्रतीक्षा समय, और हाल ही में प्रक्रिया पूरी करने वाले नागरिकों द्वारा साझा किए गए दस्तावेज़ नोट।",
      gu: "તાજેતરમાં પ્રક્રિયા પૂર્ણ કરનાર નાગરિકો દ્વારા શેર કરાયેલ વાસ્તવિક દુનિયાની ચેતવણીઓ, કતારમાં પ્રતીક્ષા સમય અને દસ્તાવેજોની નોંધો."
    }
  },
  guidance: {
    title: { en: "Step-by-Step Roadmaps", hi: "चरण-दर-चरण रोडमैप", gu: "પગલું-દર-પગલું રોડમેપ" },
    desc: {
      en: "No vague instructions. We break down the path into online vs physical actions, highlighting costs, durations, and exact links.",
      hi: "कोई अस्पष्ट निर्देश नहीं। हम मार्ग को ऑनलाइन बनाम भौतिक क्रियाओं में विभाजित करते हैं, जिसमें लागत, अवधि और सटीक लिंक शामिल हैं।",
      gu: "કોઈ અસ્પષ્ટ સૂચનાઓ નથી. અમે ખર્ચ, સમયગાળો અને ચોક્કસ લિંક્સ દર્શાવીને ઓનલાઇન વિરુદ્ધ ભૌતિક ક્રિયાઓમાં પાથને વિભાજીત કરીએ છીએ."
    }
  }
};

export const VerifiedInfoCard: React.FC<CardProps> = ({ language }) => {
  const t = translations.verified;
  return (
    <div className="bg-white border border-brand-sage/20 rounded-xl p-8 shadow-warm-sm hover:shadow-warm-md transition-shadow flex flex-col md:flex-row gap-6 items-stretch relative overflow-hidden group">
      {/* Decorative watermark */}
      <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-brand-forest/[0.03] select-none font-serif text-[120px] font-bold leading-none pointer-events-none group-hover:text-brand-saffron/[0.03] transition-colors duration-300">
        प्र
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-forest/5 text-brand-forest rounded-full text-xs font-medium mb-4">
            <ShieldCheck size={14} className="text-brand-forest" />
            <span>{language === 'en' ? 'Pillar I' : language === 'hi' ? 'स्तंभ I' : 'સ્તંભ I'}</span>
          </div>
          <h3 className="text-2xl font-serif text-brand-forest mb-3 leading-tight">{t.title[language]}</h3>
          <p className="text-sm text-brand-slate/85 font-sans leading-relaxed">{t.desc[language]}</p>
        </div>
        <div className="mt-6 pt-4 border-t border-brand-sage/10 text-xs text-brand-sage font-medium italic">
          {t.meta[language]}
        </div>
      </div>
      
      {/* Handcrafted custom interactive element representing official source data alignment */}
      <div className="w-full md:w-64 bg-brand-ivory rounded-lg border border-brand-sage/10 p-4 flex flex-col justify-between text-xs font-sans gap-4">
        <div className="flex justify-between items-center pb-2 border-b border-brand-sage/10">
          <span className="font-semibold text-brand-forest flex items-center gap-1">
            <Landmark size={12} /> Gazette Tracker
          </span>
          <span className="text-brand-saffron bg-brand-saffron/5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">LIVE</span>
        </div>
        <div className="space-y-2">
          <div className="p-2 bg-white rounded border border-brand-sage/5">
            <p className="text-[10px] font-semibold text-brand-forest">MoRTH Notification #4928</p>
            <p className="text-[9px] text-brand-slate mt-0.5">DL renewal terms updated</p>
            <p className="text-[8px] text-brand-sage font-mono mt-1">Verified: 4 hours ago</p>
          </div>
          <div className="p-2 bg-white rounded border border-brand-sage/5 opacity-60">
            <p className="text-[10px] font-semibold text-brand-forest">MEA Circular #883</p>
            <p className="text-[9px] text-brand-slate mt-0.5">Tatkaal slot allocation revised</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TrustScoreCard: React.FC<CardProps> = ({ language }) => {
  const t = translations.trust;
  return (
    <div className="bg-white border border-brand-sage/20 rounded-xl p-8 shadow-warm-sm hover:shadow-warm-md transition-shadow flex flex-col justify-between h-full relative overflow-hidden group">
      {/* Decorative watermark */}
      <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-brand-forest/[0.03] select-none font-serif text-[120px] font-bold leading-none pointer-events-none group-hover:text-brand-saffron/[0.03] transition-colors duration-300">
        त
      </div>
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-forest/5 text-brand-forest rounded-full text-xs font-medium mb-4">
          <Percent size={14} className="text-brand-forest" />
          <span>{language === 'en' ? 'Pillar II' : language === 'hi' ? 'स्तंभ II' : 'સ્તંભ II'}</span>
        </div>
        <h3 className="text-2xl font-serif text-brand-forest mb-3 leading-tight">{t.title[language]}</h3>
        <p className="text-sm text-brand-slate/85 font-sans leading-relaxed mb-6">{t.desc[language]}</p>
      </div>

      {/* Handcrafted trust index mockup */}
      <div className="bg-brand-ivory/50 rounded-lg p-5 border border-brand-sage/10 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-brand-forest">DL Processing Confidence</span>
          <span className="text-sm font-serif font-bold text-brand-forest">97%</span>
        </div>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-[10px] text-brand-slate mb-1">
              <span>Official Alignment</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-brand-sage/20 h-1 rounded-full overflow-hidden">
              <div className="bg-brand-forest h-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[10px] text-brand-slate mb-1">
              <span>Citizen Success Metric</span>
              <span>94%</span>
            </div>
            <div className="w-full bg-brand-sage/20 h-1 rounded-full overflow-hidden">
              <div className="bg-brand-forest h-full" style={{ width: '94%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CommunityInsightsCard: React.FC<CardProps> = ({ language }) => {
  const t = translations.community;
  return (
    <div className="bg-white border border-brand-sage/20 rounded-xl p-8 shadow-warm-sm hover:shadow-warm-md transition-shadow flex flex-col justify-between h-full relative overflow-hidden group">
      {/* Decorative watermark */}
      <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-brand-forest/[0.03] select-none font-serif text-[120px] font-bold leading-none pointer-events-none group-hover:text-brand-saffron/[0.03] transition-colors duration-300">
        स
      </div>
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-forest/5 text-brand-forest rounded-full text-xs font-medium mb-4">
          <MessageSquare size={14} className="text-brand-forest" />
          <span>{language === 'en' ? 'Pillar III' : language === 'hi' ? 'स्तंभ III' : 'સ્તંભ III'}</span>
        </div>
        <h3 className="text-2xl font-serif text-brand-forest mb-3 leading-tight">{t.title[language]}</h3>
        <p className="text-sm text-brand-slate/85 font-sans leading-relaxed mb-6">{t.desc[language]}</p>
      </div>

      {/* Handcrafted micro citizen review log */}
      <div className="space-y-2">
        <div className="p-3 bg-brand-ivory rounded border-l-2 border-brand-saffron text-xs">
          <div className="flex justify-between items-center text-[10px] text-brand-sage font-medium mb-1">
            <span>By S. Iyer (Passport applicant)</span>
            <span>Yesterday</span>
          </div>
          <p className="text-brand-slate text-[11px] leading-relaxed italic">
            "Poops PSK center had an offline server for 20 mins. Carry cash for tea, the digital billing machine went down."
          </p>
        </div>
        <div className="p-3 bg-brand-ivory rounded border-l-2 border-brand-forest text-xs">
          <div className="flex justify-between items-center text-[10px] text-brand-sage font-medium mb-1">
            <span>By K. Patel (MSME application)</span>
            <span>2 days ago</span>
          </div>
          <p className="text-brand-slate text-[11px] leading-relaxed italic">
            "Aadhaar linkage OTP can fail on Safari browser. Use Chrome, saved me 3 hours of retries."
          </p>
        </div>
      </div>
    </div>
  );
};

export const StepByStepGuidanceCard: React.FC<CardProps> = ({ language }) => {
  const t = translations.guidance;
  return (
    <div className="bg-white border border-brand-sage/20 rounded-xl p-8 shadow-warm-sm hover:shadow-warm-md transition-shadow flex flex-col md:flex-row gap-6 items-stretch col-span-1 md:col-span-2 relative overflow-hidden group">
      {/* Decorative watermark */}
      <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-brand-forest/[0.03] select-none font-serif text-[160px] font-bold leading-none pointer-events-none group-hover:text-brand-saffron/[0.03] transition-colors duration-300">
        मा
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-forest/5 text-brand-forest rounded-full text-xs font-medium mb-4">
            <Landmark size={14} className="text-brand-forest" />
            <span>{language === 'en' ? 'Pillar IV' : language === 'hi' ? 'स्तंभ IV' : 'સ્તંભ IV'}</span>
          </div>
          <h3 className="text-2xl font-serif text-brand-forest mb-3 leading-tight">{t.title[language]}</h3>
          <p className="text-sm text-brand-slate/85 font-sans leading-relaxed">{t.desc[language]}</p>
        </div>
        
        <div className="mt-6 flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-forest">
            <Clock size={12} />
            <span>Real Duration estimates</span>
          </div>
          <span className="w-1.5 h-1.5 bg-brand-sage rounded-full"></span>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-forest">
            <FileText size={12} />
            <span>Document Checklists</span>
          </div>
        </div>
      </div>

      {/* Vertical Stepper layout */}
      <div className="w-full md:w-80 bg-brand-ivory rounded-lg border border-brand-sage/10 p-5 font-sans text-xs space-y-4">
        <div className="relative pl-6 border-l border-brand-sage/20 space-y-4">
          <div className="relative">
            <div className="absolute -left-[30px] top-0.5 bg-brand-forest text-white w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-bold">1</div>
            <div>
              <p className="font-semibold text-brand-forest">Pre-requisite Check</p>
              <p className="text-[10px] text-brand-slate mt-0.5">Collect documents & verify Aadhaar linkage.</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-[30px] top-0.5 bg-brand-sage text-white w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-bold">2</div>
            <div>
              <p className="font-semibold text-brand-forest">Online submission</p>
              <p className="text-[10px] text-brand-slate mt-0.5">Enter details and secure government reference number.</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-[30px] top-0.5 bg-brand-sage/40 text-brand-forest w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-bold">3</div>
            <div>
              <p className="font-semibold text-brand-slate">Physical Checkpoint</p>
              <p className="text-[10px] text-brand-slate/60 mt-0.5">Biometrics and official document validation at desk.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
