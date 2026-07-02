import React from 'react';

interface ChaiLoaderProps {
  label?: string;
}

export const ChaiLoader: React.FC<ChaiLoaderProps> = ({ label }) => {
  return (
    <div className="loader-container py-12 flex flex-col items-center justify-center space-y-6">
      <div className="loader">
        <div className="cup">
          <div className="cup-handle"></div>
          <div className="smoke one"></div>
          <div className="smoke two"></div>
          <div className="smoke three"></div>
        </div>
        <div className="load">..........................</div>
      </div>
      
      {label && (
        <p className="text-xs font-semibold text-brand-sage animate-pulse uppercase tracking-widest text-center max-w-xs font-sans">
          {label}
        </p>
      )}
    </div>
  );
};
