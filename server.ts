import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { generateSmartMonumentAnswer, MONUMENT_KNOWLEDGE_BASE } from './src/data/monumentKnowledge.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Dynamic Gemini client getter (checks process.env.GEMINI_API_KEY or process.env.API_KEY dynamically on every call)
function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
  if (!key || key === 'MY_GEMINI_API_KEY' || key.trim().length < 8) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: key.trim(),
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory cross-device cloud sync store (persisted in RAM during session)
interface SyncProfileData {
  userId: string;
  email: string;
  name: string;
  subscriptionTier: 'free' | 'pro' | 'pro_annual';
  favorites: string[];
  completedTours: string[];
  visitedMonuments: string[];
  badges: string[];
  customTours: any[];
  settings: {
    voicePersona: string;
    speechSpeed: number;
    autoTriggerDistance: number;
    language: string;
    handsFreeMode: boolean;
  };
  lastUpdated: string;
}

const syncStore = new Map<string, SyncProfileData>();

// Seed a default demo sync code so the user can test instant multi-device restore
syncStore.set('CICERONE-DEMO', {
  userId: 'user-demo-1',
  email: 'viaggiatore.esplora@cicerone.ai',
  name: 'Marco & Giulia',
  subscriptionTier: 'pro',
  favorites: ['roma-imperiale', 'firenze-rinascimento'],
  completedTours: ['roma-imperiale'],
  visitedMonuments: ['colosseo', 'fori-imperiali', 'pantheon'],
  badges: ['esploratore_antico', 'cuffie_oro', 'camminatore_5km'],
  customTours: [],
  settings: {
    voicePersona: 'amico',
    speechSpeed: 1.0,
    autoTriggerDistance: 70,
    language: 'it',
    handsFreeMode: true,
  },
  lastUpdated: new Date().toISOString(),
});

