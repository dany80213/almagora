import React from 'react';
import { Compass, Map, Bookmark, Award } from 'lucide-react';

export type ActiveTab = 'explore' | 'map' | 'saved' | 'passport';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  favoritesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  favoritesCount,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#080d14]/90 backdrop-blur-xl border-t border-slate-800/80 px-4 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        <button
          onClick={() => onTabChange('explore')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'explore'
              ? 'text-[#79c3e6] font-bold bg-[#1e5e7f]/15'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Esplora</span>
        </button>

        <button
          onClick={() => onTabChange('map')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative ${
            activeTab === 'map'
              ? 'text-[#79c3e6] font-bold bg-[#1e5e7f]/15'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Map className="w-5 h-5" />
          <span className="text-[10px]">Mappa Live</span>
          <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-[#389ac3] animate-pulse"></span>
        </button>

        <button
          onClick={() => onTabChange('saved')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative ${
            activeTab === 'saved'
              ? 'text-[#79c3e6] font-bold bg-[#1e5e7f]/15'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span className="text-[10px]">Preferiti</span>
          {favoritesCount > 0 && (
            <span className="absolute top-0.5 right-2 w-4 h-4 rounded-full bg-[#1e5e7f] text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
              {favoritesCount}
            </span>
          )}
        </button>

        <button
          onClick={() => onTabChange('passport')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'passport'
              ? 'text-[#79c3e6] font-bold bg-[#1e5e7f]/15'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-5 h-5" />
          <span className="text-[10px]">Passaporto</span>
        </button>
      </div>
    </nav>
  );
};
