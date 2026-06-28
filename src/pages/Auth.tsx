import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { supabase } from '../lib/supabaseClient';
import { Eye, EyeOff, ShieldCheck, Landmark, Smartphone, Lock, Mail, User, AlertCircle } from 'lucide-react';

export const Auth: React.FC = () => {
  const { authMode, setAuthMode, language, navigateTo } = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const t = {
    assuranceTitle: { en: "Your Privacy is Sovereign", hi: "आपकी गोपनीयता संप्रभु है", gu: "તમારી પ્રાઇવેસી સાર્વભૌમ છે" },
    assuranceDesc: {
      en: "Pravartak operates on zero-document storage. We verify your status in real-time without saving your credentials or tracking your personal identity.",
      hi: "प्रवर्तक शून्य-दस्तावेज़ भंडारण पर काम करता है। हम आपकी साख को सहेजने या आपकी व्यक्तिगत पहचान को ट्रैक किए बिना वास्तविक समय में आपकी स्थिति को सत्यापित करते हैं।",
      gu: "પ્રવર્તક શૂન્ય-દસ્તાવેજ સ્ટોરેજ પર કાર્ય કરે છે. અમે તમારા ક્રેડિટ સેવ કર્યા વિના અથવા તમારી વ્યક્તિગત ઓળખને ટ્રૅક કર્યા વિના વાસ્તવિક સમયમાં તમારી સ્થિતિની ચકાસણી કરીએ છીએ."
    },
    guestBtn: { en: "Continue as Guest", hi: "अतिथि के रूप में जारी रखें", gu: "અતિથિ તરીકે આગળ વધો" },
    or: { en: "or", hi: "या", gu: "અથવા" }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (authMode === 'login') {
        const emailVal = mobileNumber.includes('@') 
          ? mobileNumber 
          : `${mobileNumber.trim().replace(/\s+/g, '')}@pravartak.in`;
        
        const { error } = await supabase.auth.signInWithPassword({
          email: emailVal,
          password: formData.password
        });
        
        if (error) throw error;
        // Navigation listener in NavigationContext will auto route to dashboard upon sign-in
      } else if (authMode === 'register') {
        const emailVal = formData.email.trim() || `${mobileNumber.trim().replace(/\s+/g, '')}@pravartak.in`;
        const { error } = await supabase.auth.signUp({
          email: emailVal,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name
            }
          }
        });
        
        if (error) throw error;
        // Navigate to OTP screen for email verification representation
        setAuthMode('otp');
      } else if (authMode === 'forgot') {
        const emailVal = mobileNumber.includes('@') 
          ? mobileNumber 
          : `${mobileNumber.trim().replace(/\s+/g, '')}@pravartak.in`;
        const { error } = await supabase.auth.resetPasswordForEmail(emailVal, {
          redirectTo: window.location.origin
        });
        if (error) throw error;
        setAuthMode('login');
        alert('If registered, a password reset link has been dispatched to your email.');
      } else if (authMode === 'otp') {
        // Represents successfully verified OTP
        navigateTo('onboarding');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestContinue = () => {
    navigateTo('onboarding');
  };

  return (
    <div className="bg-brand-ivory text-brand-slate font-sans min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl bg-white border border-brand-sage/20 rounded-xl overflow-hidden shadow-warm-lg flex flex-col md:flex-row items-stretch min-h-[500px]">
        
        {/* Left Side: Editorial Trust Callout */}
        <div className="w-full md:w-5/12 bg-brand-forest text-brand-ivory p-8 md:p-10 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center p-2.5 bg-white/10 rounded border border-white/20">
              <Landmark size={20} className="text-white" />
            </div>
            <h3 className="text-2xl font-serif text-white tracking-tight leading-tight">
              {t.assuranceTitle[language]}
            </h3>
            <p className="text-xs text-brand-ivory/70 leading-relaxed">
              {t.assuranceDesc[language]}
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-brand-sage/20 text-[11px] text-brand-sage">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-brand-sage" />
              <span>100% encryption on transit</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-brand-sage" />
              <span>Zero third-party trackers</span>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
          
          {/* Error Message Box */}
          {errorMsg && (
            <div className="mb-6 p-3 bg-rose-50 border border-rose-100 text-rose-800 rounded-lg flex items-start gap-2 text-xs leading-relaxed">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {authMode === 'login' && (
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-2xl font-serif text-brand-forest">Sign In</h3>
                <p className="text-xs text-brand-slate/60">Enter credentials to resume saved applications</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-forest">Mobile Number or Email</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3.5 text-brand-sage"><Smartphone size={14} /></span>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. rajesh@example.com or 98765 43210"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-xs bg-brand-ivory/50 border border-brand-sage/20 rounded-lg focus:border-brand-sage"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-brand-forest">Password</label>
                    <button 
                      type="button" 
                      onClick={() => { setAuthMode('forgot'); setErrorMsg(''); }}
                      className="text-[10px] text-brand-saffron hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-3.5 text-brand-sage"><Lock size={14} /></span>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full pl-9 pr-10 py-2.5 text-xs bg-brand-ivory/50 border border-brand-sage/20 rounded-lg focus:border-brand-sage"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-brand-sage"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-forest text-white hover:bg-brand-forest/95 font-medium rounded-lg shadow-warm-sm transition-colors text-xs disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Sign In'}
              </button>

              <div className="text-center text-xs text-brand-slate/60">
                Don't have an account?{' '}
                <button type="button" onClick={() => { setAuthMode('register'); setErrorMsg(''); }} className="text-brand-forest font-semibold hover:underline">
                  Register
                </button>
              </div>

              <div className="relative flex items-center justify-center my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-brand-sage/10"></div></div>
                <span className="relative px-3 bg-white text-[10px] text-brand-sage uppercase font-medium">{t.or[language]}</span>
              </div>

              <button
                type="button"
                onClick={handleGuestContinue}
                className="w-full py-3 border border-brand-sage/20 bg-brand-ivory/40 hover:bg-brand-ivory text-brand-forest font-medium rounded-lg text-xs transition-colors"
              >
                {t.guestBtn[language]}
              </button>
            </form>
          )}

          {authMode === 'register' && (
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-2xl font-serif text-brand-forest">Create Account</h3>
                <p className="text-xs text-brand-slate/60">Register to keep a private log of your filings</p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-forest">Full Name</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-brand-sage"><User size={14} /></span>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-9 pr-4 py-2 text-xs bg-brand-ivory/50 border border-brand-sage/20 rounded-lg focus:border-brand-sage"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-forest">Mobile Number (Optional if Email provided)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-brand-sage"><Smartphone size={14} /></span>
                    <input 
                      type="tel" 
                      placeholder="98765 43210"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-xs bg-brand-ivory/50 border border-brand-sage/20 rounded-lg focus:border-brand-sage"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-forest">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-brand-sage"><Mail size={14} /></span>
                    <input 
                      type="email" 
                      required={!mobileNumber}
                      placeholder="rajesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-9 pr-4 py-2 text-xs bg-brand-ivory/50 border border-brand-sage/20 rounded-lg focus:border-brand-sage"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-forest">Password</label>
                  <input 
                    type="password" 
                    required
                    placeholder="•••••••• (Min 6 characters)"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-2 text-xs bg-brand-ivory/50 border border-brand-sage/20 rounded-lg focus:border-brand-sage"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-forest text-white hover:bg-brand-forest/95 font-medium rounded-lg shadow-warm-sm transition-colors text-xs disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>

              <div className="text-center text-xs text-brand-slate/60">
                Already registered?{' '}
                <button type="button" onClick={() => { setAuthMode('login'); setErrorMsg(''); }} className="text-brand-forest font-semibold hover:underline">
                  Sign In
                </button>
              </div>
            </form>
          )}

          {authMode === 'forgot' && (
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-2xl font-serif text-brand-forest">Reset Password</h3>
                <p className="text-xs text-brand-slate/60">Enter registered mobile number or email address</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-forest">Mobile or Email</label>
                <input 
                  type="text" 
                  required
                  placeholder="rajesh@example.com or 98765 43210"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-brand-ivory/50 border border-brand-sage/20 rounded-lg focus:border-brand-sage"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-forest text-white hover:bg-brand-forest/95 font-medium rounded-lg text-xs disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Send Reset Link'}
              </button>

              <div className="text-center text-xs">
                <button type="button" onClick={() => { setAuthMode('login'); setErrorMsg(''); }} className="text-brand-sage hover:underline font-medium">
                  Back to Sign In
                </button>
              </div>
            </form>
          )}

          {authMode === 'otp' && (
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-2xl font-serif text-brand-forest">Verify Registration</h3>
                <p className="text-xs text-brand-slate/60">An email has been dispatched to complete your enrollment. Please check your inbox.</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-center gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    required
                    placeholder="1 2 3 4 5 6"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className="w-full max-w-[200px] text-center tracking-[1em] text-lg font-bold font-mono py-2 bg-brand-ivory/50 border border-brand-sage/20 rounded-lg focus:border-brand-sage"
                  />
                </div>
                <p className="text-[10px] text-brand-sage text-center italic">
                  Press continue below to proceed to personalization.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-forest text-white hover:bg-brand-forest/95 font-medium rounded-lg text-xs"
              >
                Continue
              </button>

              <div className="text-center text-xs">
                <button 
                  type="button" 
                  onClick={() => setAuthMode('login')} 
                  className="text-brand-sage hover:underline font-medium"
                >
                  Return to Login
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
