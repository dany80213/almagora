export interface Waypoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  teaser: string;
  triggerRadiusMeters: number;
  stopoverMinutes: number;
  coverImage?: string;
  category?: 'monument' | 'fountain' | 'church' | 'square' | 'viewpoint' | 'secret';
}

export interface Tour {
  id: string;
  title: string;
  city: string;
  country: string;
  tagline: string;
  description: string;
  coverImage: string;
  estimatedKm: number;
  estimatedMinutes: number;
  waypointsCount: number;
  difficulty: 'Facile' | 'Medio' | 'Panoramico';
  theme: string;
  isProOnly?: boolean;
  waypoints: Waypoint[];
  tags: string[];
}

export interface MonumentNarration {
  title: string;
  subtitle: string;
  spokenNarration: string;
  historicalHighlights: string[];
  secretDetails: string;
  insiderTip: string;
  trivia?: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  };
  suggestedQuestions: string[];
}

export type VoicePersonaId = 'amico' | 'professore' | 'narratore' | 'famiglia';

export interface VoicePersona {
  id: VoicePersonaId;
  name: string;
  title: string;
  description: string;
  avatar: string;
  samplePhrase: string;
  isPro?: boolean;
}

export interface BluetoothDeviceState {
  connected: boolean;
  deviceName: string | null;
  batteryLevel: number;
  latencyMs: number;
  isHandsFreeActive: boolean;
  isListening: boolean;
  realDeviceId?: string;
  isRealAudioStream?: boolean;
  hasMicrophoneAccess?: boolean;
  outputDevices?: { deviceId: string; label: string }[];
  inputDevices?: { deviceId: string; label: string }[];
}

export interface UserProfile {
  userId: string;
  email: string;
  name: string;
  avatarUrl: string;
  subscriptionTier: 'free' | 'pro' | 'pro_annual';
  syncCode: string;
  totalKmWalked: number;
  hoursListened: number;
  monumentsVisited: string[];
  favoriteTourIds: string[];
  downloadedTourIds: string[];
  badges: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: string;
  }[];
  customTours: Tour[];
  settings: {
    voicePersona: VoicePersonaId;
    speechSpeed: number;
    autoTriggerDistance: number;
    language: string;
    handsFreeMode: boolean;
    vibrateOnTrigger: boolean;
  };
}
