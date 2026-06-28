import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Process } from '../data/mockData';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

export type PageName = 
  | 'landing' 
  | 'language' 
  | 'auth' 
  | 'onboarding' 
  | 'dashboard' 
  | 'search' 
  | 'results' 
  | 'saved' 
  | 'notifications' 
  | 'profile';

export type AuthMode = 'login' | 'register' | 'forgot' | 'otp';

export type Language = 'en' | 'hi' | 'gu';

export type UserPersona = 'student' | 'senior' | 'business' | 'general' | null;

interface NavigationContextType {
  currentPage: PageName;
  history: PageName[];
  language: Language;
  authMode: AuthMode;
  userPersona: UserPersona;
  searchQuery: string;
  selectedProcess: Process | null;
  savedProcessIds: string[];
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  user: User | null;
  
  // Navigation actions
  navigateTo: (page: PageName) => void;
  goBack: () => void;
  setLanguage: (lang: Language) => void;
  setAuthMode: (mode: AuthMode) => void;
  setUserPersona: (persona: UserPersona) => void;
  setSearchQuery: (query: string) => void;
  setSelectedProcess: (process: Process | null) => void;
  toggleSaveProcess: (id: string) => void;
  setHighContrast: (val: boolean) => void;
  setFontSize: (size: 'normal' | 'large' | 'extra-large') => void;
  signOut: () => Promise<void>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageName>('landing');
  const [history, setHistory] = useState<PageName[]>([]);
  const [language, setLanguageState] = useState<Language>('en');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [userPersona, setUserPersona] = useState<UserPersona>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [savedProcessIds, setSavedProcessIds] = useState<string[]>([]);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra-large'>('normal');
  const [user, setUser] = useState<User | null>(null);

  const fetchSavedProcesses = async (userId: string) => {
    try {
      const res = await fetch(`/api/saved?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.processIds) {
          setSavedProcessIds(data.processIds);
        }
      }
    } catch (err) {
      console.error('Failed to fetch saved processes', err);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        fetchSavedProcesses(u.id);
        setCurrentPage('dashboard');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (event === 'SIGNED_IN' && u) {
        fetchSavedProcesses(u.id);
        setCurrentPage('dashboard');
      } else if (event === 'SIGNED_OUT') {
        setCurrentPage('landing');
        setSavedProcessIds([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigateTo = (page: PageName) => {
    setHistory((prev) => [...prev, currentPage]);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((prevStack) => prevStack.slice(0, -1));
      setCurrentPage(prev);
    } else {
      setCurrentPage('landing');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleSaveProcess = async (id: string) => {
    let nextList: string[];
    if (savedProcessIds.includes(id)) {
      nextList = savedProcessIds.filter(item => item !== id);
    } else {
      nextList = [...savedProcessIds, id];
    }
    setSavedProcessIds(nextList);

    if (user) {
      try {
        await fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, processIds: nextList })
        });
      } catch (err) {
        console.error('Error syncing saved roadmaps to backend', err);
      }
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Sync highContrast & font sizing to document root classes for global styling
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('text-normal', 'text-large', 'text-xlarge');
    if (fontSize === 'normal') root.classList.add('text-normal');
    if (fontSize === 'large') root.classList.add('text-large');
    if (fontSize === 'extra-large') root.classList.add('text-xlarge');
  }, [fontSize]);

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        history,
        language,
        authMode,
        userPersona,
        searchQuery,
        selectedProcess,
        savedProcessIds,
        highContrast,
        fontSize,
        user,
        navigateTo,
        goBack,
        setLanguage,
        setAuthMode,
        setUserPersona,
        setSearchQuery,
        setSelectedProcess,
        toggleSaveProcess,
        setHighContrast,
        setFontSize,
        signOut,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
