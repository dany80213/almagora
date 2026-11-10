import React, { useState } from 'react';
import { Sparkles, MapPin, Clock, Compass, X, Check, Loader2 } from 'lucide-react';
import { generateCustomTour } from '../services/ciceroneApi';
import { Tour } from '../types/tour';

interface CreateTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTourCreated: (newTour: Tour) => void;
  userLocation: { lat: number; lng: number } | null;
}

export const CreateTourModal: React.FC<CreateTourModalProps> = ({
  isOpen,
  onClose,
  onTourCreated,
  userLocation,
}) => {
  const [city, setCity] = useState('Verona');
  const [theme, setTheme] = useState('Misteri, Amore & Architettura Scaligera');
  const [duration, setDuration] = useState(75);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Storia antica',
    'Leggende',
    'Punti panoramici',
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const availableInterests = [
    'Storia antica',
    'Arte & Pittura',
    'Leggende & Misteri',
    'Botteghe & Artigiani',
    'Cibo & Tradizioni locali',
    'Punti panoramici',
    'Architettura segreta',
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const cityCoordinatesMap: Record<string, { lat: number; lng: number }> = {
    padova: { lat: 45.4072, lng: 11.8756 },
    verona: { lat: 45.4388, lng: 10.9944 },
    bologna: { lat: 44.4939, lng: 11.3432 },
    milano: { lat: 45.4642, lng: 9.1919 },
    roma: { lat: 41.8902, lng: 12.4922 },
    firenze: { lat: 43.7696, lng: 11.2558 },
    venezia: { lat: 45.4342, lng: 12.3389 },
    napoli: { lat: 40.8498, lng: 14.2575 },
    torino: { lat: 45.0709, lng: 7.6859 },
    palermo: { lat: 38.1157, lng: 13.3615 },
    genova: { lat: 44.4056, lng: 8.9463 },
    siena: { lat: 43.3184, lng: 11.3316 },
    matera: { lat: 40.6664, lng: 16.6043 },
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim() || isGenerating) return;

    setIsGenerating(true);
    setErrorMsg(null);

    const normCity = city.toLowerCase().trim();
    const resolvedCoords = cityCoordinatesMap[normCity] || userLocation || { lat: 45.4072, lng: 11.8756 };

    try {
      const generated = await generateCustomTour({
        city: city.trim(),
        theme: theme.trim(),
        durationMinutes: duration,
        userInterests: selectedInterests,
        startCoordinates: resolvedCoords,
      });

      onTourCreated(generated);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Si è verificato un errore durante la creazione del tour. Riprova tra poco.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080d14]/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0c141d] border border-[#1e5e7f]/30 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1e5e7f]/20 border border-[#1e5e7f]/40 text-[#79c3e6] flex items-center justify-center shadow-inner">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100">
                Genera Tour AI su Misura
              </h3>
              <p className="text-xs text-stone-400">
                Almagora creerà un itinerario a tappe con coordinate GPS e storie audio
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

        {errorMsg && (
          <div className="bg-red-950/60 border border-red-500/50 p-3 rounded-xl text-xs text-red-300">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Città o Borgo
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Es. Padova, Verona, Siena, Taormina, Matera..."
                className="w-full bg-[#080d14] border border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-[#389ac3]"
              />
            </div>
            <div className="flex gap-1.5 mt-2 overflow-x-auto pb-0.5 scrollbar-none">
              {['Padova', 'Verona', 'Bologna', 'Siena', 'Torino', 'Palermo'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCity(c)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors shrink-0 ${
                    city.toLowerCase() === c.toLowerCase()
                      ? 'bg-[#1e5e7f]/30 border-[#1e5e7f] text-[#79c3e6] font-semibold'
                      : 'bg-[#080d14] border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Tema o Atmosfera dell'itinerario
            </label>
            <input
              type="text"
              required
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="Es. Rinascimento & botteghe, Notte romantica, Misteri..."
              className="w-full bg-[#080d14] border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-[#389ac3]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Durata a piedi desiderata
              </label>
              <span className="text-xs font-mono font-bold text-[#79c3e6]">
                {duration} minuti (~{(duration / 30).toFixed(1)} km)
              </span>
            </div>
            <input
              type="range"
              min={30}
              max={150}
              step={15}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-[#1e5e7f] cursor-pointer"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
              Seleziona interessi particolari:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableInterests.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#1e5e7f]/30 border-[#1e5e7f] text-[#79c3e6]'
                        : 'bg-[#080d14]/70 border-stone-800 text-stone-400 hover:border-[#1e5e7f]/40'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#79c3e6]" />}
                    <span>{interest}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !city.trim()}
            className="w-full py-3 bg-[#1e5e7f] hover:bg-[#287096] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-98 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Almagora sta calcolando il percorso e le storie...</span>
              </>
            ) : (
              <>
                <Compass className="w-4 h-4" />
                <span>Genera Itinerario Sonoro AI</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
