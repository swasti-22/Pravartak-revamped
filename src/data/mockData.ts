export interface Translation {
  en: string;
  hi: string;
  gu: string;
}

export interface Document {
  name: Translation;
  description: Translation;
  isMandatory: boolean;
}

export interface Step {
  stepNumber: number;
  title: Translation;
  description: Translation;
  duration: Translation;
  cost: Translation;
  actionType: 'online' | 'physical' | 'hybrid';
  officialLink?: string;
}

export interface CommunityTip {
  author: string;
  date: string;
  text: Translation;
}

export interface Risk {
  title: Translation;
  description: Translation;
}

export interface FAQ {
  question: Translation;
  answer: Translation;
}

export interface Process {
  id: string;
  name: Translation;
  category: string;
  description: Translation;
  trustScore: number;
  officialSources: { name: string; url: string }[];
  requiredDocuments: Document[];
  steps: Step[];
  communityTips: CommunityTip[];
  potentialRisks: Risk[];
  faqs: FAQ[];
}

export const mockProcesses: Process[] = [
  {
    id: "driving-licence",
    name: {
      en: "Learner's & Driving Licence",
      hi: "लर्निंग और ड्राइविंग लाइसेंस",
      gu: "લર્નિંગ અને ડ્રાઇવિંગ લાયસન્સ"
    },
    category: "Transport",
    description: {
      en: "The official process to apply for a motor vehicle driving license in India through the Sarathi Parivahan platform.",
      hi: "सारथी परिवहन प्लेटफॉर्म के माध्यम से भारत में मोटर वाहन ड्राइविंग लाइसेंस के लिए आवेदन करने की आधिकारिक प्रक्रिया।",
      gu: "સારથી પરિવહન પ્લેટફોર્મ દ્વારા ભારતમાં મોટર વાહન ડ્રાઇવિંગ લાઇસન્સ માટે અરજી કરવાની સત્તાવાર પ્રક્રિયા."
    },
    trustScore: 97,
    officialSources: [
      { name: "Ministry of Road Transport & Highways (MoRTH)", url: "https://sarathi.parivahan.gov.in" }
    ],
    requiredDocuments: [
      {
        name: { en: "Aadhaar Card", hi: "आधार कार्ड", gu: "આધાર કાર્ડ" },
        description: { en: "Used for instant online identity and address verification.", hi: "तत्काल ऑनलाइन पहचान और पते के सत्यापन के लिए उपयोग किया जाता है।", gu: "ત્વરિત ઓનલાઇન ઓળખ અને સરનામાની ચકાસણી માટે વપરાય છે." },
        isMandatory: true
      },
      {
        name: { en: "Form 1A (Medical Certificate)", hi: "फॉर्म 1A (चिकित्सा प्रमाणपत्र)", gu: "ફોર્મ 1A (મેડિકલ સર્ટિફિકેટ)" },
        description: { en: "Required if you are over 40 years old, signed by a registered government doctor.", hi: "यदि आपकी आयु 40 वर्ष से अधिक है, तो पंजीकृत सरकारी डॉक्टर द्वारा हस्ताक्षरित आवश्यक है।", gu: "જો તમારી ઉંમર 40 વર્ષથી વધુ હોય, તો રજિસ્ટર્ડ સરકારી ડૉક્ટર દ્વારા હસ્તાક્ષરિત જરૂરી છે." },
        isMandatory: false
      },
      {
        name: { en: "Proof of Address", hi: "पते का प्रमाण", gu: "સરનામાનો પુરાવો" },
        description: { en: "Electricity bill, voter ID, or passport (if Aadhaar is not linked to current address).", hi: "बिजली बिल, वोटर आईडी, या पासपोर्ट (यदि आधार वर्तमान पते से लिंक नहीं है)।", gu: "વીજળી બિલ, વોટર આઈડી, અથવા પાસપોર્ટ (જો આધાર વર્તમાન સરનામા સાથે લિંક ન હોય)." },
        isMandatory: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { en: "File Learner's Licence Application", hi: "लर्निंग लाइसेंस आवेदन दर्ज करें", gu: "લર્નિંગ લાઇસન્સ અરજી દાખલ કરો" },
        description: {
          en: "Submit basic details on the Sarathi portal. If your Aadhaar is linked with a mobile number, you can do this completely from home without visiting the RTO.",
          hi: "सारथी पोर्टल पर बुनियादी विवरण जमा करें। यदि आपका आधार मोबाइल नंबर से लिंक है, तो आप आरटीओ गए बिना इसे पूरी तरह से घर से कर सकते हैं।",
          gu: "સારથી પોર્ટલ પર મૂળભૂત વિગતો સબમિટ કરો. જો તમારો આધાર મોબાઇલ નંબર સાથે લિંક હોય, તો તમે RTOની મુલાકાત લીધા વિના આ સંપૂર્ણપણે ઘરેથી કરી શકો છો."
        },
        duration: { en: "30-45 minutes", hi: "30-45 मिनट", gu: "30-45 મિનિટ" },
        cost: { en: "₹150 application fee", hi: "₹150 आवेदन शुल्क", gu: "₹150 અરજી ફી" },
        actionType: "online",
        officialLink: "https://sarathi.parivahan.gov.in"
      },
      {
        stepNumber: 2,
        title: { en: "Online Learner's Test", hi: "ऑनलाइन लर्निंग टेस्ट", gu: "ઓનલાઇન લર્નિંગ ટેસ્ટ" },
        description: {
          en: "Watch the mandatory road safety tutorial video on the portal, then take the 15-question multiple-choice test online. You need 9 correct answers to pass.",
          hi: "पोर्टल पर अनिवार्य सड़क सुरक्षा ट्यूटोरियल वीडियो देखें, फिर ऑनलाइन 15-प्रश्नों का बहुविकल्पीय परीक्षण दें। पास होने के लिए आपको 9 सही उत्तरों की आवश्यकता है।",
          gu: "પોર્ટલ પર ફરજિયાત રોડ સેફ્ટી ટ્યુટોરીયલ વિડીયો જુઓ, પછી ઓનલાઇન 15-પ્રશ્નોની બહુવિકલ્પ ટેસ્ટ આપો. પાસ થવા માટે તમારે 9 સાચા જવાબોની જરૂર છે."
        },
        duration: { en: "15 minutes test", hi: "15 मिनट का टेस्ट", gu: "15 મિનિટની ટેસ્ટ" },
        cost: { en: "Free (included in application fee)", hi: "निःशुल्क (आवेदन शुल्क में शामिल)", gu: "મફત (અરજી ફીમાં શામેલ)" },
        actionType: "online"
      },
      {
        stepNumber: 3,
        title: { en: "Wait 30 Days & Practice Driving", hi: "30 दिन प्रतीक्षा करें और ड्राइविंग का अभ्यास करें", gu: "30 દિવસ રાહ જુઓ અને ડ્રાઇવિંગની પ્રેક્ટિસ કરો" },
        description: {
          en: "By law, you must hold the Learner's Licence for at least 30 days before you can book a test slot for a Permanent Driving Licence.",
          hi: "कानूनन, स्थायी ड्राइविंग लाइसेंस के लिए टेस्ट स्लॉट बुक करने से पहले आपके पास कम से कम 30 दिनों के लिए लर्निंग लाइसेंस होना चाहिए।",
          gu: "કાયદા અનુસાર, કાયમી ડ્રાઇવિંગ લાઇસન્સ માટે ટેસ્ટ સ્લોટ બુક કરી શકો તે પહેલાં તમારી પાસે ઓછામાં ઓછા 30 દિવસ માટે લર્નિંગ લાઇસન્સ હોવું આવશ્યક છે."
        },
        duration: { en: "30 days mandatory gap", hi: "30 दिन का अनिवार्य अंतराल", gu: "30 દિવસનો ફરજિયાત ગાળો" },
        cost: { en: "No fee", hi: "कोई शुल्क नहीं", gu: "કોઈ ફી નથી" },
        actionType: "hybrid"
      },
      {
        stepNumber: 4,
        title: { en: "Book Slot & Practical Driving Test", hi: "स्लॉट बुक करें और व्यावहारिक ड्राइविंग टेस्ट दें", gu: "સ્લોટ બુક કરો અને પ્રેક્ટિકલ ડ્રાઇવિંગ ટેસ્ટ" },
        description: {
          en: "Book a slot online on the Sarathi portal. Go to your local RTO with your vehicle (and an 'L' sign visible on it). Run the track test (usually a path resembling Figure 8 for two-wheelers or reverse parking/H-track for cars).",
          hi: "सारथी पोर्टल पर ऑनलाइन स्लॉट बुक करें। अपने वाहन (और उस पर 'L' का निशान लगा हो) के साथ स्थानीय आरटीओ जाएं। ट्रैक टेस्ट दें (आमतौर पर दोपहिया वाहनों के लिए 8 आकार का और कारों के लिए रिवर्स पार्किंग)।",
          gu: "સારથી પોર્ટલ પર ઓનલાઇન સ્લોટ બુક કરો. તમારા વાહન સાથે તમારા સ્થાનિક RTO પર જાઓ (અને તેના પર 'L' ચિહ્ન દેખાય તેવું હોવું જોઈએ). ટ્રેક ટેસ્ટ આપો (સામાન્ય રીતે ટુ-વ્હીલર માટે 8 આકારનો પાથ અથવા કાર માટે રિવર્સ પાર્કિંગ)."
        },
        duration: { en: "2-3 hours at RTO", hi: "आरटीओ में 2-3 घंटे", gu: "RTO ખાતે 2-3 કલાક" },
        cost: { en: "₹300 - ₹500 test fee", hi: "₹300 - ₹500 टेस्ट शुल्क", gu: "₹300 - ₹500 ટેસ્ટ ફી" },
        actionType: "physical"
      }
    ],
    communityTips: [
      {
        author: "Rohan Sharma",
        date: "2026-05-12",
        text: {
          en: "If you have Aadhaar linked to your mobile, choose 'Aadhaar Authentication' during the application. It skips the physical document submission visit completely! I got my Learner's License sitting in my bedroom.",
          hi: "यदि आपका आधार मोबाइल से लिंक है, तो आवेदन के दौरान 'आधार प्रमाणीकरण' चुनें। यह भौतिक दस्तावेज़ जमा करने की यात्रा को पूरी तरह से बचा देता है! मैंने अपने बेडरूम में बैठे-बैठे ही अपना लर्निंग लाइसेंस प्राप्त कर लिया।",
          gu: "જો તમારી પાસે મોબાઇલ સાથે આધાર લિંક હોય, તો એપ્લિકેશન દરમિયાન 'આધાર ઓથેન્ટિકેશન' પસંદ કરો. તે રૂબરૂ દસ્તાવેજ સબમિટ કરવા જવાની જરૂરિયાતને સંપૂર્ણપણે ટાળે છે! હું મારા બેડરૂમમાં બેસીને મારું લર્નિંગ લાઇસન્સ મેળવી શક્યો."
        }
      },
      {
        author: "Pooja Patel",
        date: "2026-06-02",
        text: {
          en: "RTO slots for the practical test open at 10:00 AM daily in Gujarat. Book immediately as they fill up within 5 minutes. Make sure your vehicle's insurance and PUC are valid, otherwise, they won't let you give the test.",
          hi: "व्यावहारिक टेस्ट के लिए आरटीओ स्लॉट गुजरात में प्रतिदिन सुबह 10:00 बजे खुलते हैं। तुरंत बुक करें क्योंकि वे 5 मिनट के भीतर भर जाते हैं। सुनिश्चित करें कि आपके वाहन का बीमा और पीयूसी वैध है, अन्यथा वे आपको टेस्ट देने नहीं देंगे।",
          gu: "ગુજરાતમાં પ્રેક્ટિકલ ટેસ્ટ માટેના RTO સ્લોટ્સ રોજ સવારે ૧૦:૦૦ વાગ્યે ખુલે છે. તરત જ બુક કરો કારણ કે તે 5 મિનિટમાં ભરાઈ જાય છે. ખાતરી કરો કે તમારા વાહનનો વીમો અને PUC માન્ય છે, અન્યથા તેઓ તમને ટેસ્ટ આપવા દેશે નહીં."
        }
      }
    ],
    potentialRisks: [
      {
        title: { en: "Unauthorized Agents", hi: "अनधिकृत एजेंट", gu: "અનધિકૃત એજન્ટો" },
        description: {
          en: "Avoid middle-men standing outside RTOs promising fast-track services for high fees (₹2000+). The process is now 100% online and direct. Agents cannot bypass the automated driving track cameras.",
          hi: "आरटीओ के बाहर खड़े बिचौलियों से बचें जो भारी शुल्क (₹2000+) के बदले तेज़ सेवा का वादा करते हैं। प्रक्रिया अब 100% ऑनलाइन और सीधी है। एजेंट स्वचालित ड्राइविंग ट्रैक कैमरों को बायपास नहीं कर सकते।",
          gu: "RTOની બહાર ઉભેલા વચેટિયાઓથી બચો જેઓ ઊંચી ફી (₹૨૦૦૦+) માટે ફાસ્ટ-ટ્રેક સેવાઓનું વચન આપે છે. પ્રક્રિયા હવે 100% ઓનલાઇન અને સીધી છે. એજન્ટો ઓટોમેટેડ ડ્રાઇવિંગ ટ્રેક કેમેરા બાયપાસ કરી શકતા નથી."
        }
      },
      {
        title: { en: "PUC/Insurance Issues", hi: "पीयूसी/बीमा समस्याएं", gu: "PUC/વીમા સમસ્યાઓ" },
        description: {
          en: "If the vehicle you bring for the test does not have active insurance or a valid pollution certificate, the inspector will reject your application on the spot.",
          hi: "यदि आप टेस्ट के लिए जो वाहन लाते हैं उसका सक्रिय बीमा या वैध प्रदूषण प्रमाणपत्र नहीं है, तो निरीक्षक मौके पर ही आपके आवेदन को खारिज कर देगा।",
          gu: "જો તમે ટેસ્ટ માટે લાવો છો તે વાહન પાસે સક્રિય વીમો અથવા માન્ય પ્રદૂષણ પ્રમાણપત્ર નથી, તો ઇન્સ્પેક્ટર સ્થળ પર જ તમારી અરજી નામંજૂર કરશે."
        }
      }
    ],
    faqs: [
      {
        question: { en: "How long is the Learner's Licence valid?", hi: "लर्निंग लाइसेंस कितने समय के लिए वैध है?", gu: "લર્નિંગ લાઇસન્સ કેટલા સમય માટે માન્ય છે?" },
        answer: {
          en: "It is valid for 6 months from the date of issue. You can apply for a permanent license anytime after 30 days and before the expiry of 6 months.",
          hi: "यह जारी होने की तारीख से 6 महीने तक वैध रहता है। आप 30 दिनों के बाद और 6 महीने की समाप्ति से पहले कभी भी स्थायी लाइसेंस के लिए आवेदन कर सकते हैं।",
          gu: "તે ઇશ્યૂ થયાની તારીખથી 6 મહિના માટે માન્ય છે. તમે 30 દિવસ પછી અને 6 મહિનાની સમાપ્તિ પહેલાં કોઈપણ સમયે કાયમી લાઇસન્સ માટે અરજી કરી શકો છો."
        }
      },
      {
        question: { en: "What if I fail the practical driving test?", hi: "यदि मैं व्यावहारिक ड्राइविंग टेस्ट में अनुत्तीर्ण हो जाऊं तो क्या होगा?", gu: "જો હું પ્રેક્ટિકલ ડ્રાઇવિંગ ટેસ્ટમાં નાપાસ થાઉં તો શું?" },
        answer: {
          en: "You can pay a nominal re-test fee (around ₹150-₹300) on the Sarathi portal and book another test slot after a gap of 7 days.",
          hi: "आप सारथी पोर्टल पर एक मामूली री-टेस्ट शुल्क (लगभग ₹150-₹300) का भुगतान कर सकते हैं और 7 दिनों के अंतराल के बाद दूसरा टेस्ट स्लॉट बुक कर सकते हैं।",
          gu: "તમે સારથી પોર્ટલ પર સામાન્ય રી-ટેસ્ટ ફી (લગભગ ₹150-₹300) ચૂકવી શકો છો અને 7 દિવસના ગાળા પછી બીજો ટેસ્ટ સ્લોટ બુક કરી શકો છો."
        }
      }
    ]
  },
  {
    id: "passport-apply",
    name: {
      en: "Fresh Indian Passport Application",
      hi: "नया भारतीय पासपोर्ट आवेदन",
      gu: "નવા ભારતીય પાસપોર્ટ માટે અરજી"
    },
    category: "External Affairs",
    description: {
      en: "Secure an Ordinary Indian Passport (36/60 pages) via the Passport Seva Kendra network.",
      hi: "पासपोर्ट सेवा केंद्र नेटवर्क के माध्यम से एक साधारण भारतीय पासपोर्ट (36/60 पृष्ठ) प्राप्त करें।",
      gu: "પાસપોર્ટ સેવા કેન્દ્ર નેટવર્ક દ્વારા સામાન્ય ભારતીય પાસપોર્ટ (36/60 પૃષ્ઠો) મેળવો."
    },
    trustScore: 99,
    officialSources: [
      { name: "Consular, Passport & Visa Division (Ministry of External Affairs)", url: "https://www.passportindia.gov.in" }
    ],
    requiredDocuments: [
      {
        name: { en: "Proof of Date of Birth", hi: "जन्म तिथि का प्रमाण", gu: "જન્મ તારીખનો પુરાવો" },
        description: { en: "Birth certificate, PAN card, Aadhaar card, or school leaving certificate.", hi: "जन्म प्रमाण पत्र, पैन कार्ड, आधार कार्ड, या स्कूल छोड़ने का प्रमाण पत्र।", gu: "જન્મ પ્રમાણપત્ર, પાન કાર્ડ, આધાર કાર્ડ, અથવા શાળા છોડ્યાનું પ્રમાણપત્ર." },
        isMandatory: true
      },
      {
        name: { en: "Proof of Present Address", hi: "वर्तमान पते का प्रमाण", gu: "વર્તમાન સરનામાનો પુરાવો" },
        description: { en: "Aadhaar Card, Water/Electricity bill, Rent agreement, or active bank passbook with photo.", hi: "आधार कार्ड, पानी/बिजली बिल, किराया समझौता, या फोटो के साथ सक्रिय बैंक पासबुक।", gu: "આધાર કાર્ડ, પાણી/વીજળી બિલ, ભાડા કરાર, અથવા ફોટા સાથેની સક્રિય બેંક પાસબુક." },
        isMandatory: true
      },
      {
        name: { en: "Non-ECR Proof (Optional)", hi: "गैर-ईसीआर प्रमाण (वैकल्पिक)", gu: "બિન-ECR પુરાવો (વૈકલ્પિક)" },
        description: { en: "Matriculation (10th pass) certificate or higher degree to avoid Emigration Check Required status.", hi: "उत्प्रवास जांच आवश्यक (ईसीआर) स्थिति से बचने के लिए मैट्रिक (10वीं पास) प्रमाणपत्र या उच्च डिग्री।", gu: "ઇમિગ્રેશન ચેક રિક્વાયર્ડ (ECR) સ્ટેટસ ટાળવા માટે મેટ્રિક્યુલેશન (10મું પાસ) પ્રમાણપત્ર અથવા ઉચ્ચ ડિગ્રી." },
        isMandatory: false
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { en: "Register on Passport Seva Portal", hi: "पासपोर्ट सेवा पोर्टल पर पंजीकरण करें", gu: "પાસપોર્ટ સેવા પોર્ટલ પર નોંધણી કરો" },
        description: {
          en: "Create an account on the official Passport India website. Fill out the application form online carefully, matching names exactly as they appear on your Birth/Aadhaar certificate.",
          hi: "आधिकारिक पासपोर्ट इंडिया वेबसाइट पर एक खाता बनाएं। ऑनलाइन आवेदन पत्र को ध्यान से भरें, नामों का मिलान ठीक वैसे ही करें जैसे वे आपके जन्म/आधार प्रमाण पत्र पर दिखाई देते हैं।",
          gu: "સત્તાવાર પાસપોર્ટ ઇન્ડિયા વેબસાઇટ પર એક એકાઉન્ટ બનાવો. ઓનલાઇન અરજી ફોર્મ કાળજીપૂર્વક ભરો, નામો તમારા જન્મ/આધાર પ્રમાણપત્ર પર દેખાય છે તે જ પ્રમાણે મેચ કરો."
        },
        duration: { en: "40 minutes", hi: "40 मिनट", gu: "40 મિનિટ" },
        cost: { en: "No registration fee", hi: "कोई पंजीकरण शुल्क नहीं", gu: "કોઈ નોંધણી ફી નથી" },
        actionType: "online",
        officialLink: "https://www.passportindia.gov.in"
      },
      {
        stepNumber: 2,
        title: { en: "Pay & Book PSK Slot", hi: "भुगतान करें और पीएसके स्लॉट बुक करें", gu: "ચુકવણી કરો અને PSK સ્લોટ બુક કરો" },
        description: {
          en: "Pay the passport application fee online and book an appointment slot at your nearest Passport Seva Kendra (PSK) or Post Office Passport Seva Kendra (POPSK).",
          hi: "पासपोर्ट आवेदन शुल्क का ऑनलाइन भुगतान करें और अपने निकटतम पासपोर्ट सेवा केंद्र (पीएसके) या डाकघर पासपोर्ट सेवा केंद्र (पीओपीएसके) में अपॉइंटमेंट स्लॉट बुक करें।",
          gu: "પાસપોર્ટ અરજી ફી ઓનલાઇન ચૂકવો અને તમારા નજીકના પાસપોર્ટ સેવા કેન્દ્ર (PSK) અથવા પોસ્ટ ઓફિસ પાસપોર્ટ સેવા કેન્દ્ર (POPSK) પર એપોઇન્ટમેન્ટ સ્લોટ બુક કરો."
        },
        duration: { en: "10 minutes", hi: "10 मिनट", gu: "10 મિનિટ" },
        cost: { en: "₹1,500 (Standard) / ₹2,000 (Tatkaal)", hi: "₹1,500 (सामान्य) / ₹2,000 (तत्काल)", gu: "₹૧,૫૦૦ (સામાન્ય) / ₹૨,૦૦૦ (તત્કાલ)" },
        actionType: "online"
      },
      {
        stepNumber: 3,
        title: { en: "Visit PSK for Verification", hi: "सत्यापन के लिए पीएसके पर जाएं", gu: "ચકાસણી માટે PSK ની મુલાકાત લો" },
        description: {
          en: "Go to the PSK at your scheduled slot. Bring all original documents and one set of self-attested photocopies. Your biometric data (fingerprints & iris scan) and photo will be taken here.",
          hi: "अपने निर्धारित स्लॉट पर पीएसके जाएं। सभी मूल दस्तावेज और स्व-सत्यापित फोटोकॉपी का एक सेट लाएं। आपका बायोमेट्रिक डेटा और फोटो यहां लिया जाएगा।",
          gu: "તમારા નિર્ધારિત સ્લોટ પર PSK પર જાઓ. તમામ અસલ દસ્તાવેજો અને સ્વ-પ્રમાણિત ફોટોકોપીનો એક સેટ લાવો. તમારા બાયોમેટ્રિક ડેટા અને ફોટો અહીં લેવામાં આવશે."
        },
        duration: { en: "1.5 - 2 hours at center", hi: "केंद्र में 1.5 - 2 घंटे", gu: "કેન્દ્ર પર ૧.૫ - ૨ કલાક" },
        cost: { en: "No additional fee", hi: "कोई अतिरिक्त शुल्क नहीं", gu: "કોઈ વધારાની ફી નથી" },
        actionType: "physical"
      },
      {
        stepNumber: 4,
        title: { en: "Police Verification", hi: "पुलिस सत्यापन", gu: "પોલીસ ચકાસણી" },
        description: {
          en: "A local police officer from your station will visit your address or call you to the station to verify your credentials. Keep your address proof and references ready.",
          hi: "आपके थाने का एक स्थानीय पुलिस अधिकारी आपके पते पर आएगा या आपकी साख को सत्यापित करने के लिए आपको थाने बुलाएगा। अपने पते का प्रमाण और संदर्भ तैयार रखें।",
          gu: "તમારા સ્ટેશનના સ્થાનિક પોલીસ અધિકારી તમારા સરનામાની મુલાકાત લેશે અથવા તમારી ચકાસણી કરવા માટે તમને સ્ટેશન બોલાવશે. તમારો સરનામાનો પુરાવો અને સંદર્ભો તૈયાર રાખો."
        },
        duration: { en: "3 - 7 days after PSK visit", hi: "पीएसके यात्रा के 3 - 7 दिन बाद", gu: "PSK મુલાકાતના ૩ - ૭ દિવસ પછી" },
        cost: { en: "No legal fee (do not pay bribes)", hi: "कोई कानूनी शुल्क नहीं (रिश्वत न दें)", gu: "કોઈ કાયદાકીય ફી નથી (લાંચ આપશો નહીં)" },
        actionType: "physical"
      },
      {
        stepNumber: 5,
        title: { en: "Passport Dispatch & Delivery", hi: "पासपोर्ट प्रेषण और वितरण", gu: "પાસપોર્ટ ડિસ્પેચ અને વિતરણ" },
        description: {
          en: "Once the police verification report is marked clear, the passport is printed, dispatched via Speed Post, and delivered to your hand. You will get a tracking SMS.",
          hi: "एक बार पुलिस सत्यापन रिपोर्ट स्पष्ट चिह्नित होने के बाद, पासपोर्ट मुद्रित किया जाता है, स्पीड पोस्ट के माध्यम से भेजा जाता है, और आपके हाथों में वितरित किया जाता है। आपको ट्रैकिंग एसएमएस प्राप्त होगा।",
          gu: "એકવાર પોલીસ વેરિફિકેશન રિપોર્ટ ક્લિયર માર્ક થઈ જાય પછી, પાસપોર્ટ પ્રિન્ટ થાય છે, સ્પીડ પોસ્ટ દ્વારા મોકલવામાં આવે છે, અને તમારા હાથમાં પહોંચાડવામાં આવે છે. તમને ટ્રેકિંગ SMS મળશે."
        },
        duration: { en: "4 - 10 days", hi: "4 - 10 दिन", gu: "૪ - ૧૦ દિવસ" },
        cost: { en: "Free delivery", hi: "निःशुल्क वितरण", gu: "મફત ડિલિવરી" },
        actionType: "online"
      }
    ],
    communityTips: [
      {
        author: "Devendra Dave",
        date: "2026-04-20",
        text: {
          en: "Carry your old/active bank passbook or post office passbook only if it has a photo and seal. MEA is very strict about addresses. Make sure the spellings match character-for-character across Aadhaar and Voter ID.",
          hi: "अपनी पुरानी/सक्रिय बैंक पासबुक या पोस्ट ऑफिस पासबुक तभी ले जाएं जब उसमें फोटो और सील हो। पते के मामले में एमईए बहुत सख्त है। सुनिश्चित करें कि आधार और वोटर आईडी में वर्तनी अक्षर-दर-अक्षर मेल खाती हो।",
          gu: "તમારી જૂની/સક્રિય બેંક પાસબુક અથવા પોસ્ટ ઓફિસ પાસબુક ત્યારે જ સાથે રાખો જો તેમાં ફોટો અને સીલ હોય. સરનામા બાબતે MEA ખૂબ કડક છે. ખાતરી કરો કે આધાર અને વોટર આઈડીમાં જોડણી અક્ષરે-અક્ષર મેચ થતી હોય."
        }
      },
      {
        author: "Arjun Mehta",
        date: "2026-06-15",
        text: {
          en: "No need to pay any speed post charge or station fee during Police Verification. If a cop asks for a speed money/tip, politely log a complaint on the Passport Seva portal. It is monitored directly by MEA.",
          hi: "पुलिस सत्यापन के दौरान किसी भी स्पीड पोस्ट शुल्क या स्टेशन शुल्क का भुगतान करने की आवश्यकता नहीं है। यदि कोई पुलिसकर्मी टिप मांगता है, तो विनम्रतापूर्वक पोर्टल पर शिकायत दर्ज करें। इसकी निगरानी सीधे एमईए द्वारा की जाती है।",
          gu: "પોલીસ વેરિફિકેશન દરમિયાન કોઈ સ્પીડ પોસ્ટ ચાર્જ કે સ્ટેશન ફી ચૂકવવાની જરૂર નથી. જો કોઈ પોલીસકર્મી ટિપ માંગે, તો નમ્રતાપૂર્વક પોર્ટલ પર ફરિયાદ કરો. તેની સીધી દેખરેખ MEA દ્વારા કરવામાં આવે છે."
        }
      }
    ],
    potentialRisks: [
      {
        title: { en: "Fake Passport Portals", hi: "नकली पासपोर्ट पोर्टल", gu: "નકલી પાસપોર્ટ પોર્ટલ" },
        description: {
          en: "Dozens of phishing domains mimic passportindia.gov.in (like passportindia-gov.in, online-passport-seva.org) and charge huge amounts. Only register on the official website containing '.gov.in'.",
          hi: "दर्जनों फ़िशिंग डोमेन passportindia.gov.in की नकल करते हैं और भारी शुल्क लेते हैं। केवल '.gov.in' वाले आधिकारिक पोर्टल पर ही पंजीकरण करें।",
          gu: "ડઝનબંધ ફિશિંગ ડોમેન્સ passportindia.gov.in ની નકલ કરે છે અને મોટી રકમ વસૂલ કરે છે. ફક્ત '.gov.in' ધરાવતી સત્તાવાર વેબસાઇટ પર જ નોંધણી કરો."
        }
      },
      {
        title: { en: "Address Discrepancies", hi: "पते में विसंगतियां", gu: "સરનામામાં વિસંગતતા" },
        description: {
          en: "If you have lived in multiple places in the last year, you must disclose all addresses. Hiding past address details leads to an automatic penalty of ₹5,000 for address concealment.",
          hi: "यदि आप पिछले एक वर्ष में कई स्थानों पर रहे हैं, तो आपको सभी पते बताने होंगे। पिछले पते का विवरण छिपाने पर ₹5,000 का स्वचालित जुर्माना लगता है।",
          gu: "જો તમે છેલ્લા એક વર્ષમાં એકથી વધુ જગ્યાએ રહ્યા હોવ, તો તમારે તમામ સરનામાં જાહેર કરવા આવશ્યક છે. ભૂતકાળના સરનામાની વિગતો છુપાવવાથી ₹5,000 નો દંડ થાય છે."
        }
      }
    ],
    faqs: [
      {
        question: { en: "What is ECR vs Non-ECR status?", hi: "ईसीआर बनाम गैर-ईसीआर स्थिति क्या है?", gu: "ECR વિ બિન-ECR સ્ટેટસ શું છે?" },
        answer: {
          en: "ECR (Emigration Check Required) is marked if you haven't passed class 10th. Non-ECR means you have cleared matriculation, allowing you to travel abroad for work without needing clearances.",
          hi: "यदि आपने 10वीं कक्षा पास नहीं की है तो ईसीआर (उत्प्रवास जांच आवश्यक) चिह्नित किया जाता है। गैर-ईसीआर का मतलब है कि आपने मैट्रिक पास कर लिया है, जिससे आप बिना अनुमति के काम के लिए विदेश जा सकते हैं।",
          gu: "જો તમે ધોરણ 10 પાસ ન કર્યું હોય તો ECR માર્ક થાય છે. બિન-ECR એટલે કે તમે મેટ્રિક્યુલેશન પાસ કર્યું છે, જે તમને મંજૂરી વિના કામ માટે વિદેશ પ્રવાસ કરવાની છૂટ આપે છે."
        }
      }
    ]
  },
  {
    id: "pan-card",
    name: {
      en: "PAN Card Registration (Instant e-PAN)",
      hi: "पैन कार्ड पंजीकरण (तत्काल ई-पैन)",
      gu: "પાન કાર્ડ નોંધણી (ઇન્સ્ટન્ટ ઇ-પાન)"
    },
    category: "Taxes",
    description: {
      en: "Get a Permanent Account Number (PAN) instantly online using your Aadhaar card.",
      hi: "अपने आधार कार्ड का उपयोग करके तुरंत ऑनलाइन स्थायी खाता संख्या (पैन) प्राप्त करें।",
      gu: "તમારા આધાર કાર્ડનો ઉપયોગ કરીને તરત જ ઓનલાઇન પરમેનન્ટ એકાઉન્ટ નંબર (PAN) મેળવો."
    },
    trustScore: 98,
    officialSources: [
      { name: "Income Tax Department of India", url: "https://www.incometax.gov.in" }
    ],
    requiredDocuments: [
      {
        name: { en: "Aadhaar Card", hi: "आधार कार्ड", gu: "આધાર કાર્ડ" },
        description: { en: "Must be linked to an active mobile number to receive the confirmation OTP.", hi: "पुष्टि ओटीपी प्राप्त करने के लिए एक सक्रिय मोबाइल नंबर से जुड़ा होना चाहिए।", gu: "પુષ્ટિકરણ OTP મેળવવા માટે સક્રિય મોબાઇલ નંબર સાથે લિંક હોવો આવશ્યક છે." },
        isMandatory: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: { en: "Visit e-Filing Portal & select Instant e-PAN", hi: "ई-फाइलिंग पोर्टल पर जाएं और इंस्टेंट ई-पैन चुनें", gu: "e-Filing પોર્ટલની મુલાકાત લો અને ઇન્સ્ટન્ટ e-PAN પસંદ કરો" },
        description: {
          en: "Navigate to the official Income Tax portal, click 'Instant e-PAN', and enter your 12-digit Aadhaar number.",
          hi: "आधिकारिक आयकर पोर्टल पर जाएं, 'इन्स्टैंट ई-पैन' पर क्लिक करें और अपना 12-अंकों का आधार नंबर दर्ज करें।",
          gu: "સત્તાવાર આવકવેરા પોર્ટલ પર જાઓ, 'ઇન્સ્ટન્ટ e-PAN' પર ક્લિક કરો અને તમારો 12-આંકડાનો આધાર નંબર દાખલ કરો."
        },
        duration: { en: "5 minutes", hi: "5 मिनट", gu: "5 મિનિટ" },
        cost: { en: "Free of cost", hi: "निःशुल्क", gu: "મફત" },
        actionType: "online",
        officialLink: "https://eportal.incometax.gov.in"
      },
      {
        stepNumber: 2,
        title: { en: "Enter OTP & Validate Details", hi: "ओटीपी दर्ज करें और विवरण सत्यापित करें", gu: "OTP દાખલ કરો અને વિગતો માન્ય કરો" },
        description: {
          en: "Input the OTP sent to your Aadhaar-registered mobile number. Verify the pre-filled information like photo, birthdate, and address pulled from the Aadhaar registry.",
          hi: "अपने आधार-पंजीकृत मोबाइल नंबर पर भेजा गया ओटीपी दर्ज करें। आधार रजिस्ट्री से लिए गए फोटो, जन्मतिथि और पते जैसे पूर्व-भरे विवरणों को सत्यापित करें।",
          gu: "તમારા આધાર-રજિસ્ટર્ડ મોબાઇલ નંબર પર મોકલેલ OTP દાખલ કરો. આધાર રજિસ્ટ્રીમાંથી મેળવેલ ફોટો, જન્મતારીખ અને સરનામાં જેવી પૂર્વ-ભરેલી વિગતો ચકાસો."
        },
        duration: { en: "5 minutes", hi: "5 मिनट", gu: "5 મિનિટ" },
        cost: { en: "No charges", hi: "कोई शुल्क नहीं", gu: "કોઈ ચાર્જ નથી" },
        actionType: "online"
      },
      {
        stepNumber: 3,
        title: { en: "Download PDF e-PAN", hi: "पीडीएफ ई-पैन डाउनलोड करें", gu: "PDF e-PAN ડાઉનલોડ કરો" },
        description: {
          en: "Your e-PAN is generated within 10 minutes. Go back to the 'Instant e-PAN' tab, re-authenticate with your Aadhaar OTP, and download the password-protected PDF (Password is your birthdate in DDMMYYYY format).",
          hi: "आपका ई-पैन 10 मिनट के भीतर जेनरेट हो जाता है। वापस 'इन्स्टैंट ई-पैन' टैब पर जाएं, आधार ओटीपी से दोबारा सत्यापित करें और पीडीएफ डाउनलोड करें (पासवर्ड आपकी जन्मतिथि DDMMYYYY प्रारूप में है)।",
          gu: "તમારો e-PAN ૧૦ મિનિટમાં જનરેટ થઈ જાય છે. ફરીથી 'ઇન્સ્ટન્ટ e-PAN' ટેબ પર જાઓ, આધાર OTP થી વેરિફાઈ કરો અને પાસવર્ડ-પ્રોટેક્ટેડ PDF ડાઉનલોડ કરો (પાસવર્ડ DDMMYYYY ફોર્મેટમાં તમારી જન્મતારીખ છે)."
        },
        duration: { en: "10 minutes wait", hi: "10 मिनट प्रतीक्षा समय", gu: "10 મિનિટ પ્રતીક્ષા સમય" },
        cost: { en: "Free", hi: "निःशुल्क", gu: "મફત" },
        actionType: "online"
      }
    ],
    communityTips: [
      {
        author: "Meera Patel",
        date: "2026-03-30",
        text: {
          en: "Instant e-PAN is legally equivalent to a physical plastic card. If you still want the physical plastic card, just search for 'Reprint PAN Card' on NSDL portal, pay ₹50, and it gets printed and shipped to your home.",
          hi: "तत्काल ई-पैन कानूनी रूप से भौतिक प्लास्टिक कार्ड के समान है। यदि आप अभी भी भौतिक प्लास्टिक कार्ड चाहते हैं, तो एनएसडीएल पोर्टल पर 'रीप्रिंट पैन कार्ड' खोजें, ₹50 का भुगतान करें, और यह आपके घर भेज दिया जाएगा।",
          gu: "ઇન્સ્ટન્ટ e-PAN કાયદેસર રીતે ભૌતિક પ્લાસ્ટિક કાર્ડની સમકક્ષ છે. જો તમને હજી પણ ભૌતિક પ્લાસ્ટિક કાર્ડ જોઈએ છે, તો NSDL પોર્ટલ પર 'રિપ્રિન્ટ પાન કાર્ડ' શોધો, ₹50 ચૂકવો અને તે તમારા ઘરે મોકલી દેવામાં આવશે."
        }
      }
    ],
    potentialRisks: [
      {
        title: { en: "Double PAN Penalty", hi: "दोहरे पैन का जुर्माना", gu: "બેવડા PAN નો દંડ" },
        description: {
          en: "Holding more than one Permanent Account Number is illegal in India under Section 272B. Doing so can attract a heavy penalty of ₹10,000 from the Income Tax department. Never apply for a new PAN if you already have one.",
          hi: "धारा 272B के तहत भारत में एक से अधिक स्थायी खाता संख्या (पैन) रखना अवैध है। ऐसा करने पर आयकर विभाग द्वारा ₹10,000 का भारी जुर्माना लगाया जा सकता है। यदि आपके पास पहले से ही पैन है तो नए पैन के लिए कभी आवेदन न करें।",
          gu: "કલમ 272B હેઠળ ભારતમાં એક કરતા વધુ પરમેનન્ટ એકાઉન્ટ નંબર (PAN) રાખવો ગેરકાયદેસર છે. આમ કરવાથી આવકવેરા વિભાગ દ્વારા ₹10,000 નો મોટો દંડ થઈ શકે છે. જો તમારી પાસે પહેલેથી જ PAN હોય તો નવા PAN માટે ક્યારેય અરજી કરશો નહીં."
        }
      }
    ],
    faqs: [
      {
        question: { en: "Is e-PAN valid everywhere?", hi: "क्या ई-पैन हर जगह मान्य है?", gu: "શું e-PAN બધે માન્ય છે?" },
        answer: {
          en: "Yes, the digital e-PAN contains a secure QR code and is fully recognized by banks, companies, and other government entities just like a physical card.",
          hi: "हां, डिजिटल ई-पैन में एक सुरक्षित क्यूआर कोड होता है और इसे बैंकों, कंपनियों और अन्य सरकारी संस्थाओं द्वारा भौतिक कार्ड की तरह ही पूरी तरह से मान्यता दी जाती है।",
          gu: "હા, ડિજિટલ e-PAN માં સુરક્ષિત QR કોડ હોય છે અને બેંકો, કંપનીઓ અને અન્ય સરકારી સંસ્થાઓ દ્વારા ભૌતિક કાર્ડની જેમ જ સંપૂર્ણ માન્યતા આપવામાં આવે છે."
        }
      }
    ]
  }
];

export const searchSuggestions = [
  { text: "Driving Licence", category: "Transport" },
  { text: "Fresh Passport", category: "External Affairs" },
  { text: "Instant e-PAN", category: "Taxes" },
  { text: "GST Registration", category: "Business" },
  { text: "MSME Udyam", category: "Business" },
  { text: "Property Registration", category: "Revenue" },
  { text: "RTI Application", category: "General" }
];