// 1. Cicerone Contextual Audio Narration Endpoint
app.post('/api/cicerone/narrate', async (req, res) => {
  try {
    const {
      monumentName,
      city = 'Roma',
      userInterests = ['storia', 'arte', 'curiosità'],
      voicePersona = 'amico',
      language = 'it',
      isOffline = false,
    } = req.body;

    if (!monumentName) {
      return res.status(400).json({ error: 'monumentName is required' });
    }

    const personaDescriptions: Record<string, string> = {
      amico: 'Un amico del posto brillante, accogliente e informale, che racconta aneddoti succosi e dettagli insoliti come se stesse passeggiando con te con le cuffie.',
      professore: 'Uno storico dell’arte colto ed entusiasta, appassionato di fonti archeologiche, architettura e contesto politico dell’epoca.',
      narratore: 'Un cantastorie teatrale ed evocativo che fa rivivere l’atmosfera d’epoca, le passioni dei personaggi storici e le leggende misteriose.',
      famiglia: 'Una guida giocosa e divertente, adatta a tutta la famiglia con similitudini curiose e dettagli visivi facili da scorgere.',
    };

    const chosenPersona = personaDescriptions[voicePersona] || personaDescriptions.amico;

    const prompt = `Sei "Cicerone AI", la guida turistica audio personale più avanzata al mondo, collegata in tempo reale via cuffiette Bluetooth all'utente che sta fisicamente camminando davanti al monumento o punto d'interesse.

Luogo attuale: "${monumentName}" a "${city}".
Profilo vocale scelto: ${chosenPersona}
Interessi del viaggiatore: ${userInterests.join(', ')}.
Lingua richiesta: ${language === 'en' ? 'Inglese' : language === 'es' ? 'Spagnolo' : language === 'fr' ? 'Francese' : 'Italiano'}.

Genera una narrazione immersiva per auricolari:
1. Una narrazione parlata fluida ("spokenNarration") di circa 100-140 parole, scritta per essere ASCOLTATA in cuffia (usa tono diretto come: "Guarda verso l'arco...", "Respira l'aria di questo luogo...", "Nota quel particolare inciso nella pietra..."). Evita elenchi puntati o formule da guida cartacea.
2. 3 fatti storici o architettonici essenziali e sorprendenti.
3. Un "segreto nascosto" (un dettaglio da cercare con gli occhi subito sul posto).
4. Un consiglio pratico da insider locale (orario ideale, angolo fotografico o bar/bottega storica nei paraggi).
5. Un breve quiz a scelta multipla (trivia) con 3 opzioni per stimolare l'osservazione visiva del viaggiatore.
6. 3 domande di follow-up consigliate che il viaggiatore potrebbe pronunciare nelle cuffiette.`;

    const aiClient = getGeminiClient();
    if (aiClient) {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              subtitle: { type: Type.STRING },
              spokenNarration: { type: Type.STRING },
              historicalHighlights: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              secretDetails: { type: Type.STRING },
              insiderTip: { type: Type.STRING },
              trivia: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correctAnswerIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                },
                required: ['question', 'options', 'correctAnswerIndex', 'explanation'],
              },
              suggestedQuestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: [
              'title',
              'subtitle',
              'spokenNarration',
              'historicalHighlights',
              'secretDetails',
              'insiderTip',
              'suggestedQuestions',
            ],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    }
  } catch (error: any) {
    console.error('Error generating narration:', error);
  }
    const mon = req.body.monumentName || 'Monumento Storico';
    const c = req.body.city || 'Padova';
    const kn = MONUMENT_KNOWLEDGE_BASE.find(
      (m) =>
        m.name.toLowerCase().includes(mon.toLowerCase()) ||
        mon.toLowerCase().includes(m.name.toLowerCase()) ||
        m.aliases.some((a) => mon.toLowerCase().includes(a))
    );

    return res.json({
      title: mon,
      subtitle: `Meraviglia di ${c}`,
      spokenNarration: kn
        ? `${kn.name}. ${kn.summary} ${kn.authorAndCommission} Avvicinati con calma e lasciati guidare: ${kn.hiddenSecrets}`
        : `Ti trovi davanti a ${mon}. Fermati un momento e osserva l'armonia delle forme e i dettagli scolpiti nella pietra. Ogni elemento racchiude secoli di storia e la viva memoria della città.`,
      historicalHighlights: kn
        ? [kn.authorAndCommission, kn.historyAndDates, kn.curiosities]
        : [
            'Edificato durante uno dei periodi più floridi della storia locale.',
            'Capolavoro di ingegneria e maestria artigianale antica.',
            'Custode di aneddoti e trasformazioni che hanno attraversato le epoche.',
          ],
      secretDetails: kn ? kn.hiddenSecrets : 'Osserva l’angolo alla base della facciata: troverai le incisioni lasciate dagli antichi scalpellini.',
      insiderTip: kn ? kn.foodAndNearbyTips : 'La luce migliore per fotografarlo è nel tardo pomeriggio, quando il sole dora la pietra calda.',
      trivia: {
        question: `Qual è la caratteristica distintiva di ${mon}?`,
        options: ['La proporzione architettonica storica', 'Le decorazioni e rilievi d’epoca', 'I volumi monumentali'],
        correctAnswerIndex: 0,
        explanation: kn ? kn.summary : 'Un autentico capolavoro della tradizione architettonica italiana.',
      },
      suggestedQuestions: kn
        ? [
            `Chi commissionò ${kn.name} e perché?`,
            'Quali segreti o leggende nasconde questo luogo?',
            'Dove posso fare una pausa nei dintorni?',
          ]
        : [
            'Qual è la leggenda più famosa legata a questo posto?',
            'Chi fu il principale architetto dell’opera?',
            'Cosa si nasconde nei sotterranei?',
          ],
    });
});

