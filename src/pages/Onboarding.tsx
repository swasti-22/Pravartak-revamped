import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import type { UserPersona } from '../context/NavigationContext';
import { GraduationCap, Landmark, Briefcase, HeartHandshake } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const { setUserPersona, navigateTo, language } = useNavigation();

  const handleSelectPersona = (persona: UserPersona) => {
    setUserPersona(persona);
    navigateTo('dashboard');
  };

  const labels = {
    title: {
      en: "Help Us Personalize Your Trust Dashboard",
      hi: "अपने ट्रस्ट डैशबोर्ड को वैयक्तिकृत करने में हमारी सहायता करें",
      gu: "તમારા ટ્રસ્ટ ડેશબોર્ડને વ્યક્તિગત કરવામાં અમને સહાય કરો"
    },
    sub: {
      en: "Select the profile that best matches your primary requirements. This helps us prioritize updates and guidelines relevant to you.",
      hi: "उस प्रोफ़ाइल का चयन करें जो आपकी प्राथमिक आवश्यकताओं से सबसे मेल खाती है। इससे हमें आपके लिए प्रासंगिक अपडेट और दिशानिर्देशों को प्राथमिकता देने में मदद मिलती है।",
      gu: "તમારી પ્રાથમિક જરૂરિયાતોને સૌથી વધુ બંધબેસતી પ્રોફાઇલ પસંદ કરો. આ અમને તમારા માટે સુસંગત અપડેટ્સ અને માર્ગદર્શિકાને પ્રાધાન્ય આપવામાં મદદ કરે છે."
    },
    skip: { en: "Skip personalization & view all services", hi: "निजीकरण छोड़ें और सभी सेवाएं देखें", gu: "વ્યક્તિગતકરણ છોડીને બધી સેવાઓ જુઓ" }
  };

  const personasList = [
    {
      id: 'student' as UserPersona,
      title: { en: "Student / Youth", hi: "छात्र / युवा", gu: "વિદ્યાર્થી / યુવા" },
      desc: { en: "Scholarships, driving licenses, educational boards, exam registrations.", hi: "छात्रवृत्ति, ड्राइविंग लाइसेंस, शैक्षिक बोर्ड, परीक्षा पंजीकरण।", gu: "શિષ્યવૃત્તિ, ડ્રાઇવિંગ લાઇસન્સ, શૈક્ષણિક બોર્ડ, પરીક્ષા નોંધણી." },
      icon: GraduationCap,
      color: "bg-emerald-50 text-emerald-800 border-emerald-100"
    },
    {
      id: 'general' as UserPersona,
      title: { en: "General Citizen", hi: "सामान्य नागरिक", gu: "સામાન્ય નાગરિક" },
      desc: { en: "Passports, voter IDs, PAN cards, property tax, driving licenses, RTIs.", hi: "पासपोर्ट, वोटर आईडी, पैन कार्ड, संपत्ति कर, ड्राइविंग लाइसेंस, आरटीआई।", gu: "પાસપોર્ટ, વોટર આઈડી, પાન કાર્ડ, પ્રોપર્ટી ટેક્સ, ડ્રાઇવિંગ લાઇસન્સ, RTI." },
      icon: Landmark,
      color: "bg-blue-50 text-blue-800 border-blue-100"
    },
    {
      id: 'business' as UserPersona,
      title: { en: "Business Owner", hi: "व्यवसाय स्वामी", gu: "વ્યવસાય માલિક" },
      desc: { en: "MSME registration, GST tax registration, digital signature certificates, trade permits.", hi: "एमएसएमई पंजीकरण, जीएसटी कर पंजीकरण, डिजिटल हस्ताक्षर प्रमाण पत्र, व्यापार परमिट।", gu: "MSME નોંધણી, GST ટેક્સ નોંધણી, ડિજિટલ સિગ્નેચર સર્ટિફિકેટ્સ, વેપાર પરવાનગી." },
      icon: Briefcase,
      color: "bg-amber-50 text-amber-800 border-amber-100"
    },
    {
      id: 'senior' as UserPersona,
      title: { en: "Senior Citizen", hi: "वरिष्ठ नागरिक", gu: "વરિષ્ઠ નાગરિક" },
      desc: { en: "Pension plans, CGHS health cards, savings schemes, travel concessions.", hi: "पेंशन योजनाएं, सीजीएचएस स्वास्थ्य कार्ड, बचत योजनाएं, यात्रा रियायतें।", gu: "પેન્શન યોજનાઓ, CGHS હેલ્થ કાર્ડ, બચત યોજનાઓ, મુસાફરી કન્સેશન." },
      icon: HeartHandshake,
      color: "bg-rose-50 text-rose-800 border-rose-100"
    }
  ];

  return (
    <div className="bg-brand-ivory text-brand-slate font-sans min-h-[75vh] flex flex-col justify-center items-center px-6 py-12">
      <div className="w-full max-w-3xl space-y-10">
        
        {/* Intro */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-serif text-brand-forest">
            {labels.title[language]}
          </h2>
          <p className="text-xs text-brand-slate/75 max-w-lg mx-auto leading-relaxed">
            {labels.sub[language]}
          </p>
        </div>

        {/* Persona Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personasList.map((persona) => {
            const Icon = persona.icon;
            return (
              <button
                key={persona.id}
                onClick={() => handleSelectPersona(persona.id)}
                className="flex gap-4 p-6 bg-white border border-brand-sage/20 rounded-xl hover:border-brand-sage shadow-warm-sm hover:shadow-warm-md text-left transition-all duration-200 group"
              >
                <div className={`p-3.5 rounded-lg flex items-center justify-center border h-fit ${persona.color}`}>
                  <Icon size={22} />
                </div>
                
                <div className="space-y-1.5 flex-1">
                  <h4 className="font-serif font-bold text-base text-brand-forest group-hover:text-brand-saffron transition-colors">
                    {persona.title[language]}
                  </h4>
                  <p className="text-xs text-brand-slate/80 leading-relaxed">
                    {persona.desc[language]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Skip option */}
        <div className="text-center">
          <button
            onClick={() => handleSelectPersona(null)}
            className="text-xs text-brand-sage hover:text-brand-forest hover:underline font-semibold"
          >
            {labels.skip[language]} &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
