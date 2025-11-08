import React, { useState, useEffect } from 'react';
import { MagicEditorLogo } from './IconComponents';

const SplashScreen: React.FC = () => {
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useEffect(() => {
    // This timeout triggers the fade-out animation slightly before the component is unmounted from App.tsx
    const timer = setTimeout(() => {
      setShouldFadeOut(true);
    }, 2000); // Start fade-out at 2s, App.tsx unmounts at 2.5s

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`splash-screen ${shouldFadeOut ? 'fade-out' : ''}`}>
        <div className="splash-logo">
            <MagicEditorLogo className="w-24 h-24" />
        </div>
        <h1 className="splash-title text-2xl font-bold tracking-tight text-[var(--text-color-strong)] mt-4">
            Magic Editor
        </h1>
    </div>
  );
};

export default SplashScreen;