// 2. Real-time Conversational Q&A (Earphones mic interaction)
app.post('/api/cicerone/ask', async (req, res) => {
  const {
    question,
    currentMonument = 'Cappella degli Scrovegni',
    city = 'Padova',
    voicePersona = 'amico',
    conversationHistory = [],
    language = 'it',
  } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  // 1. Find matching monument knowledge for grounding
  const monumentContext = MONUMENT_KNOWLEDGE_BASE.find(
    (m) =>
      m.name.toLowerCase().includes(currentMonument.toLowerCase()) ||
      currentMonument.toLowerCase().includes(m.name.toLowerCase()) ||
      m.aliases.some((a) => currentMonument.toLowerCase().includes(a))
  );

  const contextSnippet = monumentContext
    ? `DATI STORICI ACCERTATI SUL LUOGO "${monumentContext.name}" (${monumentContext.city}):
- Sintesi: ${monumentContext.summary}
- Autore e Committenza: ${monumentContext.authorAndCommission}
- Storia e Date: ${monumentContext.historyAndDates}
- Segreti e Dettagli Nascosti: ${monumentContext.hiddenSecrets}
- Interno e Opere: ${monumentContext.interiorAndArt}
- Cibo e Pause nei Dintorni: ${monumentContext.foodAndNearbyTips}
- Curiosità Storiche: ${monumentContext.curiosities}`
    : `L'utente si trova a ${city}, vicino a "${currentMonument}".`;

  const personaTone =
    voicePersona === 'professore'
      ? 'uno storico dell’arte appassionato e colto'
      : voicePersona === 'famiglia'
      ? 'una guida vivace per famiglie e ragazzi'
      : voicePersona === 'narratore'
      ? 'un cantastorie teatrale ed evocativo'
      : 'un amico del posto brillante ed accogliente';

  // 2. If Gemini API client is available, call Gemini with grounded context
  const aiClient = getGeminiClient();

  if (aiClient) {
    try {
      const prompt = `Sei Almagora, una guida turistica audio personale eccezionale che parla in tempo reale negli auricolari Bluetooth dell'utente.
L'utente sta camminando e si trova a "${city}" davanti a "${currentMonument}".
Il tuo profilo vocale è: ${personaTone}.

${contextSnippet}

DOMANDA DELL'UTENTE:
"${question}"

ISTRUZIONI ASSOLUTE:
1. Rispondi DIRETTAMENTE alla domanda posta dall'utente, fornendo dettagli concreti, autentici e precisi (nomi, date, opere, consigli o aneddoti).
2. Se l'utente ti fa un saluto o ti chiede chi sei, rispondi con calore e naturalezza presentandoti come Almagora, la sua guida audio personale.
3. Se l'utente chiede una curiosità, un segreto, orari o un consiglio pratico/gastronomico, dai la risposta esatta per questo luogo.
4. Tono parlato, limpido e fluido per le cuffie (circa 40-75 parole, 2-4 frasi chiare). Nessun elenco puntato o markdown pesante.
5. Lingua: ${language === 'en' ? 'Inglese' : language === 'es' ? 'Spagnolo' : language === 'fr' ? 'Francese' : 'Italiano'}.`;

      const geminiCall = aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const timeoutCall = new Promise<null>((resolve) => setTimeout(() => resolve(null), 10000));
      const response = await Promise.race([geminiCall, timeoutCall]);

      const geminiAnswer = response?.text?.trim();
      if (geminiAnswer) {
        return res.json({
          answer: geminiAnswer,
          timestamp: new Date().toISOString(),
          source: 'gemini-ai',
        });
      }
    } catch (error: any) {
      console.warn('Gemini API call warning in /api/cicerone/ask, using smart contextual knowledge engine:', error?.message);
    }
  }

  // 3. Intelligent, context-specific monument knowledge answer (no generic canned responses)
  const smartAnswer = generateSmartMonumentAnswer({
    question,
    currentMonument,
    city,
    voicePersona,
  });

  return res.json({
    answer: smartAnswer,
    timestamp: new Date().toISOString(),
  });
});

// 2b. Voice Audio Transcription Endpoint (Gemini Multimodal Audio Speech-to-Text)
app.post('/api/cicerone/transcribe', async (req, res) => {
  try {
    const { audioBase64, mimeType = 'audio/webm' } = req.body;
    if (!audioBase64) {
      return res.status(400).json({ error: 'audioBase64 is required', transcript: '' });
    }

    const aiClient = getGeminiClient();
    if (!aiClient) {
      return res.status(503).json({ error: 'AI transcription service unavailable', transcript: '' });
    }

    const cleanBase64 = audioBase64.replace(/^data:audio\/\w+;base64,/, '');

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          inlineData: {
            mimeType: mimeType.split(';')[0] || 'audio/webm',
            data: cleanBase64,
          },
        },
        'Trascrivi fedelmente la domanda o le parole pronunciate dall’utente in italiano. Restituisci ESCLUSIVAMENTE il testo trascritto, senza virgolette, senza preamboli, senza punteggiatura superflua.',
      ],
    });

    const transcript = response.text?.trim() || '';
    return res.json({ transcript });
  } catch (error: any) {
    console.error('Error transcribing audio:', error);
    return res.status(500).json({ error: 'Errore trascrizione vocale', transcript: '' });
  }
});

