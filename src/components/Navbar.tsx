import React from 'react';
import { Headphones, Bluetooth, User, Sparkles, Crown, Compass } from 'lucide-react';
import { BluetoothDeviceState, UserProfile } from '../types/tour';

interface NavbarProps {
  bluetoothState: BluetoothDeviceState;
  userProfile: UserProfile;
  onOpenBluetooth: () => void;
  onOpenProfile: () => void;
  onOpenSubscription: () => void;
  onOpenCreateTour: () => void;
  activeCity: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  bluetoothState,
  userProfile,
  onOpenBluetooth,
  onOpenProfile,
  onOpenSubscription,
  onOpenCreateTour,
  activeCity,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#080d14]/85 backdrop-blur-xl border-b border-slate-800/80 px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo & Active City */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#1e5e7f] to-[#12394e] text-white flex items-center justify-center font-serif font-black text-lg shadow-[0_0_18px_rgba(30,94,127,0.45)] border border-[#389ac3]/30">
              <span>A</span>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#389ac3] border-2 border-[#080d14]"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold tracking-tight text-white font-serif">
                  Almagora
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#79c3e6] bg-[#1e5e7f]/20 px-2 py-0.5 rounded-md border border-[#1e5e7f]/40 font-mono">
                  Audio GPS
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-[#93d2ef] bg-[#1e5e7f]/15 border border-[#1e5e7f]/30 px-2 py-0.5 rounded-full font-mono">
                  <Sparkles className="w-2.5 h-2.5 text-[#389ac3]" />
                  <span>Gemini 3.8</span>
                </span>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <span>Città attiva:</span>
                <span className="text-slate-200 font-semibold">{activeCity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls: Create Tour, Bluetooth indicator, Pro badge, Profile */}
        <div className="flex items-center gap-2">
          {/* Create AI Tour Button */}
          <button
            onClick={onOpenCreateTour}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-[#1e5e7f]/20 text-slate-200 hover:text-[#79c3e6] border border-slate-800 hover:border-[#1e5e7f]/50 text-xs font-semibold transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#389ac3]" />
            <span>Crea Tour AI</span>
          </button>

          {/* Bluetooth Earphones Connection Pill */}
          <button
            onClick={onOpenBluetooth}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              bluetoothState.connected
                ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300 shadow-sm'
                : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Gestisci connessione auricolari Bluetooth"
          >
            {bluetoothState.connected ? (
              <>
                <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline max-w-[100px] truncate">
                  {bluetoothState.deviceName}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </>
            ) : (
              <>
                <Bluetooth className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cuffie</span>
              </>
            )}
          </button>

          {/* Pro Badge */}
          {userProfile.subscriptionTier !== 'free' ? (
            <button
              onClick={onOpenSubscription}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#1e5e7f]/20 border border-[#1e5e7f]/50 text-[#79c3e6] text-xs font-bold transition-all hover:bg-[#1e5e7f]/30"
            >
              <Crown className="w-3.5 h-3.5 text-[#389ac3]" />
              <span className="hidden sm:inline">Pass Pro</span>
            </button>
          ) : (
            <button
              onClick={onOpenSubscription}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1e5e7f] text-white text-xs font-bold shadow-[0_2px_12px_rgba(30,94,127,0.4)] hover:bg-[#2677a1] transition-transform active:scale-95"
            >
              <Crown className="w-3.5 h-3.5 fill-current" />
              <span>Pass Pro</span>
            </button>
          )}

          {/* Profile & Sync Button */}
          <button
            onClick={onOpenProfile}
            className="w-9 h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-[#1e5e7f]/40 text-slate-200 flex items-center justify-center transition-colors relative"
            title="Profilo & Sincronizzazione Almagora"
          >
            <User className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#389ac3]"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
