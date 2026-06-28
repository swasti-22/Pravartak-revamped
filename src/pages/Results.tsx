import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { mockProcesses } from '../data/mockData';
import { 
  Bookmark, 
  BookmarkCheck,
  CheckCircle,
  AlertTriangle,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MapPin,
  Laptop,
  HelpCircle,
  DollarSign,
  ChevronLeft,
  AlertOctagon
} from 'lucide-react';

export const Results: React.FC = () => {
  const { 
    selectedProcess, 
    savedProcessIds, 
    toggleSaveProcess, 
    language, 
    navigateTo 
  } = useNavigation();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // If no process is selected (e.g., empty search query or unmapped topic)
  if (!selectedProcess) {
    return (
      <div className="bg-brand-ivory text-brand-slate font-sans min-h-[70vh] flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-md bg-white border border-brand-sage/20 rounded-xl p-8 text-center space-y-6 shadow-warm-md">
          <div className="w-12 h-12 rounded-full bg-brand-saffron/10 text-brand-saffron flex items-center justify-center mx-auto">
            <AlertOctagon size={24} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-serif text-brand-forest">No Verified Path Found</h3>
            <p className="text-xs text-brand-slate/75 leading-relaxed">
              We couldn't locate a verified timeline for this specific process. Our policy analysts are constantly mapping new procedures.
            </p>
          </div>
          <div className="space-y-3 pt-4 border-t border-brand-sage/10 text-xs">
            <p className="text-[11px] text-brand-sage font-medium">Popular Verified Searches:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {mockProcesses.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    // Force navigation to this process
                    navigateTo('dashboard');
                  }}
                  className="px-3 py-1 bg-brand-ivory border border-brand-sage/10 text-brand-forest rounded-full font-medium"
                >
                  {p.name[language]}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-full py-2 bg-brand-forest text-white hover:bg-brand-forest/95 font-medium rounded-lg text-xs"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isSaved = savedProcessIds.includes(selectedProcess.id);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-brand-ivory text-brand-slate font-sans py-8 px-6 md:px-12 max-w-6xl mx-auto space-y-8">
      
      {/* Back & Title Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-brand-sage/15 pb-6">
        <div className="space-y-2">
          <button 
            onClick={() => navigateTo('dashboard')}
            className="text-xs text-brand-sage hover:text-brand-forest flex items-center gap-1 font-semibold"
          >
            <ChevronLeft size={14} /> Back to Dashboard
          </button>
          
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-serif text-brand-forest tracking-tight m-0">{selectedProcess.name[language]}</h1>
            <span className="text-[10px] text-brand-sage bg-brand-forest/5 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              {selectedProcess.category} Portal
            </span>
          </div>
          <p className="text-xs text-brand-slate/75 max-w-2xl leading-relaxed">{selectedProcess.description[language]}</p>
        </div>

        {/* Save Toggle */}
        <button
          onClick={() => toggleSaveProcess(selectedProcess.id)}
          className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-xs font-semibold shadow-warm-sm transition-all duration-200 ${isSaved ? 'bg-brand-forest/5 border-brand-forest text-brand-forest' : 'bg-white border-brand-sage/20 hover:border-brand-sage text-brand-slate'}`}
        >
          {isSaved ? (
            <>
              <BookmarkCheck size={14} className="text-brand-forest" />
              <span>Saved in Portal</span>
            </>
          ) : (
            <>
              <Bookmark size={14} className="text-brand-sage" />
              <span>Save Guideline</span>
            </>
          )}
        </button>
      </div>

      {/* Main Grid: Asymmetric Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column (2/3): Timeline & Road Map */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Timeline Section */}
          <div className="bg-white border border-brand-sage/20 rounded-xl p-6 md:p-8 shadow-warm-sm space-y-6">
            <div className="space-y-1 pb-4 border-b border-brand-sage/10">
              <h3 className="text-xl font-serif text-brand-forest">Verification Road Map</h3>
              <p className="text-xs text-brand-slate/60">Chronological path verified with Ministry standards</p>
            </div>

            {/* Vertical timeline details */}
            <div className="relative pl-8 border-l border-brand-sage/25 space-y-8">
              {selectedProcess.steps.map((step, idx) => {
                const isOnline = step.actionType === 'online';
                const isPhysical = step.actionType === 'physical';
                return (
                  <div key={idx} className="relative space-y-3">
                    
                    {/* Circle counter tag */}
                    <div className={`absolute -left-[45px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-serif font-bold text-xs shadow-warm-sm ${idx === 0 ? 'bg-brand-forest border-brand-forest text-white' : 'bg-white border-brand-sage/30 text-brand-slate'}`}>
                      {step.stepNumber}
                    </div>

                    {/* Step details header */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="space-y-1">
                        <h4 className="font-serif font-bold text-base text-brand-forest">{step.title[language]}</h4>
                        <div className="flex flex-wrap gap-2 items-center text-[10px]">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold border ${isOnline ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : isPhysical ? 'bg-amber-50 text-amber-800 border-amber-100' : 'bg-indigo-50 text-indigo-800 border-indigo-100'}`}>
                            {isOnline ? <Laptop size={10} /> : <MapPin size={10} />}
                            {step.actionType.toUpperCase()}
                          </span>
                          <span className="text-brand-sage flex items-center gap-0.5 font-medium"><Clock size={10} /> {step.duration[language]}</span>
                          <span className="text-brand-sage flex items-center gap-0.5 font-medium"><DollarSign size={10} /> {step.cost[language]}</span>
                        </div>
                      </div>
                      
                      {step.officialLink && (
                        <a 
                          href={step.officialLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] text-brand-saffron hover:underline font-bold"
                        >
                          Official Portal <ExternalLink size={10} />
                        </a>
                      )}
                    </div>

                    {/* Step description */}
                    <p className="text-xs text-brand-slate leading-relaxed bg-brand-ivory/20 p-3 rounded border border-brand-sage/5">
                      {step.description[language]}
                    </p>

                  </div>
                );
              })}
            </div>
          </div>

          {/* FAQs section */}
          <div className="bg-white border border-brand-sage/20 rounded-xl p-6 md:p-8 shadow-warm-sm space-y-6">
            <h3 className="text-xl font-serif text-brand-forest pb-4 border-b border-brand-sage/10 flex items-center gap-2">
              <HelpCircle size={18} className="text-brand-sage" /> Frequently Asked Questions
            </h3>
            <div className="divide-y divide-brand-sage/10">
              {selectedProcess.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex justify-between items-center text-left text-xs font-semibold text-brand-forest hover:text-brand-saffron transition-colors"
                    >
                      <span>{faq.question[language]}</span>
                      {isOpen ? <ChevronUp size={14} className="text-brand-sage" /> : <ChevronDown size={14} className="text-brand-sage" />}
                    </button>
                    {isOpen && (
                      <p className="mt-2.5 text-xs text-brand-slate leading-relaxed pl-1 animate-fade-in">
                        {faq.answer[language]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column (1/3): Trust stats, Documents, Risks & Tips */}
        <div className="space-y-8">
          
          {/* Trust Score Breakdown */}
          <div className="bg-white border border-brand-sage/20 rounded-xl p-6 shadow-warm-sm space-y-4">
            <h4 className="font-serif font-bold text-sm text-brand-forest border-b border-brand-sage/10 pb-2">Verification Trust Index</h4>
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-4 border-brand-forest flex items-center justify-center font-serif text-lg font-bold text-brand-forest bg-brand-forest/5 shadow-inner">
                {selectedProcess.trustScore}%
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-brand-forest">Extremely Trustworthy</p>
                <p className="text-[10px] text-brand-slate">Aligned with gazette updates</p>
              </div>
            </div>

            <div className="space-y-3 pt-3 text-[11px]">
              <div>
                <div className="flex justify-between text-brand-slate mb-1">
                  <span>Official Gazette Linkage</span>
                  <span className="font-semibold text-brand-forest">100%</span>
                </div>
                <div className="w-full bg-brand-sage/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand-forest h-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-brand-slate mb-1">
                  <span>Citizen Validation Ratio</span>
                  <span className="font-semibold text-brand-forest">96%</span>
                </div>
                <div className="w-full bg-brand-sage/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand-forest h-full" style={{ width: '96%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Required Documents Card */}
          <div className="bg-white border border-brand-sage/20 rounded-xl p-6 shadow-warm-sm space-y-4">
            <h4 className="font-serif font-bold text-sm text-brand-forest border-b border-brand-sage/10 pb-2">Required Documents Checklist</h4>
            <div className="space-y-3">
              {selectedProcess.requiredDocuments.map((doc, idx) => (
                <div key={idx} className="flex gap-2.5 items-start text-xs border-b border-brand-sage/5 pb-2.5 last:border-0 last:pb-0">
                  <div className="mt-0.5">
                    <CheckCircle size={14} className={doc.isMandatory ? "text-brand-forest" : "text-brand-sage"} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-brand-forest">{doc.name[language]}</span>
                      <span className={`text-[8px] font-bold px-1 py-0.2 rounded border ${doc.isMandatory ? 'bg-brand-forest/5 border-brand-forest/20 text-brand-forest' : 'bg-brand-sage/5 border-brand-sage/20 text-brand-sage'}`}>
                        {doc.isMandatory ? 'MANDATORY' : 'OPTIONAL'}
                      </span>
                    </div>
                    <p className="text-[10px] text-brand-slate mt-0.5 leading-relaxed">{doc.description[language]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Potential Risks/Red Flags */}
          <div className="bg-white border border-brand-sage/20 rounded-xl p-6 shadow-warm-sm space-y-4">
            <h4 className="font-serif font-bold text-sm text-brand-forest border-b border-brand-sage/10 pb-2 flex items-center gap-1.5">
              <AlertTriangle size={15} className="text-brand-saffron" /> Red Flags & Warnings
            </h4>
            <div className="space-y-4">
              {selectedProcess.potentialRisks.map((risk, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-xs font-bold text-brand-forest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-saffron rounded-full"></span>
                    {risk.title[language]}
                  </p>
                  <p className="text-[10px] text-brand-slate leading-relaxed bg-brand-saffron/5 p-2.5 rounded border border-brand-saffron/10">
                    {risk.description[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Community Tips */}
          <div className="bg-white border border-brand-sage/20 rounded-xl p-6 shadow-warm-sm space-y-4">
            <h4 className="font-serif font-bold text-sm text-brand-forest border-b border-brand-sage/10 pb-2">Community Tips</h4>
            <div className="space-y-3">
              {selectedProcess.communityTips.map((tip, idx) => (
                <div key={idx} className="p-3 bg-brand-ivory rounded text-[11px] space-y-1">
                  <div className="flex justify-between items-center text-[9px] text-brand-sage font-medium">
                    <span>{tip.author}</span>
                    <span>{tip.date}</span>
                  </div>
                  <p className="text-brand-slate leading-relaxed italic">
                    "{tip.text[language]}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