// 3. Dynamic Tour Generation Endpoint (AI custom itineraries)
app.post('/api/cicerone/generate-tour', async (req, res) => {
  const {
    city = 'Padova',
    theme = 'Misteri e Luoghi Nascosti',
    durationMinutes = 75,
    userInterests = ['arte', 'leggende'],
    startCoordinates = { lat: 45.4072, lng: 11.8756 },
  } = req.body;

  // 1. Try Gemini AI if API key is present
  const aiClient = getGeminiClient();
  if (aiClient) {
    try {
      const prompt = `Crea un itinerario a piedi dettagliato per un tour guidato a "${city}".
Tema del tour: "${theme}".
Durata stimata: circa ${durationMinutes} minuti.
Interessi: ${userInterests.join(', ')}.
Coordinate di partenza approssimative: lat ${startCoordinates.lat}, lng ${startCoordinates.lng}.

Genera 4 o 5 tappe sequenziali a piedi con coordinate geografiche reali e precise nella città specificata (${city}).
Ogni tappa deve avere:
- id unico (stringa kebab-case)
- nome del monumento o scorcio
- coordinate reali (latitudine, longitudine come numeri decimali precisi)
- breve teaser descrittivo (30 parole)
- raggio di attivazione GPS consigliato (es. 60-80 metri)
- tempo stimato di sosta in minuti`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              tourId: { type: Type.STRING },
              title: { type: Type.STRING },
              tagline: { type: Type.STRING },
              city: { type: Type.STRING },
              estimatedKm: { type: Type.NUMBER },
              estimatedMinutes: { type: Type.INTEGER },
              difficulty: { type: Type.STRING },
              waypoints: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    lat: { type: Type.NUMBER },
                    lng: { type: Type.NUMBER },
                    teaser: { type: Type.STRING },
                    triggerRadiusMeters: { type: Type.INTEGER },
                    stopoverMinutes: { type: Type.INTEGER },
                  },
                  required: ['id', 'name', 'lat', 'lng', 'teaser', 'triggerRadiusMeters'],
                },
              },
            },
            required: ['title', 'tagline', 'city', 'estimatedKm', 'estimatedMinutes', 'waypoints'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      if (parsed.waypoints && parsed.waypoints.length > 0) {
        return res.json(parsed);
      }
    } catch (error: any) {
      console.warn('Gemini generate-tour error, falling back to curated city generator:', error.message);
    }
  }

  // 2. Intelligent Curated City Engine fallback
  const normalizedCity = city.toLowerCase().trim();

  let fallbackWaypoints: any[] = [];
  let centerLat = startCoordinates.lat || 45.4072;
  let centerLng = startCoordinates.lng || 11.8756;
  let tourTitle = `Itinerario di ${city}: ${theme}`;
  let tourTagline = `Scorci, architettura e segreti storici lungo il percorso.`;

  if (normalizedCity.includes('padov')) {
    centerLat = 45.4072;
    centerLng = 11.8756;
    tourTitle = `Padova: ${theme}`;
    tourTagline = `Dalla Cappella degli Scrovegni al Salone della Ragione e Prato della Valle.`;
    fallbackWaypoints = [
      {
        id: `padova-scrovegni-${Date.now()}`,
        name: 'Cappella degli Scrovegni',
        lat: 45.4118,
        lng: 11.8796,
        teaser: 'Il capolavoro di Giotto: la volta celeste in lapislazzuli e la prospettiva che rivoluzionò l’arte occidentale.',
        triggerRadiusMeters: 70,
        stopoverMinutes: 20,
        category: 'church',
      },
      {
        id: `padova-pedrocchi-${Date.now()}`,
        name: 'Caffè Pedrocchi',
        lat: 45.4076,
        lng: 11.8778,
        teaser: 'Il celebre caffè senza porte dell’800 e la tradizione del caffè alla menta servito senza zucchero.',
        triggerRadiusMeters: 60,
        stopoverMinutes: 12,
        category: 'secret',
      },
      {
        id: `padova-ragione-${Date.now()}`,
        name: 'Palazzo della Ragione & Piazza delle Erbe',
        lat: 45.4072,
        lng: 11.8756,
        teaser: 'Il Salone pensile con la gigantesca carena di nave lignea rovesciata e il ciclo astrologico medievale.',
        triggerRadiusMeters: 65,
        stopoverMinutes: 15,
        category: 'monument',
      },
      {
        id: `padova-santo-${Date.now()}`,
        name: 'Basilica di Sant’Antonio (Il Santo)',
        lat: 45.4014,
        lng: 11.8798,
        teaser: 'Le cupole bizantine, il monumento equestre di Donatello e secoli di devozione e pellegrinaggio.',
        triggerRadiusMeters: 75,
        stopoverMinutes: 18,
        category: 'church',
      },
      {
        id: `padova-prato-${Date.now()}`,
        name: 'Prato della Valle',
        lat: 45.3983,
        lng: 11.8765,
        teaser: 'L’Isola Memmia con le 78 statue di scienziati e letterati circondata dal doppio anello d’acqua.',
        triggerRadiusMeters: 80,
        stopoverMinutes: 15,
        category: 'square',
      },
    ];
  } else if (normalizedCity.includes('veron')) {
    centerLat = 45.4388;
    centerLng = 10.9944;
    tourTitle = `Verona: ${theme}`;
    tourTagline = `Dall’anfiteatro romano dell’Arena ai vicoli medievali di Giulietta.`;
    fallbackWaypoints = [
      {
        id: `verona-arena-${Date.now()}`,
        name: 'Arena di Verona',
        lat: 45.4388,
        lng: 10.9944,
        teaser: 'L’anfiteatro romano meglio conservato al mondo: acustica leggendaria e spettacoli senza tempo.',
        triggerRadiusMeters: 75,
        stopoverMinutes: 20,
        category: 'monument',
      },
      {
        id: `verona-giulietta-${Date.now()}`,
        name: 'Casa di Giulietta & Balcone',
        lat: 45.4418,
        lng: 10.9986,
        teaser: 'Il mito shakespeariano tra lettere d’amore, stemmi scaligeri e la statua bronzea di Giulietta.',
        triggerRadiusMeters: 60,
        stopoverMinutes: 12,
        category: 'secret',
      },
      {
        id: `verona-erbe-${Date.now()}`,
        name: 'Piazza delle Erbe & Torre dei Lamberti',
        lat: 45.4429,
        lng: 10.9972,
        teaser: 'L’antico foro romano trasformato nel salotto barocco con la fontana di Madonna Verona.',
        triggerRadiusMeters: 65,
        stopoverMinutes: 15,
        category: 'square',
      },
      {
        id: `verona-castelvecchio-${Date.now()}`,
        name: 'Ponte Scaligero di Castelvecchio',
        lat: 45.4397,
        lng: 10.9877,
        teaser: 'Il ponte fortificato in mattoni rossi che attraversa l’Adige con merli a coda di rondine.',
        triggerRadiusMeters: 70,
        stopoverMinutes: 15,
        category: 'monument',
      },
    ];
  } else if (normalizedCity.includes('bologn')) {
    centerLat = 44.4939;
    centerLng = 11.3432;
    tourTitle = `Bologna: ${theme}`;
    tourTagline = `Tra le due torri, i portici patrimonio UNESCO e le botteghe storiche.`;
    fallbackWaypoints = [
      {
        id: `bologna-maggiore-${Date.now()}`,
        name: 'Piazza Maggiore & Fontana del Nettuno',
        lat: 44.4939,
        lng: 11.3432,
        teaser: 'Il cuore pulsante medievale dominato dal Nettuno del Giambologna e dalla Basilica di San Petronio.',
        triggerRadiusMeters: 75,
        stopoverMinutes: 20,
        category: 'square',
      },
      {
        id: `bologna-torri-${Date.now()}`,
        name: 'Due Torri (Asinelli & Garisenda)',
        lat: 44.4944,
        lng: 11.3468,
        teaser: 'I giganti pendenti medievali simboli incontrastati della skyline felsinea.',
        triggerRadiusMeters: 65,
        stopoverMinutes: 15,
        category: 'monument',
      },
      {
        id: `bologna-stefano-${Date.now()}`,
        name: 'Piazza & Complesso delle Sette Chiese (Santo Stefano)',
        lat: 44.4918,
        lng: 11.3486,
        teaser: 'Un dedalo mistico di cappelle, cripte e chiostri romanici che riproduce la Gerusalemme celeste.',
        triggerRadiusMeters: 70,
        stopoverMinutes: 18,
        category: 'church',
      },
    ];
  } else {
    // Dynamic procedural waypoints around the requested coordinates
    const offsets = [
      { dLat: 0.0, dLng: 0.0, name: `Porta Antica & Corso Principale di ${city}`, category: 'monument' },
      { dLat: 0.0035, dLng: 0.0028, name: `Piazza della Cattedrale & Campanile Storico`, category: 'church' },
      { dLat: 0.0048, dLng: -0.0019, name: `Palazzo Civico & Botteghe Artigiane`, category: 'secret' },
      { dLat: 0.0022, dLng: -0.0042, name: `Belvedere Panoramico & Giardino Pensile`, category: 'viewpoint' },
    ];

    fallbackWaypoints = offsets.map((o, idx) => ({
      id: `tour-${normalizedCity.replace(/[^a-z0-9]/g, '-')}-${idx + 1}`,
      name: o.name,
      lat: Number((centerLat + o.dLat).toFixed(5)),
      lng: Number((centerLng + o.dLng).toFixed(5)),
      teaser: `Tappa ${idx + 1}: esplora le tracce storiche e le atmosfere caratteristiche di ${city} legate al tema ${theme}.`,
      triggerRadiusMeters: 65,
      stopoverMinutes: 15,
      category: o.category,
    }));
  }

  return res.json({
    tourId: `tour-ai-${Date.now()}`,
    title: tourTitle,
    tagline: tourTagline,
    city,
    estimatedKm: 2.7,
    estimatedMinutes: durationMinutes,
    difficulty: 'Facile',
    waypoints: fallbackWaypoints,
  });
});

