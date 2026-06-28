import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { mockProcesses, searchSuggestions } from '../data/mockData';
import { 
  Search as SearchIcon, 
  Bookmark, 
  Clock, 
  Bell, 
  Calendar, 
  CheckCircle2
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    userPersona, 
    savedProcessIds, 
    navigateTo, 
    setSelectedProcess,
    setSearchQuery,
    language 
  } = useNavigation();

  const [inputVal, setInputVal] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const getPersonaGreeting = () => {
    switch (userPersona) {
      case 'student': return {
        title: { en: "Namaste, Citizen", hi: "नमस्ते, नागरिक", gu: "નમસ્તે, નાગરિક" },
        sub: { en: "Personalized student checklist: Licences & Educational scholarships", hi: "व्यक्तिगत छात्र चेकलिस्ट: लाइसेंस और शैक्षिक छात्रवृत्ति", gu: "વ્યક્તિગત વિદ્યાર્થી ચેકલિસ્ટ: લાઇસન્સ અને શૈક્ષણિક શિષ્યવૃત્તિ" }
      };
      case 'business': return {
        title: { en: "Welcome back", hi: "आपका स्वागत है", gu: "આપનું સ્વાગત છે" },
        sub: { en: "Commercial profile: GST, MSME compliance & trade permits", hi: "वाणिज्यिक प्रोफ़ाइल: जीएसटी, एमएसएमई अनुपालन और व्यापार परमिट", gu: "વ્યાવસાયિક પ્રોફાઇલ: GST, MSME પાલન અને વેપાર પરવાનગી" }
      };
      case 'senior': return {
        title: { en: "Welcome back", hi: "आपका स्वागत है", gu: "આપનું સ્વાગત છે" },
        sub: { en: "Elder portal: Pension tracking & national health scheme status", hi: "वरिष्ठ पोर्टल: पेंशन ट्रैकिंग और राष्ट्रीय स्वास्थ्य योजना की स्थिति", gu: "એલ્ડર પોર્ટલ: પેન્શન ટ્રેકિંગ અને રાષ્ટ્રીય આરોગ્ય યોજના સ્થિતિ" }
      };
      default: return {
        title: { en: "Namaste, Citizen", hi: "नमस्ते, नागरिक", gu: "નમસ્તે, નાગરિક" },
        sub: { en: "Quickly navigate and verify any central or state government procedure.", hi: "किसी भी केंद्र या राज्य सरकार की प्रक्रिया को शीघ्रता से नेविगेट और सत्यापित करें।", gu: "કોઈપણ કેન્દ્ર અથવા રાજ્ય સરકારની પ્રક્રિયાને ઝડપથી નેવિગેટ અને વેરિફાઈ કરો." }
      };
    }
  };

  const greeting = getPersonaGreeting();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isSearching) return;
    executeSearch(inputVal);
  };

  const executeSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, language })
      });
      if (response.ok) {
        const data = await response.json();
        setSelectedProcess(data);
      } else {
        const match = mockProcesses.find(p => 
          p.name.en.toLowerCase().includes(query.toLowerCase()) || 
          p.name.hi.toLowerCase().includes(query.toLowerCase()) ||
          p.name.gu.toLowerCase().includes(query.toLowerCase())
        );
        setSelectedProcess(match || null);
      }
    } catch (err) {
      console.error('Search request failed:', err);
      const match = mockProcesses.find(p => 
        p.name.en.toLowerCase().includes(query.toLowerCase()) ||
        p.name.hi.toLowerCase().includes(query.toLowerCase()) ||
        p.name.gu.toLowerCase().includes(query.toLowerCase())
      );
      setSelectedProcess(match || null);
    } finally {
      setIsSearching(false);
      navigateTo('results');
    }
  };

  // Filter autocomplete processes based on inputVal
  const autocompleteResults = inputVal.trim() 
    ? mockProcesses.filter(p => 
        p.name.en.toLowerCase().includes(inputVal.toLowerCase()) || 
        p.name.hi.toLowerCase().includes(inputVal.toLowerCase()) ||
        p.name.gu.toLowerCase().includes(inputVal.toLowerCase())
      )
    : [];

  const savedProcessesList = mockProcesses.filter(p => savedProcessIds.includes(p.id));

  // Government service updates feed
  const systemUpdates = [
    {
      id: "up1",
      tag: "CRITICAL",
      tagColor: "bg-rose-50 text-rose-800 border-rose-100",
      text: "Aadhaar SMS Gateway delay reported across major telecom operators (10:00 - 14:00 today). Try using email OTP for validation."
    },
    {
      id: "up2",
      tag: "NEW PROCEDURE",
      tagColor: "bg-emerald-50 text-emerald-800 border-emerald-100",
      text: "Instant e-PAN service extended to Non-Resident Indians (NRIs) with valid Aadhaar-linked phone lines."
    },
    {
      id: "up3",
      tag: "FEE UPDATE",
      tagColor: "bg-amber-50 text-amber-800 border-amber-100",
      text: "Driving License slot booking charges updated. RTO Gujarat has revised the physical test slot fee to ₹300."
    }
  ];

  return (
    <div className="bg-brand-ivory text-brand-slate font-sans min-h-screen py-8 px-6 md:px-12 max-w-6xl mx-auto space-y-8">
      
      {/* Welcome Card & Notification Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* Personalized Welcome Card */}
        <div className="bg-brand-forest text-brand-ivory p-6 rounded-xl md:col-span-2 flex flex-col justify-between shadow-warm-sm border border-brand-sage/10 relative overflow-hidden">
          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/10 rounded text-[10px] uppercase font-bold tracking-wider text-white">
              Sovereign Secure
            </div>
            <h2 className="text-3xl font-serif text-white tracking-tight">{greeting.title[language]}</h2>
            <p className="text-xs text-brand-ivory/70 leading-relaxed max-w-md">{greeting.sub[language]}</p>
          </div>
          
          <div className="mt-8 pt-4 border-t border-brand-sage/20 flex justify-between items-center text-[10px] text-brand-sage font-medium">
            <span>Last updated: today, 18:00</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-brand-sage" /> System Active</span>
          </div>
        </div>

        {/* System Alert Bulletin Board */}
        <div className="bg-white border border-brand-sage/20 p-6 rounded-xl shadow-warm-sm flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-brand-forest flex items-center gap-2">
              <Bell size={16} className="text-brand-saffron" /> Service Bulletins
            </h4>
            <div className="space-y-3 max-h-[140px] overflow-y-auto pr-1">
              {systemUpdates.map(up => (
                <div key={up.id} className="text-[11px] leading-relaxed border-b border-brand-sage/5 pb-2 last:border-0 last:pb-0">
                  <span className={`inline-block text-[8px] font-bold px-1.5 py-0.5 rounded border mr-1.5 ${up.tagColor}`}>
                    {up.tag}
                  </span>
                  <span>{up.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Central Large Search Experience */}
      <div className="bg-white border border-brand-sage/20 rounded-xl p-8 shadow-warm-md relative">
        <h3 className="text-xl font-serif text-brand-forest mb-4">Start a Verification Search</h3>
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <input
            type="text"
            disabled={isSearching}
            placeholder={isSearching ? "Pravartak is scanning official gazettes..." : "What government process do you need help with? (e.g. driving licence)"}
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              setShowAutocomplete(true);
            }}
            onFocus={() => setShowAutocomplete(true)}
            className="w-full pl-12 pr-28 py-3.5 text-sm bg-brand-ivory border border-brand-sage/20 rounded-lg focus:border-brand-sage shadow-inner disabled:opacity-75"
          />
          <SearchIcon className={`absolute left-4 text-brand-sage ${isSearching ? 'animate-pulse text-brand-saffron' : ''}`} size={18} />
          
          <button
            type="submit"
            disabled={isSearching}
            className="absolute right-2 px-5 py-2 bg-brand-forest text-white hover:bg-brand-forest/95 font-medium rounded-md text-xs transition-colors disabled:opacity-50 flex items-center gap-1.5"
          >
            {isSearching ? (
              <>
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Analyzing...</span>
              </>
            ) : (
              'Search'
            )}
          </button>

          {/* Autocomplete box */}
          {showAutocomplete && inputVal.trim() && (
            <div className="absolute top-[105%] left-0 right-0 bg-white border border-brand-sage/20 rounded-lg shadow-warm-lg z-50 overflow-hidden divide-y divide-brand-sage/5">
              {autocompleteResults.length > 0 ? (
                autocompleteResults.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setInputVal(p.name[language]);
                      executeSearch(p.name[language]);
                      setShowAutocomplete(false);
                    }}
                    className="w-full text-left px-5 py-3 hover:bg-brand-ivory text-xs flex justify-between items-center group transition-colors"
                  >
                    <span className="font-medium text-brand-forest group-hover:text-brand-saffron">{p.name[language]}</span>
                    <span className="text-[10px] text-brand-sage bg-brand-forest/5 px-2 py-0.5 rounded">{p.category}</span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-xs text-brand-slate/60 text-center italic">
                  No matching verified process found. Try searching "Driving Licence" or "Passport".
                </div>
              )}
            </div>
          )}
        </form>

        {/* Suggestion Pills */}
        <div className="mt-4 flex flex-wrap gap-2 items-center text-xs">
          <span className="text-brand-sage font-medium">Suggestions:</span>
          {searchSuggestions.map((sug, i) => (
            <button
              key={i}
              onClick={() => {
                setInputVal(sug.text);
                executeSearch(sug.text);
              }}
              className="px-3 py-1 bg-brand-ivory hover:bg-brand-sage/10 border border-brand-sage/15 text-brand-slate hover:text-brand-forest rounded-full transition-colors text-[11px] font-medium"
            >
              {sug.text}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Application Tracking and Saved Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Left Column (2/3): Continue Previous Process */}
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-brand-forest flex items-center gap-2">
              <Clock size={16} className="text-brand-sage" /> Ongoing Process Tracking
            </h3>
            
            {/* Custom Active Application Card */}
            <div className="bg-white border border-brand-sage/20 rounded-xl p-6 shadow-warm-sm flex flex-col justify-between space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-brand-saffron bg-brand-saffron/5 px-2 py-0.5 rounded border border-brand-saffron/10 tracking-wide uppercase">
                    Verification Stage
                  </span>
                  <h4 className="font-serif font-bold text-lg text-brand-forest mt-1.5">Learner's & Driving Licence</h4>
                  <p className="text-[11px] text-brand-slate/60">Ahmedabad Sub-RTO office application #GJ-24-2026-DL</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-brand-sage">Progress State</p>
                  <p className="text-xs font-bold text-brand-forest font-serif">50% Completed</p>
                </div>
              </div>

              {/* Progress Stepper Bar */}
              <div className="grid grid-cols-4 gap-2 relative">
                <div className="space-y-1">
                  <div className="h-1 bg-brand-forest rounded-full"></div>
                  <span className="block text-[8px] font-semibold text-brand-forest">1. Applied</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1 bg-brand-forest rounded-full"></div>
                  <span className="block text-[8px] font-semibold text-brand-forest">2. Learner's Test</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1 bg-brand-forest/20 rounded-full relative overflow-hidden">
                    <div className="bg-brand-saffron h-full w-1/2"></div>
                  </div>
                  <span className="block text-[8px] font-bold text-brand-saffron">3. Practice period</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1 bg-brand-forest/10 rounded-full"></div>
                  <span className="block text-[8px] font-semibold text-brand-slate/40">4. Track Test</span>
                </div>
              </div>

              {/* Next Immediate Action Notice */}
              <div className="bg-brand-ivory p-4 rounded-lg flex items-center justify-between text-xs border border-brand-sage/10">
                <div className="space-y-0.5">
                  <p className="font-semibold text-brand-forest flex items-center gap-1.5">
                    <Calendar size={12} className="text-brand-saffron" /> Practice period ends in 12 days
                  </p>
                  <p className="text-[10px] text-brand-slate">Next step: Book practical test slot on Sarathi Portal after July 10.</p>
                </div>
                <button
                  onClick={() => {
                    const dl = mockProcesses.find(p => p.id === 'driving-licence');
                    if (dl) {
                      setSelectedProcess(dl);
                      navigateTo('results');
                    }
                  }}
                  className="px-3.5 py-1.5 bg-brand-forest text-white hover:bg-brand-forest/95 rounded font-medium text-[10px] transition-colors"
                >
                  View Road Map
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1/3): Saved Guidelines & Quick Links */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-brand-forest flex items-center gap-2">
              <Bookmark size={16} className="text-brand-sage" /> Saved Navigations
            </h3>

            {savedProcessesList.length > 0 ? (
              <div className="space-y-3">
                {savedProcessesList.map(p => (
                  <div 
                    key={p.id} 
                    onClick={() => {
                      setSelectedProcess(p);
                      navigateTo('results');
                    }}
                    className="p-4 bg-white border border-brand-sage/15 rounded-xl hover:border-brand-sage hover:shadow-warm-sm cursor-pointer transition-all duration-200 group flex justify-between items-center"
                  >
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-xs text-brand-forest group-hover:text-brand-saffron transition-colors">
                        {p.name[language]}
                      </h4>
                      <p className="text-[10px] text-brand-sage">{p.category} Portal</p>
                    </div>
                    <span className="text-[10px] font-bold text-brand-forest font-serif bg-brand-forest/5 px-2 py-0.5 rounded">
                      {p.trustScore}% Trust
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-brand-sage/10 p-6 rounded-xl text-center text-xs text-brand-slate/60 italic">
                No guides saved yet. Search for a process and click the save button.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
