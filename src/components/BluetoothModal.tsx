import React, { useState, useEffect } from 'react';
import {
  Headphones,
  Battery,
  Zap,
  Volume2,
  Check,
  X,
  Radio,
  RefreshCw,
  Mic,
  Speaker,
  Sparkles,
} from 'lucide-react';
import { bluetoothService } from '../services/bluetoothService';
import { BluetoothDeviceState } from '../types/tour';

interface BluetoothModalProps {
  isOpen: boolean;
  onClose: () => void;
  bluetoothState: BluetoothDeviceState;
}

export const BluetoothModal: React.FC<BluetoothModalProps> = ({
  isOpen,
  onClose,
  bluetoothState,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isTestingAudio, setIsTestingAudio] = useState(false);
  const [liveMicLevel, setLiveMicLevel] = useState(0);
  const [detectedDevices, setDetectedDevices] = useState<{
    outputs: { deviceId: string; label: string }[];
    inputs: { deviceId: string; label: string }[];
  }>({ outputs: [], inputs: [] });

  // Poll live mic level when connected to show real hardware reaction
  useEffect(() => {
    if (!isOpen || !bluetoothState.connected) return;

    const interval = setInterval(() => {
      const level = bluetoothService.getLiveMicLevel();
      setLiveMicLevel(level);
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, bluetoothState.connected]);

  // Initial scan on modal open
  useEffect(() => {
    if (isOpen) {
      bluetoothService.scanRealAudioDevices().then((res) => {
        setDetectedDevices(res);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConnectRealHeadset = async (preferredName?: string) => {
    setIsScanning(true);
    try {
      const res = await bluetoothService.connectRealDevice({ preferredName });
      const scanned = await bluetoothService.scanRealAudioDevices();
      setDetectedDevices(scanned);
    } finally {
      setIsScanning(false);
    }
  };

  const handleSelectNativeOutput = async () => {
    setIsScanning(true);
    try {
      await bluetoothService.selectNativeAudioOutput();
      const scanned = await bluetoothService.scanRealAudioDevices();
      setDetectedDevices(scanned);
    } finally {
      setIsScanning(false);
    }
  };

  const handleTestAudioStereo = () => {
    setIsTestingAudio(true);
    bluetoothService.playStereoTest(() => {
      setIsTestingAudio(false);
    });
  };

  const handleSelectSpecificDevice = async (deviceId: string, label: string) => {
    setIsScanning(true);
    try {
      await bluetoothService.connectRealDevice({ deviceId, preferredName: label });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080d14]/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0c141d] border border-[#1e5e7f]/30 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1e5e7f]/20 border border-[#1e5e7f]/40 text-[#79c3e6] flex items-center justify-center shadow-inner">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100">
                Cuffiette & Auricolari Bluetooth
              </h3>
              <p className="text-xs text-stone-400">
                Connessione audio reale e conversazione in cuffia
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

        {/* Current Connection Status Box */}
        {bluetoothState.connected ? (
          <div className="bg-[#080d14]/90 border border-emerald-500/40 rounded-2xl p-4 space-y-3.5 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Auricolari Connessi
                </span>
              </div>
              <span className="text-xs font-mono text-stone-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-[#79c3e6]" />
                {bluetoothState.latencyMs} ms latenza
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-bold text-stone-100 truncate">
                  {bluetoothState.deviceName || 'Auricolari Bluetooth Attivi'}
                </div>
                <div className="text-xs text-emerald-400/90 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Canale audio stereo & microfono vivavoce attivi</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-300 font-mono bg-[#121c27] px-2.5 py-1.5 rounded-lg border border-stone-800 shrink-0">
                <Battery className="w-4 h-4 text-emerald-400" />
                <span>{bluetoothState.batteryLevel}%</span>
              </div>
            </div>

            {/* Live Microphone Reaction Level */}
            <div className="bg-[#121c27] border border-stone-800/80 rounded-xl p-2.5 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-[#79c3e6]" />
                  <span>Microfono auricolari in ascolto (parla per testare):</span>
                </span>
                <span className="font-mono text-xs text-[#79c3e6]">{liveMicLevel}%</span>
              </div>
              <div className="w-full h-2 bg-[#080d14] rounded-full overflow-hidden border border-[#1e5e7f]/20">
                <div
                  className="h-full bg-gradient-to-r from-[#1e5e7f] to-emerald-400 transition-all duration-75 rounded-full"
                  style={{ width: `${Math.max(5, liveMicLevel)}%` }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleTestAudioStereo}
                disabled={isTestingAudio}
                className="flex-1 py-2.5 px-3 bg-[#1e5e7f] hover:bg-[#287096] text-white text-xs font-semibold rounded-xl border border-[#389ac3]/30 flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isTestingAudio ? 'Riproduzione test stereo...' : 'Test Audio in Cuffia (L/R)'}</span>
              </button>
              <button
                onClick={() => bluetoothService.disconnect()}
                className="py-2.5 px-3.5 bg-red-950/40 hover:bg-red-950/70 text-red-300 text-xs font-medium rounded-xl border border-red-800/40 transition-colors"
              >
                Disconnetti
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#080d14]/80 border border-[#1e5e7f]/30 rounded-2xl p-5 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#121c27] border border-[#1e5e7f]/40 flex items-center justify-center text-[#79c3e6] shadow-inner">
              <Headphones className="w-7 h-7" />
            </div>
            <div>
              <div className="text-sm font-bold text-stone-100">
                Collega le tue cuffie ad Almagora
              </div>
              <div className="text-xs text-stone-400 max-w-xs mx-auto mt-1 leading-relaxed">
                Infila gli auricolari (AirPods, Galaxy Buds, Sony, cuffiette Bluetooth o con filo) e premi il pulsante per attivare l'ascolto GPS e il microfono.
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => handleConnectRealHeadset()}
                disabled={isScanning}
                className="w-full py-3 bg-[#1e5e7f] hover:bg-[#287096] text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-98 disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Connessione auricolari in corso...</span>
                  </>
                ) : (
                  <>
                    <Headphones className="w-4 h-4" />
                    <span>Connetti Auricolari del Dispositivo</span>
                  </>
                )}
              </button>

              <button
                onClick={handleSelectNativeOutput}
                disabled={isScanning}
                className="w-full py-2 bg-[#121c27] hover:bg-[#1a293a] text-stone-300 hover:text-white text-xs font-medium rounded-xl border border-[#1e5e7f]/30 transition-colors flex items-center justify-center gap-1.5"
              >
                <Speaker className="w-3.5 h-3.5 text-[#79c3e6]" />
                <span>Seleziona Uscita Audio di Sistema</span>
              </button>
            </div>
          </div>
        )}

        {/* Real Detected Devices List */}
        {detectedDevices.outputs.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center justify-between">
              <span>Dispositivi audio rilevati:</span>
              <button
                onClick={() => bluetoothService.scanRealAudioDevices().then(setDetectedDevices)}
                className="text-[10px] text-[#79c3e6] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Aggiorna</span>
              </button>
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {detectedDevices.outputs.map((dev) => {
                const isSelected = bluetoothState.realDeviceId === dev.deviceId;
                return (
                  <button
                    key={dev.deviceId}
                    onClick={() => handleSelectSpecificDevice(dev.deviceId, dev.label)}
                    className={`w-full p-2.5 rounded-xl border text-xs text-left transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#1e5e7f]/30 border-[#1e5e7f] text-[#79c3e6] font-semibold'
                        : 'bg-[#080d14]/70 border-stone-800 text-stone-300 hover:border-[#1e5e7f]/40'
                    }`}
                  >
                    <span className="truncate pr-2">{dev.label || 'Dispositivo Audio'}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#79c3e6] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick headphone presets (AirPods, Sony, etc.) */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Oppure ottimizza profilo auricolare:
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              'AirPods Pro / Max',
              'Sony WF-1000XM5',
              'Bose QuietComfort',
              'Galaxy Buds Pro',
            ].map((model) => (
              <button
                key={model}
                onClick={() => handleConnectRealHeadset(model)}
                className={`p-2.5 rounded-xl border text-xs text-left transition-colors flex items-center justify-between ${
                  bluetoothState.deviceName?.includes(model)
                    ? 'bg-[#1e5e7f]/25 border-[#1e5e7f] text-[#79c3e6] font-semibold'
                    : 'bg-[#080d14]/70 border-stone-800 text-stone-300 hover:border-[#1e5e7f]/40'
                }`}
              >
                <span className="truncate">{model}</span>
                {bluetoothState.deviceName?.includes(model) && (
                  <Check className="w-3.5 h-3.5 text-[#79c3e6] shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Physical hardware controls guide */}
        <div className="bg-[#080d14]/60 border border-stone-800/80 rounded-xl p-3 text-[11px] text-stone-400 space-y-1">
          <div className="font-semibold text-stone-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#79c3e6]" />
            <span>Controlli fisici durante il tour a piedi:</span>
          </div>
          <p>
            • <strong>1 Tap / Pressione stelo</strong>: Metti in pausa o riprendi la spiegazione.
          </p>
          <p>
            • <strong>2 Tap</strong>: Salta alla prossima tappa del percorso.
          </p>
          <p>
            • <strong>Pressione prolungata</strong>: Apri la chat vocale per parlare con Almagora.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#121c27] hover:bg-[#1a293a] border border-stone-700 text-stone-200 text-xs font-bold rounded-xl transition-colors"
        >
          Chiudi
        </button>
      </div>
    </div>
  );
};
