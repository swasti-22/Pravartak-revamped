import React from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { Landing } from './pages/Landing';
import { LanguageSelection } from './pages/LanguageSelection';
import { Auth } from './pages/Auth';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Results } from './pages/Results';
import { Profile } from './pages/Profile';

import { motion, AnimatePresence } from 'framer-motion';

const MainAppContent: React.FC = () => {
  const { currentPage } = useNavigation();

  // Route resolver helper
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing />;
      case 'language':
        return <LanguageSelection />;
      case 'auth':
        return <Auth />;
      case 'onboarding':
        return <Onboarding />;
      case 'dashboard':
        return <Dashboard />;
      case 'results':
        return <Results />;
      case 'profile':
        return <Profile />;
      default:
        return <Landing />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Universal Header */}
      <Header />

      {/* Main Content Layout with Framer Motion Page Transition */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <NavigationProvider>
      <MainAppContent />
    </NavigationProvider>
  );
}
