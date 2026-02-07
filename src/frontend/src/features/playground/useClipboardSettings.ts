import { useState, useEffect } from 'react';

const STORAGE_KEY = 'otp-clipboard-settings';

interface ClipboardSettings {
  clearDelay: number; // seconds, 0 = never
}

const DEFAULT_SETTINGS: ClipboardSettings = {
  clearDelay: 30,
};

/**
 * Hook to manage clipboard settings (non-sensitive preferences only)
 * Persists to localStorage
 */
export function useClipboardSettings() {
  const [clearDelay, setClearDelayState] = useState<number>(DEFAULT_SETTINGS.clearDelay);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const settings: ClipboardSettings = JSON.parse(stored);
        setClearDelayState(settings.clearDelay);
      }
    } catch (error) {
      // Ignore errors, use defaults
    }
  }, []);

  // Save settings to localStorage
  const setClearDelay = (delay: number) => {
    setClearDelayState(delay);
    try {
      const settings: ClipboardSettings = { clearDelay: delay };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      // Ignore storage errors
    }
  };

  return {
    clearDelay,
    setClearDelay,
  };
}
