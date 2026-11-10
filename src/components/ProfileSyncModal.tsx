import React, { useState } from 'react';
import {
  User,
  Key,
  Smartphone,
  Laptop,
  RefreshCw,
  Copy,
  Check,
  X,
  Shield,
  Award,
  Compass,
  Heart,
  Download,
  Mail,
  Lock,
} from 'lucide-react';
import { UserProfile } from '../types/tour';
import { fetchSyncedProfile, syncUserProfile } from '../services/ciceroneApi';

interface ProfileSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onOpenSubscription: () => void;
}

export const ProfileSyncModal: React.FC<ProfileSyncModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
  onOpenSubscription,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'sync' | 'auth'>('profile');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [copiedCode, setCopiedCode] = useState(false);
  const [syncCodeInput, setSyncCodeInput] = useState('');
  const [syncStatusMsg, setSyncStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Form states
  const [nameInput, setNameInput] = useState(userProfile.name);
  const [emailInput, setEmailInput] = useState(userProfile.email);
  const [passwordInput, setPasswordInput] = useState('');

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userProfile.syncCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSyncFromCode = async () => {
    if (!syncCodeInput.trim()) return;
    setIsSyncing(true);
    setSyncStatusMsg(null);

    try {
      const remoteData = await fetchSyncedProfile(syncCodeInput.trim());
      if (remoteData) {
        onUpdateProfile({
          ...userProfile,
          ...remoteData,
          syncCode: syncCodeInput.toUpperCase().trim(),
        });
        setSyncStatusMsg({
          type: 'success',
          text: `Profilo sincronizzato! Ripristinati ${remoteData.favorites?.length || 0} percorsi preferiti e ${remoteData.badges?.length || 0} badge.`,
        });
      }
    } catch (err: any) {
      setSyncStatusMsg({
        type: 'error',
        text: err.message || 'Codice di sincronizzazione non valido o non trovato.',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleForceCloudSave = async () => {
    setIsSyncing(true);
    try {
      await syncUserProfile(userProfile.syncCode, userProfile);
      setSyncStatusMsg({
        type: 'success',
        text: 'Dati sincronizzati con il cloud Almagora per tutti i tuoi dispositivi.',
      });
    } catch {
      setSyncStatusMsg({
        type: 'error',
        text: 'Errore durante il salvataggio sul cloud.',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    const updated = {
      ...userProfile,
      name: nameInput || 'Viaggiatore',
      email: emailInput,
    };
    onUpdateProfile(updated);
    syncUserProfile(userProfile.syncCode, updated);
    setActiveTab('profile');
    setSyncStatusMsg({
      type: 'success',
      text: authMode === 'register' ? 'Account registrato e sincronizzato!' : 'Accesso effettuato con successo!',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080d14]/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0c141d] border border-[#1e5e7f]/30 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1e5e7f]/20 border border-[#1e5e7f]/40 text-[#79c3e6] flex items-center justify-center shadow-inner">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100">
                Profilo Viaggiatore & Cloud Sync
              </h3>
              <p className="text-xs text-stone-400">
                Sincronizza preferiti, itinerari e progressi su tutti i tuoi dispositivi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-100 rounded-xl hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex bg-[#080d14] p-1 rounded-xl border border-stone-800">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'profile'
                ? 'bg-[#1e5e7f] text-white shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Passaporto & Statistiche
          </button>
          <button
            onClick={() => setActiveTab('sync')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'sync'
                ? 'bg-[#1e5e7f] text-white shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Sincronizza Dispositivi</span>
          </button>
          <button
            onClick={() => setActiveTab('auth')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'auth'
                ? 'bg-[#1e5e7f] text-white shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Account / Login
          </button>
        </div>

        {/* Status alert message */}
        {syncStatusMsg && (
          <div
            className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
              syncStatusMsg.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                : 'bg-red-950/60 border-red-500/50 text-red-300'
            }`}
          >
            {syncStatusMsg.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <X className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{syncStatusMsg.text}</span>
          </div>
        )}

        {/* Tab 1: Profile & Passport */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            {/* User badge card */}
            <div className="bg-[#080d14]/70 border border-[#1e5e7f]/30 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1e5e7f] to-[#389ac3] text-white font-bold flex items-center justify-center text-lg shadow-md">
                  {userProfile.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-100">
                    {userProfile.name}
                  </div>
                  <div className="text-xs text-stone-400">
                    {userProfile.email}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                    userProfile.subscriptionTier !== 'free'
                      ? 'bg-[#1e5e7f]/30 text-[#79c3e6] border border-[#1e5e7f]/50'
                      : 'bg-stone-800 text-stone-300'
                  }`}
                >
                  {userProfile.subscriptionTier === 'pro_annual'
                    ? 'Pro Annuale'
                    : userProfile.subscriptionTier === 'pro'
                    ? 'Pro Mensile'
                    : 'Base Gratuito'}
                </span>
                {userProfile.subscriptionTier === 'free' && (
                  <button
                    onClick={onOpenSubscription}
                    className="block text-[11px] text-[#79c3e6] font-semibold hover:underline mt-1"
                  >
                    Passa a Pro
                  </button>
                )}
              </div>
            </div>

            {/* Travel stats */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-[#080d14]/70 border border-stone-800 rounded-xl p-3 text-center">
                <span className="text-xs text-stone-400 block">Km a piedi</span>
                <span className="text-lg font-mono font-bold text-[#79c3e6]">
                  {userProfile.totalKmWalked.toFixed(1)}
                </span>
              </div>
              <div className="bg-[#080d14]/70 border border-stone-800 rounded-xl p-3 text-center">
                <span className="text-xs text-stone-400 block">Monumenti</span>
                <span className="text-lg font-mono font-bold text-[#79c3e6]">
                  {userProfile.monumentsVisited.length}
                </span>
              </div>
              <div className="bg-[#080d14]/70 border border-stone-800 rounded-xl p-3 text-center">
                <span className="text-xs text-stone-400 block">Ore di ascolto</span>
                <span className="text-lg font-mono font-bold text-emerald-400">
                  {userProfile.hoursListened.toFixed(1)}h
                </span>
              </div>
            </div>

            {/* Traveler Badges */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#79c3e6]" />
                  <span>Badge & Timbri del Passaporto</span>
                </div>
                <span className="text-xs text-stone-400 font-mono">
                  {userProfile.badges.length} sbloccati
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {userProfile.badges.map((b) => (
                  <div
                    key={b.id}
                    className="bg-[#080d14]/50 border border-stone-800/80 rounded-xl p-2.5 flex items-center gap-2.5"
                  >
                    <span className="text-2xl">{b.icon}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-stone-200 truncate">
                        {b.title}
                      </div>
                      <div className="text-[10px] text-stone-400 truncate">
                        {b.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Cross-Device Synchronization */}
        {activeTab === 'sync' && (
          <div className="space-y-4">
            {/* Sync Explanation */}
            <div className="bg-gradient-to-r from-[#1e5e7f]/25 via-[#0c141d] to-[#0c141d] border border-[#1e5e7f]/40 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#79c3e6] uppercase tracking-wider">
                <Laptop className="w-4 h-4" />
                <span>Sincronizzazione Senza Fili Multidevice</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Usa questo codice unico per sincronizzare istantaneamente i tuoi percorsi preferiti, le registrazioni audio offline e lo storico di ascolto tra il tuo smartphone, tablet o computer.
              </p>
            </div>

            {/* Your Sync Code */}
            <div className="bg-[#080d14]/80 border border-[#1e5e7f]/30 rounded-2xl p-4 space-y-2 text-center">
              <span className="text-xs text-stone-400 uppercase tracking-wider">
                Il Tuo Codice Personale di Sincronizzazione:
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl font-mono font-black text-[#79c3e6] tracking-widest bg-[#121c27] px-4 py-1.5 rounded-xl border border-[#1e5e7f]/40">
                  {userProfile.syncCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-2 text-stone-300 hover:text-[#79c3e6] bg-[#121c27] hover:bg-[#1a293a] border border-stone-800 rounded-xl transition-colors"
                  title="Copia codice"
                >
                  {copiedCode ? (
                    <Check className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="text-[11px] text-stone-500">
                Condividi o inserisci questo codice sull’altro dispositivo per unire i dati.
              </div>
            </div>

            {/* Enter Code from other device */}
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                Hai aperto Almagora su un altro telefono o PC?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={syncCodeInput}
                  onChange={(e) => setSyncCodeInput(e.target.value)}
                  placeholder="Es. ALM-ABC123"
                  className="flex-1 bg-[#080d14] border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-[#389ac3] font-mono uppercase"
                />
                <button
                  onClick={handleSyncFromCode}
                  disabled={!syncCodeInput.trim() || isSyncing}
                  className="px-4 py-2.5 bg-[#1e5e7f] hover:bg-[#287096] text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-40"
                >
                  {isSyncing ? 'Connessione...' : 'Sincronizza Ora'}
                </button>
              </div>
            </div>

            {/* Cloud manual refresh */}
            <button
              onClick={handleForceCloudSave}
              disabled={isSyncing}
              className="w-full py-2.5 bg-[#121c27] hover:bg-[#1a293a] text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Salva e aggiorna stato su cloud Almagora</span>
            </button>
          </div>
        )}

        {/* Tab 3: Account / Register */}
        {activeTab === 'auth' && (
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="flex justify-center gap-2 border-b border-stone-800 pb-2">
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`text-xs font-semibold pb-1 border-b-2 transition-colors ${
                  authMode === 'register'
                    ? 'border-[#79c3e6] text-[#79c3e6]'
                    : 'border-transparent text-stone-400'
                }`}
              >
                Nuova Registrazione
              </button>
              <span className="text-stone-600">·</span>
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`text-xs font-semibold pb-1 border-b-2 transition-colors ${
                  authMode === 'login'
                    ? 'border-[#79c3e6] text-[#79c3e6]'
                    : 'border-transparent text-stone-400'
                }`}
              >
                Accedi con Profilo Esistente
              </button>
            </div>

            {authMode === 'register' && (
              <div>
                <label className="text-xs font-medium text-stone-300 block mb-1">
                  Nome o Nickname Viaggiatore
                </label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Es. Marco Rossi"
                  className="w-full bg-[#080d14] border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-[#389ac3]"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-stone-300 block mb-1">
                Indirizzo Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="viaggiatore@esempio.it"
                  className="w-full bg-[#080d14] border border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-[#389ac3]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-stone-300 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#080d14] border border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-[#389ac3]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1e5e7f] hover:bg-[#287096] text-white font-bold text-xs rounded-xl shadow-lg transition-transform active:scale-98"
            >
              {authMode === 'register' ? 'Completa Registrazione' : 'Accedi e Sincronizza'}
            </button>
          </form>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#121c27] hover:bg-[#1a293a] text-stone-200 text-xs font-bold rounded-xl transition-colors border border-stone-800"
        >
          Chiudi
        </button>
      </div>
    </div>
  );
};
