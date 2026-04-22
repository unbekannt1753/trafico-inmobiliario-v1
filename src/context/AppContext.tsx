"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Tweaks {
  theme: 'light' | 'dark';
  density: 'comfortable' | 'compact';
  cardStyle: 'editorial' | 'minimal' | 'compact';
  serifDisplay: boolean;
  orangeIntensity: 'accent' | 'hero';
}

interface AppContextType {
  favs: Set<string>;
  toggleFav: (id: string) => void;
  tweaks: Tweaks;
  setTweak: (k: keyof Tweaks, v: string | boolean) => void;
  editMode: boolean;
  demoMode: boolean;
  setDemoMode: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [favs, setFavs] = useState<Set<string>>(new Set());
  const [tweaks, setTweaks] = useState<Tweaks>({
    theme: "dark",
    density: "compact",
    cardStyle: "minimal",
    serifDisplay: true,
    orangeIntensity: "accent"
  });
  const [editMode, setEditMode] = useState(false);
  const [demoMode, _setDemoMode] = useState(true); // Default to demo

  // Load favs from localStorage
  useEffect(() => {
    import("../services/factory").then(({ services }) => {
      const savedDemo = localStorage.getItem("traf-demo-mode");
      const isDemo = savedDemo ? savedDemo === "true" : true;
      _setDemoMode(isDemo);
      services.setMode(isDemo);
    });
    try {
      const saved = localStorage.getItem("traf-favs");
      if (saved) {
        setFavs(new Set(JSON.parse(saved)));
      } else {
        setFavs(new Set(["rmn-214", "tlm-019"]));
      }
    } catch (e) {
      setFavs(new Set());
    }
  }, []);

  // Save favs to localStorage
  useEffect(() => {
    if (favs.size > 0) {
      localStorage.setItem("traf-favs", JSON.stringify([...favs]));
    }
  }, [favs]);

  // Apply tweaks to document element
  useEffect(() => {
    const h = document.documentElement;
    h.dataset.theme = tweaks.theme;
    h.dataset.density = tweaks.density;
    h.dataset.card = tweaks.cardStyle;
    h.dataset.serif = tweaks.serifDisplay ? "true" : "false";
  }, [tweaks]);

  // Tweaks bridge for Edit Mode
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type === "__activate_edit_mode") setEditMode(true);
      if (e.data?.type === "__deactivate_edit_mode") setEditMode(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const toggleFav = (id: string) => {
    setFavs(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const setTweak = (k: keyof Tweaks, v: string | boolean) => {
    setTweaks(t => {
      const n = { ...t, [k]: v };
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
      return n;
    });
  };

  const setDemoMode = (v: boolean) => {
    import("../services/factory").then(({ services }) => {
      _setDemoMode(v);
      services.setMode(v);
      localStorage.setItem("traf-demo-mode", v.toString());
      // Forzar recarga de componentes que dependen de servicios
      window.dispatchEvent(new CustomEvent('demo-mode-changed', { detail: v }));
    });
  };

  return (
    <AppContext.Provider value={{ favs, toggleFav, tweaks, setTweak, editMode, demoMode, setDemoMode }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
