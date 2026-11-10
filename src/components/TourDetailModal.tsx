import React, { useState } from 'react';
import { Tour, UserProfile, Waypoint } from '../types/tour';
import {
  X,
  Play,
  Download,
  Check,
  Clock,
  Compass,
  MapPin,
  Bookmark,
  Share2,
  Crown,
  Volume2,
} from 'lucide-react';

interface TourDetailModalProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
  onStartTour: (tour: Tour) => void;
  userProfile: UserProfile;
  isFavorite: boolean;
  onToggleFavorite: (tourId: string) => void;
  onOpenSubscription: () => void;
  onTourDownloaded: (tourId: string) => void;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({
  tour,
  isOpen,
  onClose,
  onStartTour,
  userProfile,
  isFavorite,
  onToggleFavorite,
  onOpenSubscription,
  onTourDownloaded,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  if (!isOpen || !tour) return null;

  const isDownloaded = userProfile.downloadedTourIds.includes(tour.id);
  const isProUser = userProfile.subscriptionTier !== 'free';

  const handleDownload = () => {
    if (!isProUser) {
      onOpenSubscription();
      return;
    }

    setDownloading(true);
    setDownloadProgress(20);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          onTourDownloaded(tour.id);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080d14]/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0c141d] border border-[#1e5e7f]/30 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Cover Hero Image */}
        <div className="relative aspect-video w-full shrink-0">
          <img
            src={tour.coverImage}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c141d] via-[#0c141d]/40 to-transparent"></div>

          {/* Top buttons */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="bg-[#080d14]/85 backdrop-blur-md text-[#79c3e6] font-bold text-xs px-3 py-1 rounded-full border border-[#1e5e7f]/40">
              {tour.city}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => onToggleFavorite(tour.id)}
                className={`p-2 rounded-xl backdrop-blur-md border transition-colors ${
                  isFavorite
                    ? 'bg-[#1e5e7f] text-white border-[#389ac3]'
                    : 'bg-[#080d14]/70 text-stone-300 hover:text-white border-stone-700'
                }`}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#080d14]/70 text-stone-300 hover:text-white border border-stone-700 backdrop-blur-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-3 left-5 right-5">
            <h2 className="text-xl font-bold text-white font-serif tracking-tight">
              {tour.title}
            </h2>
            <p className="text-xs text-stone-300 mt-0.5 line-clamp-1">
              {tour.tagline}
            </p>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Tour Meta pills */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#080d14]/70 border border-stone-800 rounded-xl p-2.5 text-center">
              <span className="text-[10px] text-stone-400 block uppercase">Distanza</span>
              <span className="text-sm font-bold font-mono text-[#79c3e6]">
                {tour.estimatedKm} km
              </span>
            </div>
            <div className="bg-[#080d14]/70 border border-stone-800 rounded-xl p-2.5 text-center">
              <span className="text-[10px] text-stone-400 block uppercase">Tempo</span>
              <span className="text-sm font-bold font-mono text-[#79c3e6]">
                ~{tour.estimatedMinutes} min
              </span>
            </div>
            <div className="bg-[#080d14]/70 border border-stone-800 rounded-xl p-2.5 text-center">
              <span className="text-[10px] text-stone-400 block uppercase">Tappe GPS</span>
              <span className="text-sm font-bold font-mono text-emerald-400">
                {tour.waypointsCount} monumenti
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-stone-300 leading-relaxed">
            {tour.description}
          </p>

          {/* Offline Download Box */}
          <div className="bg-[#080d14]/80 border border-[#1e5e7f]/30 rounded-2xl p-3.5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-200">
                <Download className="w-4 h-4 text-[#79c3e6]" />
                <span>Disponibilità Offline</span>
                {tour.isProOnly && (
                  <span className="text-[10px] text-[#79c3e6] bg-[#1e5e7f]/20 border border-[#1e5e7f]/40 px-1.5 py-0.2 rounded font-mono">
                    PRO
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-400 truncate">
                {isDownloaded
                  ? 'Pacchetto audio e mappe scaricato sulla memoria'
                  : 'Salva audio e cartografia per navigare senza connessione'}
              </p>
              {downloading && (
                <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-[#1e5e7f] transition-all duration-200"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleDownload}
              disabled={downloading || isDownloaded}
              className={`shrink-0 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isDownloaded
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                  : 'bg-[#121c27] hover:bg-[#1a293a] text-stone-200 border border-stone-700'
              }`}
            >
              {isDownloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Scaricato</span>
                </>
              ) : downloading ? (
                <span>Download...</span>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-[#79c3e6]" />
                  <span>Scarica</span>
                </>
              )}
            </button>
          </div>

          {/* Sequential Waypoint List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Tappe del percorso:
            </h4>
            <div className="space-y-2">
              {tour.waypoints.map((wp, idx) => (
                <div
                  key={wp.id}
                  className="bg-[#080d14]/50 border border-stone-800/80 rounded-xl p-3 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-[#0e1722] border border-[#1e5e7f]/50 text-[#79c3e6] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-stone-200">
                      {wp.name}
                    </div>
                    <div className="text-[11px] text-stone-400 line-clamp-2 mt-0.5 leading-relaxed">
                      {wp.teaser}
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-500 shrink-0 font-mono">
                    ~{wp.stopoverMinutes}m
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Start Tour Action CTA */}
        <div className="p-4 border-t border-stone-800 bg-[#0c141d] shrink-0">
          <button
            onClick={() => {
              onStartTour(tour);
              onClose();
            }}
            className="w-full py-3 bg-[#1e5e7f] hover:bg-[#287096] text-white font-bold text-sm rounded-xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-98"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Inizia Tour Guidato con GPS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
