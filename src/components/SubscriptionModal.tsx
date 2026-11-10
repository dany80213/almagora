import React, { useState } from 'react';
import { Crown, Check, Download, Mic, Sparkles, ShieldCheck, X, Zap } from 'lucide-react';
import { UserProfile } from '../types/tour';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpgradeTier: (tier: 'pro' | 'pro_annual') => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpgradeTier,
}) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = (tier: 'pro' | 'pro_annual') => {
    setIsProcessing(true);
    setTimeout(() => {
      onUpgradeTier(tier);
      setIsProcessing(false);
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        onClose();
      }, 1400);
    }, 800);
  };

  const isAlreadyPro = userProfile.subscriptionTier !== 'free';

  return (
    <div className="fixed inset-0 z-50 bg-[#080d14]/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0c141d] border border-[#1e5e7f]/30 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1e5e7f]/20 border border-[#1e5e7f]/40 text-[#79c3e6] flex items-center justify-center shadow-inner">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-stone-100">Almagora Pass Pro</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#1e5e7f] text-white">
                  Esperienza Premium
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Sblocca tour offline, voci neurali esclusive e vivavoce continuo
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

        {/* Success toast */}
        {successMessage && (
          <div className="bg-emerald-950/80 border border-emerald-500 p-3 rounded-2xl flex items-center gap-2 text-emerald-300 text-xs font-semibold animate-in zoom-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Abbonamento Pro attivato con successo! Funzioni offline e voci neurali sbloccate.</span>
          </div>
        )}

        {/* Billing cycle switcher */}
        <div className="flex items-center justify-center gap-1 p-1 bg-[#080d14] rounded-xl border border-stone-800 max-w-xs mx-auto">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-colors ${
              billingPeriod === 'monthly'
                ? 'bg-[#1e5e7f] text-white shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Mensile
          </button>
          <button
            onClick={() => setBillingPeriod('annual')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 ${
              billingPeriod === 'annual'
                ? 'bg-[#1e5e7f] text-white shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>Annuale</span>
            <span className="text-[10px] font-bold px-1 rounded bg-[#080d14] text-[#79c3e6]">
              -50%
            </span>
          </button>
        </div>

        {/* Pricing Card */}
        <div className="relative rounded-2xl border-2 border-[#1e5e7f]/60 bg-gradient-to-b from-[#1e5e7f]/15 via-[#0c141d] to-[#0c141d] p-5 space-y-4">
          <div className="flex items-baseline justify-between">
            <div>
              <h4 className="text-base font-bold text-stone-100">Almagora Unlimited</h4>
              <p className="text-xs text-stone-400">Tutti i tour di Padova, Roma, Firenze, Venezia e del mondo</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-[#79c3e6] font-mono">
                {billingPeriod === 'annual' ? '€29,99' : '€4,99'}
              </span>
              <span className="text-xs text-stone-400 block">
                {billingPeriod === 'annual' ? '/anno (pari a 2,49€/m)' : '/mese'}
              </span>
            </div>
          </div>

          {/* Perks list */}
          <div className="space-y-2.5 pt-2 border-t border-stone-800/80">
            <div className="flex items-start gap-2.5 text-xs text-stone-200">
              <Download className="w-4 h-4 text-[#79c3e6] shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-100">Tour Guidati Offline Completi</strong>
                <p className="text-stone-400">Scarica mappe vettoriali, narrazioni audio e foto prima di partire. Viaggia all'estero a consumo zero.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-stone-200">
              <Mic className="w-4 h-4 text-[#79c3e6] shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-100">Personalizzazione Vocale Accurata (Neurale)</strong>
                <p className="text-stone-400">Scegli tra l’Archeologa, il Cantastorie teatrale o Almagora amichevole con timbro ad altissima fedeltà.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-stone-200">
              <Zap className="w-4 h-4 text-[#79c3e6] shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-100">Vivavoce Duplex Continuo in Cuffia</strong>
                <p className="text-stone-400">Parla e fai domande senza toccare lo schermo, solo con il microfono dei tuoi auricolari Bluetooth.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-stone-200">
              <Sparkles className="w-4 h-4 text-[#79c3e6] shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-100">Generatore di Percorsi AI Illimitato</strong>
                <p className="text-stone-400">Crea tour su misura per qualunque città o borgo del pianeta in pochi secondi.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleSubscribe(billingPeriod === 'annual' ? 'pro_annual' : 'pro')}
            disabled={isProcessing}
            className="w-full py-3 bg-[#1e5e7f] hover:bg-[#287096] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-98 disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Attivazione in corso...</span>
            ) : isAlreadyPro ? (
              <span>Aggiorna / Gestisci Piano Pro Attivo</span>
            ) : (
              <>
                <Crown className="w-4 h-4" />
                <span>Attiva Almagora Pass Pro</span>
              </>
            )}
          </button>
        </div>

        {/* Free Plan comparison footnote */}
        <div className="bg-[#080d14]/70 rounded-xl p-3 border border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
          <div>
            <span className="font-semibold text-stone-300">Piano Base Gratuito:</span> 3 tour al giorno con connessione online e voce standard.
          </div>
          <span className="text-stone-500 uppercase font-mono">Incluso</span>
        </div>

        <div className="text-center text-[10px] text-stone-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Cancellabile in ogni momento senza penali · Garanzia 14 giorni soddisfatti o rimborsati</span>
        </div>
      </div>
    </div>
  );
};