// 4. Gemini Speech Generation (TTS)
app.post('/api/cicerone/tts', async (req, res) => {
  try {
    const { text, voiceName = 'Kore' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    const aiClient = getGeminiClient();
    if (!aiClient) {
      return res.json({ audioBase64: null, useFallback: true });
    }

    // Call gemini-3.8-flash-lite-tts for ultra realistic vocal performance
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: text.slice(0, 600), // optimal length for audio clip
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName || 'Kore' },
          },
        },
      },
    });

    const base64Audio =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (base64Audio) {
      return res.json({
        audioBase64: base64Audio,
        mimeType: 'audio/wav',
        useFallback: false,
      });
    }

    return res.json({ audioBase64: null, useFallback: true });
  } catch (error: any) {
    console.warn('Gemini TTS unavailable, client will use Web Speech synthesis fallback:', error.message);
    return res.json({ audioBase64: null, useFallback: true });
  }
});

// 5. Cloud Sync endpoints for multi-device profile restoration
app.get('/api/sync/:syncCode', (req, res) => {
  const code = (req.params.syncCode || '').toUpperCase().trim();
  const data = syncStore.get(code);
  if (!data) {
    return res.status(404).json({ error: 'Codice di sincronizzazione non trovato o scaduto.' });
  }
  return res.json({ success: true, profile: data });
});

app.post('/api/sync/:syncCode', (req, res) => {
  const code = (req.params.syncCode || '').toUpperCase().trim();
  const profileData = req.body;
  if (!code || !profileData) {
    return res.status(400).json({ error: 'Parametri non validi' });
  }
  const updatedData: SyncProfileData = {
    ...profileData,
    lastUpdated: new Date().toISOString(),
  };
  syncStore.set(code, updatedData);
  return res.json({ success: true, syncCode: code, lastUpdated: updatedData.lastUpdated });
});

app.post('/api/sync/create-code', (req, res) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomCode = 'CIC-';
  for (let i = 0; i < 6; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const profileData = req.body || {};
  syncStore.set(randomCode, {
    ...profileData,
    userId: profileData.userId || `user-${Date.now()}`,
    lastUpdated: new Date().toISOString(),
  });
  return res.json({ syncCode: randomCode });
});

// Serve Vite in development or static assets in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cicerone AI Guide Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
