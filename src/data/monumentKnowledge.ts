/**
 * MonumentKnowledge - Deep historical and cultural knowledge base
 * Provides precise, localized, authentic answers about specific Italian monuments and landmarks.
 * Used both by server prompts for Gemini grounding and as an intelligent conversational engine.
 */

export interface PracticalInfo {
  tickets: string;
  hours: string;
  dogs: string;
  accessibility: string;
  transport: string;
  restrooms: string;
}

export interface QAPair {
  keywords: string[];
  answer: string;
}

export interface MonumentInfo {
  name: string;
  aliases: string[];
  city: string;
  summary: string;
  authorAndCommission: string;
  historyAndDates: string;
  hiddenSecrets: string;
  interiorAndArt: string;
  foodAndNearbyTips: string;
  curiosities: string;
  practicalInfo: PracticalInfo;
  qaPairs: QAPair[];
}

export const MONUMENT_KNOWLEDGE_BASE: MonumentInfo[] = [
  // --- PADOVA ---
  {
    name: 'Cappella degli Scrovegni',
    aliases: ['scrovegni', 'giotto', 'affreschi scrovegni', 'cappella', 'giudizio universale', 'bacio di giuda'],
    city: 'Padova',
    summary:
      'La Cappella degli Scrovegni è uno dei vertici assoluti della storia dell’arte occidentale: tra il 1303 e il 1305 Giotto rivoluzionò per sempre la pittura introducendo la prospettiva empirica, lo spazio tridimensionale abitabile e l’espressività drammatica dei volti umani, distaccandosi dai canoni bizantini medievali.',
    authorAndCommission:
      'La cappella fu affrescata interamente da Giotto su commissione di Enrico Scrovegni, ricchissimo banchiere padovano. Enrico la fece erigere e decorare per salvare l’anima della sua famiglia ed espiare le colpe di usura del padre Reginaldo Scrovegni, figura talmente nota all’epoca da essere collocata da Dante Alighieri nel XVII canto dell’Inferno.',
    historyAndDates:
      'I lavori iniziarono nel 1302 e la cappella fu solennemente consacrata il 25 marzo 1305 con il titolo di Santa Maria della Carità. Dal 2021 fa parte dei cicli di affreschi del Trecento padovano dichiarati Patrimonio Mondiale dell’Umanità UNESCO sotto il nome di "Padova Urbs Picta".',
    hiddenSecrets:
      'Osserva attentamente la controfacciata con il Giudizio Universale: in basso a sinistra, tra i beati, puoi scorgere Enrico Scrovegni in ginocchio che porge il modellino tridimensionale della cappella a tre figure angeliche per meritare il paradiso. Un altro segreto: il celebre blu della volta non è stato steso ad affresco ma a secco, polverizzando preziosissimo lapislazzuli proveniente dall’Afghanistan, per conferire una luminosità celestiale unica.',
    interiorAndArt:
      'L’interno è un racconto continuo in 39 riquadri disposti su quattro registri: le Storie di Gioacchino e Anna, la Vita di Maria, la Vita e Passione di Cristo (con capolavori come il Bacio di Giuda e il Compianto sul Cristo Morto) e, nello zoccolo inferiore a monocromo, le allegorie contrapposte dei 7 Vizi e delle 7 Virtù che guidano l’uomo verso la salvezza o la dannazione.',
    foodAndNearbyTips:
      'Uscendo dalla cappella, ti consiglio una breve passeggiata di 7 minuti verso Piazza dei Signori o Piazza della Frutta: puoi gustare il celebre caffè alla menta allo storico Caffè Pedrocchi, oppure provare un panino gourmet tipico Da Zita in via Gorizia.',
    curiosities:
      'La cappella sorge all’interno del tracciato dell’antico anfiteatro romano di Padova (l’Arena). Enrico Scrovegni acquistò l’intera area archeologica per costruire il sontuoso palazzo di famiglia, andato distrutto nell’Ottocento, salvando fortunatamente la cappella.',
    practicalInfo: {
      tickets:
        'La prenotazione per la Cappella degli Scrovegni è obbligatoria e va effettuata con anticipo online o telefonicamente. Il biglietto include anche l’accesso ai Musei Civici degli Eremitani e a Palazzo Zuckermann.',
      hours:
        'È aperta tutti i giorni dell’anno dalle 09:00 alle 19:00. Nei periodi di alta stagione sono previste aperture serali straordinarie fino alle 22:00 con visita suggestiva notturna.',
      dogs:
        'All’interno della cappella e dell’area museale i cani non sono ammessi, ad eccezione dei cani guida per persone non vedenti o animali di assistenza certificati. Nei circostanti Giardini dell’Arena i cani possono invece passeggiare al guinzaglio.',
      accessibility:
        'La cappella e il Corpo Tecnologico Attrezzato (CTA) sono accessibili alle persone in sedia a rotelle tramite rampe e percorsi dedicati senza barriere architettoniche.',
      transport:
        'Dalla stazione ferroviaria di Padova puoi raggiungerla a piedi in circa 10 minuti, oppure prendendo il tram Sir1 scendendo alla fermata "Eremitani". Per chi arriva in auto, i parcheggi più vicini sono Park Padova Centro o Garage Tommaseo.',
      restrooms:
        'I servizi igienici e guardaroba sono disponibili presso la biglietteria dei Musei Civici degli Eremitani, proprio davanti all’ingresso del percorso di visita.',
    },
    qaPairs: [
      {
        keywords: ['blu', 'lapislazzuli', 'azzurro', 'cielo', 'volta', 'soffitto'],
        answer:
          'Il blu celestiale della volta degli Scrovegni è unico al mondo: Giotto non usò pigmenti comuni ma polvere purissima di lapislazzuli importata dalle miniere dell’Afghanistan, stesa a secco con leganti organici. Questo donava una brillantezza straordinaria e quasi tridimensionale, anche se ha richiesto nei secoli speciali restauri protettivi.',
      },
      {
        keywords: ['enrico', 'reginaldo', 'dante', 'usura', 'peccato', 'inferno'],
        answer:
          'Enrico Scrovegni fece costruire la cappella proprio per riscattare l’onore familiare. Suo padre Reginaldo era infatti il più famigerato usuraio di Padova, tanto che Dante Alighieri lo mise nell’Inferno della Divina Commedia (Canto XVII), riconoscibile per lo stemma con la scrofa azzurra sul borsello. Enrico sperava così di redimere l’anima del padre e la propria.',
      },
      {
        keywords: ['giudizio', 'controfacciata', 'inferno', 'diavolo', 'lucifero'],
        answer:
          'Sulla controfacciata puoi ammirare il grandioso Giudizio Universale: al centro troneggia Cristo Giudice in mandorla di luce. A sinistra i beati risorgono e tra loro vedi Enrico Scrovegni che offre il modellino della cappella. A destra invece si spalanca l’Inferno con Lucifero mostruoso e le torture inflitte ai dannati.',
      },
      {
        keywords: ['bacio di giuda', 'giuda', 'arresto'],
        answer:
          'Il "Bacio di Giuda" nella fascia centrale è un capolavoro di tensione psicologica: Giotto dipinge il grande mantello giallo di Giuda che avvolge Cristo mentre i loro sguardi si incrociano a pochi centimetri di distanza, circondati da torce, lance e folla in movimento.',
      },
      {
        keywords: ['compianto', 'cristo morto', 'dolore', 'angeli'],
        answer:
          'Nel "Compianto sul Cristo Morto" Giotto rivoluziona la raffigurazione del lutto: vedi Maria che scruta disperata il volto del figlio, figure di spalle che danno senso di spazio reale e angeli in cielo che si strappano le vesti e urlano di dolore, un pathos mai visto prima nel Medioevo.',
      },
      {
        keywords: ['tempo', 'durata', 'quanto dura', 'camera', 'clima', 'cta'],
        answer:
          'La visita dura in totale circa 30 minuti: i primi 15 minuti si trascorrono nel Corpo Tecnologico Attrezzato (CTA), una camera di compensazione climatizzata che stabilizza temperatura e umidità per proteggere gli affreschi, seguiti da 15 minuti di contemplazione diretta all’interno della cappella.',
      },
    ],
  },
  {
    name: 'Palazzo della Ragione',
    aliases: ['ragione', 'salone', 'piazza delle erbe', 'piazza della frutta', 'pietra del vituperio', 'cavallo di legno', 'carena'],
    city: 'Padova',
    summary:
      'Il Palazzo della Ragione, affettuosamente chiamato dai padovani "Il Salone", è l’antico palazzo di giustizia e mercato medievale di Padova. Vanta una delle sale pensili più grandi al mondo (lunga 81 metri, larga 27 e alta 24) completamente priva di colonne o pilastri intermedi.',
    authorAndCommission:
      'Edificato a partire dal 1218, fu trasformato e sopraelevato nel 1306 dall’ingegnoso frate architetto Fra Giovanni degli Eremitani, che ideò la spettacolare copertura lignea ispirata alla carena di una gigantesca nave rovesciata, sfruttando la sapienza dei maestri d’ascia navali.',
    historyAndDates:
      'Fu il cuore pulsante della vita civica, giudiziaria e commerciale della città durante il Libero Comune e sotto la Repubblica di Venezia. Al piano inferiore ospita da oltre 800 anni il mercato coperto più antico d’Europa, ancora vivissimo con decine di botteghe tradizionali.',
    hiddenSecrets:
      'All’interno del Salone trovi la celebre "Pietra del Vituperio": qui nel Medioevo i debitori insolventi dovevano subire una pubblica umiliazione, sedendosi per tre volte in mutande sulla pietra fredda pronunciando "Cedo bonis" (rinuncio ai miei beni) prima di essere banditi dalla città!',
    interiorAndArt:
      'Le pareti interne del Salone sono rivestite da uno straordinario ciclo astrologico e zodiacale di oltre 333 riquadri affrescati quattrocenteschi (ispirati alle teorie del filosofo Pietro d’Abano), che collegano le costellazioni, i mesi dell’anno, i mestieri e i tratti caratteriali degli esseri umani. Al centro troneggia inoltre un maestoso cavallo ligneo monumentale del 1466.',
    foodAndNearbyTips:
      'Scendendo "Sotto il Salone", fermati per un panino caldo con la porchetta o con i folpetti tipici al Bar dei Osei in Piazza della Frutta, oppure fai aperitivo all’Enoteca La Folperia con un calice di Serprino dei Colli Euganei.',
    curiosities:
      'Il Palazzo divide due delle piazze più famose di Padova: Piazza delle Erbe (dove storicamente si vendevano le verdure fresche) e Piazza della Frutta (dedicata a frutta, stoffe e granaglie). Ancora oggi ogni mattina le piazze si riempiono di colorati banchi di mercato.',
    practicalInfo: {
      tickets:
        'L’ingresso al Salone superiore richiede un biglietto (ridotto per studenti e possessori di Padova Card). Il mercato coperto al pianterreno è invece ad accesso completamente libero.',
      hours:
        'Il Salone è aperto dal martedì alla domenica dalle 09:00 alle 19:00 (chiuso il lunedì non festivo). Il mercato al piano terra è aperto la mattina dal lunedì al sabato e il venerdì e sabato anche il pomeriggio.',
      dogs:
        'Nel Salone superiore monumentale i cani non possono entrare (tranne cani guida). Nel mercato coperto e nelle piazze aperte esterne i cani sono benvenuti al guinzaglio.',
      accessibility:
        'È presente un ascensore panoramico per raggiungere il Salone pensile superiore per le persone a mobilità ridotta.',
      transport:
        'Si trova nel cuore pedonale di Padova: fermata del tram Sir1 "Tito Livio" o "Ponti Romani", a circa 3 minuti a piedi.',
      restrooms: 'Sono presenti servizi igienici all’interno del Palazzo della Ragione per i visitatori del Salone.',
    },
    qaPairs: [
      {
        keywords: ['vituperio', 'pietra', 'debito', 'debitori', 'falliti', 'cedo bonis'],
        answer:
          'La Pietra del Vituperio, in porfido nero, fu istituita nel 1231 su richiesta di Sant’Antonio per evitare che i debitori insolventi venissero incarcerati a vita. In cambio dovevano spogliarsi in camicia e mutande e battere il sedere per tre volte sulla pietra dicendo a gran voce "Cedo bonis", perdendo i beni ma salvando la libertà.',
      },
      {
        keywords: ['carena', 'nave', 'tetto', 'soffitto', 'architettura', 'legno', 'copertura'],
        answer:
          'Il tetto del Salone è un prodigio d’ingegneria del 1306: Fra Giovanni degli Eremitani si ispirò ai cantieri navali veneziani creando una monumentale carena di nave capovolta in travature di larice, capace di coprire 81 metri di lunghezza senza alcuna colonna portante al centro!',
      },
      {
        keywords: ['cavallo', 'legno', 'statua cavallo'],
        answer:
          'Il gigantesco cavallo di legno che vedi all’interno fu realizzato nel 1466 per una spettacolare giostra cavalleresca voluta dal nobile padovano Annibale Capodilista. È alto quasi 6 metri ed è una fedele scultura rinascimentale cava all’interno.',
      },
      {
        keywords: ['astrologia', 'zodiaco', 'affreschi', 'pietro d’abano'],
        answer:
          'Il ciclo astrologico del Salone conta oltre 330 scene affrescate: ogni mese è presieduto dal proprio segno zodiacale, dal pianeta dominante e dalle attività umane corrispondenti. Fu concepito dal medico e astrologo Pietro d’Abano per simboleggiare l’armonia cosmica e la giustizia terrena.',
      },
      {
        keywords: ['mercato', 'sotto il salone', 'botteghe', 'comprare'],
        answer:
          'Sotto il Salone trovi due gallerie parallele con oltre 50 botteghe storiche: formaggerie con Asiago e Monte Veronese, macellerie di carni equine tradizionali, banchi di pesce fresco della laguna e forni con ciabatta e schiacciate calde.',
      },
    ],
  },
  {
    name: 'Caffè Pedrocchi',
    aliases: ['pedrocchi', 'caffe senza porte', 'sala verde', 'sala bianca', 'sala rossa', 'caffè alla menta', 'jappelli'],
    city: 'Padova',
    summary:
      'Il Caffè Pedrocchi è uno dei caffè letterari e storici più celebri d’Europa, inaugurato nel 1831 dall’architetto Giuseppe Jappelli. È passato alla storia con il titolo di "Caffè senza porte" e ha svolto un ruolo chiave durante il Risorgimento italiano.',
    authorAndCommission:
      'Fu commissionato da Antonio Pedrocchi, erede di una dinastia di caffettieri, che affidò il progetto al geniale architetto veneziano Giuseppe Jappelli. L’edificio unisce facciate neoclassiche esterne con interni scenografici ed eclettici.',
    historyAndDates:
      'Aperto nel 1831, divenne il cuore pulsante del Risorgimento: l’8 febbraio 1848 il ferimento di uno studente universitario da parte di un soldato austriaco nella Sala Bianca accese la scintilla dell’insurrezione patriottica di Padova. Il piano superiore ospita oggi il Museo del Risorgimento.',
    hiddenSecrets:
      'Entrando nella Sala Bianca, osserva la parete vicino alla finestra: troverai incastonato il foro originale del proiettile sparato dagli austriaci l’8 febbraio 1848, protetto da una targhetta commemorativa in ottone. Inoltre, al piano nobile ci sono sale decorate in stili sorprendenti: egizio, etrusco, greco, moresco e rinascimentale.',
    interiorAndArt:
      'Il piano terra è suddiviso nelle tre celeberrime sale che riprendono i colori del tricolore italiano: la Sala Bianca (nata per la lettura di giornali e ritrovo intellettuale), la Sala Rossa (con il maestoso bancone centrale in marmo) e la Sala Verde, tradizionalmente aperta a studenti e studiosi anche senza obbligo di consumazione (da qui nacque il celebre detto popolare "essere al verde").',
    foodAndNearbyTips:
      'L’esperienza imperdibile è ordinare al banco il celebre "Caffè Pedrocchi": una base di espresso 100% arabica bollente coperto da una vellutata crema fredda di panna e menta verde, con una spolverata di cacao amaro. Va gustato rigorosamente SENZA mescolare e SENZA zucchero, per assaporare il contrasto caldo-freddo.',
    curiosities:
      'Fino al 1916 il Pedrocchi non chiudeva mai i suoi battenti: restava aperto ininterrottamente 24 ore su 24, giorno e notte, offrendo riparo e accoglienza a professori, viaggiatori notturni e poeti come Stendhal, Lord Byron e Théophile Gautier.',
    practicalInfo: {
      tickets:
        'L’accesso al piano terra, al bancone e alle sale storiche per consumare o visitare è completamente libero e gratuito. Il Museo del Risorgimento al piano nobile prevede un piccolo biglietto d’ingresso.',
      hours:
        'Il caffè è aperto tutti i giorni dalle 08:00 alle 24:00 (venerdì e sabato fino all’01:00 di notte).',
      dogs:
        'I cani sono benvenuti sia ai tavoli all’aperto lungo il loggiato sia all’interno delle sale storiche se educati e tenuti al guinzaglio.',
      accessibility:
        'L’ingresso dal loggiato esterno è privo di gradini ed è pienamente accessibile in sedia a rotelle.',
      transport:
        'Situato in via VIII Febbraio, proprio di fronte a Palazzo Bo. Fermata tram Sir1 "Cavour" o "Ponti Romani", a circa 1 minuto a piedi.',
      restrooms:
        'Servizi igienici moderni e puliti disponibili al piano terra per i clienti del locale.',
    },
    qaPairs: [
      {
        keywords: ['menta', 'caffè pedrocchi', 'speciale', 'zucchero', 'mescolare', 'ricetta', 'bere'],
        answer:
          'Il Caffè Pedrocchi alla menta è una vera opera d’arte: espresso arabica, crema di latte e menta vellutata fredda e cacao amaro. La regola fondamentale del barista è non mescolarlo mai con il cucchiaino e non aggiungere zucchero: bevendolo a sorsi dal bordo assapori il perfetto contrasto tra il calore del caffè e la freschezza aromatica della menta.',
      },
      {
        keywords: ['senza porte', 'perché senza porte', '24 ore', 'notte'],
        answer:
          'Era chiamato "il Caffè senza porte" perché dalla sua apertura nel 1831 fino alla Prima Guerra Mondiale nel 1916 le porte non venivano mai chiuse, giorno e notte, 365 giorni l’anno. Chiunque poteva entrare a qualsiasi ora della notte per scaldarsi, leggere i giornali o conversare.',
      },
      {
        keywords: ['essere al verde', 'sala verde', 'studenti'],
        answer:
          'L’espressione comune "essere al verde" è strettamente legata alla Sala Verde del Pedrocchi: Antonio Pedrocchi decise che in quella sala chiunque, soprattutto gli studenti universitari squattrinati, potesse sedersi per ore a studiare o leggere senza l’obbligo di ordinare nulla. Chi non aveva denaro si accomodava quindi nella sala verde!',
      },
      {
        keywords: ['1848', 'proiettile', 'sparo', 'austriaci', 'risorgimento', 'sala bianca'],
        answer:
          'L’8 febbraio 1848 i soldati austriaci spararono dentro la Sala Bianca ferendo uno studente universitario. Quel colpo provocò l’immediata insurrezione di studenti e cittadini padovani, anticipando i moti del Quarantotto in tutta Italia. Il foro del proiettile è ancora visibile nel muro, circondato da una cornice di bronzo.',
      },
      {
        keywords: ['piano nobile', 'sale', 'egizia', 'moresca'],
        answer:
          'Il piano nobile è un viaggio intorno al mondo ideato da Jappelli: trovi la Sala Egizia con sfingi e geroglifici, la Sala Moresca arabeggiante, la Sala Rinascimentale e la sontuosa Sala Rossini per concerti e balli dell’alta società.',
      },
    ],
  },
  {
    name: 'Basilica di Sant’Antonio (Il Santo)',
    aliases: ['santo', 'basilica del santo', 'sant’antonio', 'sant antonio', 'arca del santo', 'reliquie', 'donatello', 'gattamelata'],
    city: 'Padova',
    summary:
      'La Basilica Pontificia di Sant’Antonio di Padova, universalmente nota come "Il Santo", è uno dei santuari più celebri e visitati della cristianità. Unisce straordinariamente lo stile romanico-gotico con 8 cupole orientaleggianti e due campanili slanciati che ricordano i minareti bizantini.',
    authorAndCommission:
      'La costruzione iniziò nel 1232, a soli undici mesi dalla morte e canonizzazione di frate Antonio (al secolo Fernando di Buglione, nato a Lisbona nel 1195 e morto a Padova nel 1231), per dare degna sepoltura alle sue spoglie e accogliere i pellegrini da tutta Europa.',
    historyAndDates:
      'Completata agli inizi del Trecento, custodisce opere d’arte di inestimabile valore realizzate da Donatello, Altichiero da Zevio e Giusto de’ Menabuoi. Sul piazzale esterno sorge il celeberrimo monumento equestre bronzeo al condottiero Gattamelata, fuso da Donatello nel 1453.',
    hiddenSecrets:
      'Nella scenografica Cappella delle Reliquie (o del Tesoro) è visibile la celebre Lingua Incorrotta di Sant’Antonio: quando nel 1263 San Bonaventura fece riesumare il corpo a 32 anni dalla morte, trovò tutto il corpo ridotto in polvere tranne la lingua, intatta e rosea, a testimonianza della sua prodigiosa predicazione.',
    interiorAndArt:
      'All’interno, tappa obbligata è l’Arca del Santo nella navata sinistra: i pellegrini sfilano appoggiando la mano destra sulla tomba di marmo verde per chiedere una grazia o pregare in silenzio. Il presbiterio custodisce il maestoso altare maggiore di Donatello con sette statue bronzee a tutto tondo e i rilievi dei Miracoli di Sant’Antonio.',
    foodAndNearbyTips:
      'Davanti al sagrato della Basilica puoi acquistare e assaggiare il tipico "Dolce del Santo", un dolce da forno a base di pasta sfoglia con ripieno soffice di mandorle, confettura di albicocche e pan di spagna. Ottimi caffè nei chiostri e lungo via del Santo.',
    curiosities:
      'A Padova la Basilica fa parte dei celeberrimi "tre senza": il Santo senza nome (perché per i padovani esiste solo "Il Santo"), il Prato senz’erba (Prato della Valle) e il Caffè senza porte (Pedrocchi).',
    practicalInfo: {
      tickets:
        'L’ingresso alla Basilica, all’Arca del Santo e ai chiostri storici è completamente libero e gratuito. Per visitare il Museo Antoniano è previsto un modesto biglietto.',
      hours:
        'Aperta tutti i giorni con orario continuato: dalle 06:20 alle 19:45 in estate (fino alle 19:00 nel periodo invernale).',
      dogs:
        'All’interno della Basilica non è consentito l’ingresso ai cani (tranne cani guida). Nei suggestivi chiostri all’aperto (Chiostro della Magnolia, Chiostro del Generale) è consentito il passaggio con cani al guinzaglio.',
      accessibility:
        'Pienamente accessibile: il piazzale e l’accesso laterale hanno rampe dedicate, e il transito attorno all’Arca e alle reliquie è pianeggiante e privo di gradini.',
      transport:
        'Fermata tram Sir1 "Santo", a soli 150 metri dalla piazza. A piedi da Prato della Valle dista circa 4 minuti.',
      restrooms:
        'I servizi igienici sono situati nel Chiostro della Magnolia, ben segnalati e accessibili a tutti.',
    },
    qaPairs: [
      {
        keywords: ['lingua', 'reliquie', 'tesoro', 'mento', 'bonaventura'],
        answer:
          'La Lingua di Sant’Antonio è conservata in un prezioso reliquiario dorato gotico nella Cappella del Tesoro. Fu ritrovata intatta e flessibile nel 1263 da San Bonaventura durante la traslazione del corpo: la Chiesa la considerò il segno divino della sua santità e dell’eloquenza con cui predicava il Vangelo.',
      },
      {
        keywords: ['arca', 'tomba', 'mano', 'toccare', 'marmo'],
        answer:
          'L’Arca del Santo è il cuore devozionale della basilica: la tradizione vuole che i fedeli si avvicinino alla grande lastra di marmo verde posta dietro l’altare e vi posino il palmo della mano per qualche istante, affidando al Santo le proprie preghiere e intenzioni di guarigione.',
      },
      {
        keywords: ['donatello', 'altare', 'crocifisso', 'bronzi'],
        answer:
          'Donatello lavorò a Padova per oltre un decennio (1443-1453), creando per la Basilica il sublime Crocifisso bronzeo e l’altare maggiore con la Madonna col Bambino e i rilievi a stiacciato dei Miracoli del Santo (la mula inginocchiata, il cuore dell’avaro, il neonato parlante).',
      },
      {
        keywords: ['gattamelata', 'statua equestre', 'erasmo da narni', 'piazza'],
        answer:
          'Sul piazzale della Basilica troneggia il monumento a Erasmo da Narni detto "il Gattamelata", celebre capitano di ventura della Repubblica di Venezia. Fuso da Donatello nel 1453, è la prima statua equestre in bronzo di grandi dimensioni realizzata in Europa dai tempi dell’Impero Romano!',
      },
      {
        keywords: ['senza nome', 'tre senza'],
        answer:
          'A Padova la basilica è "il Santo senza nome" perché per ogni padovano non serve specificare il nome Antonio: se chiedi "Dov’è il Santo?", tutti sanno immediatamente che ti riferisci a questo straordinario santuario.',
      },
      {
        keywords: ['dolce del santo', 'pasticceria', 'mangiare'],
        answer:
          'Il Dolce del Santo nasce dall’antica usanza francescana di donare pagnotte ai poveri (il "pane dei poveri"). I pasticceri padovani lo hanno trasformato in un dolce squisito con sfoglia friabile, marmellata d’albicocche, mandorle e marzapane.',
      },
    ],
  },
  {
    name: 'Prato della Valle & Isola Memmia',
    aliases: ['prato della valle', 'isola memmia', 'prato', 'statue prato', 'canaletta', '78 statue', 'andrea memmo'],
    city: 'Padova',
    summary:
      'Con quasi 90.000 metri quadrati di superficie, Prato della Valle è una delle piazze monumentali più grandi e scenografiche d’Europa, seconda per estensione solo alla Piazza Rossa di Mosca. È celebre per la sua isola ellittica centrale ("Isola Memmia") circondata da un doppio canale d’acqua e da 78 statue storiche.',
    authorAndCommission:
      'Fu ideata e realizzata a partire dal 1775 dal patrizio veneziano Andrea Memmo, Provveditore Straordinario della Serenissima a Padova, che bonificò un’ampia zona paludosa e malarica trasformandola nel capolavoro urbanistico e ricreativo che ammiriamo oggi.',
    historyAndDates:
      'In epoca romana sorgeva qui il grande teatro Zairo e il campo militare di Campo di Marte. Durante il Medioevo ospitò mercati e giostre d’armi. Con la bonifica illuminista del Memmo divenne il luogo d’elezione per fiere, passeggiate e grandi eventi cittadini.',
    hiddenSecrets:
      'Le statue sono 78, disposte su due anelli (38 all’interno e 40 all’esterno). Originariamente le statue erano 88: c’erano anche le statue dei Dogi di Venezia, ma quando le truppe napoleoniche entrarono a Padova nel 1797 le abbatterono ritenendole simboli dell’oligarchia marciana, rimpiazzate poi da obelischi in pietra.',
    interiorAndArt:
      'L’Isola Memmia è attraversata da quattro viali radiali con ponti monumentali ornati da statue che si incontrano al centro presso una monumentale fontana zampillante. Tra le statue raffigurate puoi cercare celebri personaggi legati a Padova come Galileo Galilei, Francesco Petrarca, Torquato Tasso, Giovanni Poleni e Andrea Mantegna.',
    foodAndNearbyTips:
      'Prato della Valle è il posto ideale per rilassarsi sull’erba con un gelato artigianale della rinomata Gelateria Ciokkolatte o una fetta di pizza al taglio. Ogni sabato mattina la piazza ospita il grandioso mercato settimanale con centinaia di banchi di abbigliamento, antiquariato e fiori.',
    curiosities:
      'È il "Prato senz’erba" dei tre senza padovani: anticamente, prima della bonifica settecentesca, il suolo era ghiaioso e costantemente calpestato da folle e carri durante le fiere del Santo, per cui l’erba non cresceva quasi mai.',
    practicalInfo: {
      tickets: 'L’accesso a Prato della Valle e all’Isola Memmia è pubblico, sempre aperto e completamente gratuito.',
      hours: 'Aperta 24 ore su 24, 7 giorni su 7. La sera l’illuminazione riflessa sull’acqua dei canali regala un’atmosfera magica.',
      dogs: 'I cani sono ampiamente benvenuti sia lungo i viali perimetrali che sull’erba dell’Isola Memmia, al guinzaglio.',
      accessibility: 'Completamente pianeggiante e accessibile a persone in sedia a rotelle e passeggini su tutti i ponti e viali.',
      transport:
        'Fermata del tram Sir1 "Prato della Valle". Per le auto è presente l’ampio parcheggio custodito "Park Rabin" proprio all’angolo sud della piazza.',
      restrooms: 'Servizi igienici pubblici custoditi presenti sul lato dell’ex Foro Boario / Park Rabin.',
    },
    qaPairs: [
      {
        keywords: ['statue', '78', 'quante statue', 'personaggi', 'galileo', 'petrarca'],
        answer:
          'Lungo il canale si ergono 78 statue in pietra d’Istria e di Vicenza: raffigurano professori dell’università, scienziati, artisti e papi legati a Padova. Tra i più celebri puoi scorgere Galileo Galilei (che insegnò al Bo), Petrarca, Tasso, il medico Giovanni Battista Morgagni e l’architetto Palladio.',
      },
      {
        keywords: ['senz’erba', 'senza erba', 'perché si chiama', 'nome prato'],
        answer:
          'Viene chiamato "il Prato senz’erba" perché prima della bonifica del 1775 l’area era una vasta depressione paludosa e ghiaiosa dove si tenevano mercati di bestiame e fiere. Il continuo calpestio di cavalli, carri e mercanti impediva all’erba di crescere, lasciando il terreno brullo.',
      },
      {
        keywords: ['andrea memmo', 'bonifica', 'isola memmia', 'architetto'],
        answer:
          'Andrea Memmo fu un nobile veneziano illuminato. Per debellare la malaria e riqualificare l’area, progettò a sue spese l’Isola Memmia dotandola di un canale di scolo sotterraneo che alimenta il doppio anello d’acqua, trasformando una palude malsana nella piazza più elegante d’Italia.',
      },
      {
        keywords: ['mercato', 'sabato', 'banchi'],
        answer:
          'Ogni sabato Prato della Valle ospita il mercato tradizionale padovano con oltre 160 bancarelle che circondano l’intera piazza: stoffe, scarpe, capi in pelle, piante e fiori. La terza domenica del mese si tiene invece un famosissimo mercatino d’antiquariato e collezionismo.',
      },
    ],
  },
  {
    name: 'Palazzo Bo & Teatro Anatomico',
    aliases: ['palazzo bo', 'il bo', 'università padova', 'teatro anatomico', 'cattedra galileo', 'elena cornaro'],
    city: 'Padova',
    summary:
      'Palazzo Bo è la sede storica principale dell’Università degli Studi di Padova, fondata nel 1222 da studenti e professori in cerca di libertà accademica (motto "Universa Universis Patavina Libertas"). Ospita il Teatro Anatomico stabile più antico del mondo (1594) e la cattedra lignea di Galileo Galilei.',
    authorAndCommission:
      'Il palazzo prese il nome dall’insegna del "Bove" (l’antica locanda medievale con macello annesso che sorgeva in questo punto). Fu trasformato nel Cinquecento con il sontuoso Cortile Antico a doppio loggiato dorico e ionico progettato da Andrea Moroni.',
    historyAndDates:
      'Qui Galileo Galilei insegnò matematica e fisica dal 1592 al 1610, definendo quegli anni come "i diciotto migliori anni di tutta la mia vita", compiendo le rivoluzionarie osservazioni astronomiche dei satelliti di Giove con il suo cannocchiale.',
    hiddenSecrets:
      'Ai piedi dello scalone monumentale trovi la statua marmorea di Elena Lucrezia Cornaro Piscopia: nel 1678 fu la prima donna al mondo a conseguire una laurea universitaria (in filosofia), un traguardo storico che rese Padova faro di emancipazione e cultura in tutta Europa.',
    interiorAndArt:
      'Il celebre Teatro Anatomico, inaugurato nel 1594 dal medico Girolamo Fabrici d’Acquapendente, è una struttura a cono rovesciato in legno di noce a sei ordini di palchi dove gli studenti assistevano alle dissezioni dei cadaveri a lume di candela e con accompagnamento musicale.',
    foodAndNearbyTips:
      'Uscendo dal Bo ti trovi a pochi passi dal Caffè Pedrocchi per una pausa storica, o nelle vie pedonali di via Roma e via San Fermo per boutique e pasticcerie raffinate.',
    curiosities:
      'Le pareti e le volte del Cortile Antico e dell’Aula Magna sono tappezzate da oltre 3.000 stemmi araldici dipinti e scolpiti, lasciati nei secoli da studenti e rettori provenienti da ogni angolo d’Europa.',
    practicalInfo: {
      tickets:
        'Il Cortile Antico è visitabile liberamente. Il Teatro Anatomico, l’Aula Magna e la Cattedra di Galileo sono accessibili tramite visite guidate organizzate dal Centro Visite del Bo.',
      hours: 'Aperto dal lunedì alla domenica per le visite guidate (consigliata la prenotazione nei weekend).',
      dogs: 'I cani non sono ammessi all’interno delle sale storiche e del Teatro Anatomico.',
      accessibility: 'Dotato di ascensori e percorsi accessibili per le principali sale storiche.',
      transport: 'Nel pieno centro storico di Padova, fermata tram "Cavour" o "Ponti Romani".',
      restrooms: 'Servizi igienici disponibili all’interno del Palazzo Bo per i visitatori del tour.',
    },
    qaPairs: [
      {
        keywords: ['galileo', 'galilei', 'cattedra', 'insegnato', 'telescopio'],
        answer:
          'Galileo Galilei visse a Padova per 18 anni (1592-1610). Nell’Aula Magna di Palazzo Bo puoi ammirare la sua cattedra originale in legno, costruita dai suoi allievi per permettergli di parlare alle centinaia di studenti che si accalcavano per seguire le sue lezioni sulla meccanica e sui moti celesti.',
      },
      {
        keywords: ['teatro anatomico', 'medicina', 'cadaveri', 'dissezioni', 'fabrici'],
        answer:
          'Costruito nel 1594, il Teatro Anatomico è interamente in legno di noce e poteva accogliere fino a 250 studenti in piedi strettissimi. Al centro c’era il tavolo di dissezione: se arrivavano controlli delle autorità ecclesiastiche, un ingegnoso meccanismo a botola faceva sparire il cadavere nei sotterranei sostituendolo con un tavolo da concerto!',
      },
      {
        keywords: ['elena cornaro', 'prima donna', 'laurea', 'filosofia'],
        answer:
          'Elena Lucrezia Cornaro Piscopia discusse la sua tesi di laurea in filosofia a Padova il 25 giugno 1678. L’evento attirò così tanti spettatori e studiosi che la cerimonia dovette essere spostata dalla sede universitaria alla cattedrale di Padova, consacrandola prima donna laureata nella storia umana.',
      },
    ],
  },
  {
    name: 'Orto Botanico di Padova',
    aliases: ['orto botanico', 'palma di goethe', 'orto dei semplici', 'giardino biodiversità'],
    city: 'Padova',
    summary:
      'Fondato nel 1545, l’Orto Botanico di Padova è l’orto botanico universitario più antico del mondo rimasto ininterrottamente nella sua sede originaria. Dal 1997 è iscritto nel Patrimonio Mondiale dell’Umanità UNESCO come culla della scienza botanica moderna.',
    authorAndCommission:
      'Istituito su delibera del Senato della Repubblica di Venezia per permettere agli studenti di medicina dell’Università di Padova di riconoscere le piante medicinali autentiche (dette "i semplici"). Fu progettato dall’architetto Andrea Moroni con una caratteristica pianta circolare cinta da mura.',
    historyAndDates:
      'Attraverso i secoli ha svolto un ruolo pionieristico nell’introduzione, coltivazione e acclimatazione di specie botaniche esotiche sconosciute in Europa, tra cui la pianta della patata, del caffè, del girasole, del lillà e del rabarbaro.',
    hiddenSecrets:
      'Nella serra storica vive la leggendaria "Palma di Goethe" (una Chamaerops humilis piantata nel 1585): il celebre scrittore e scienziato tedesco Johann Wolfgang von Goethe la studiò a lungo durante il suo viaggio a Padova nel 1786, traendone ispirazione per il suo celebre saggio scientifico sulla metamorfosi delle piante.',
    interiorAndArt:
      'Oggi il complesso unisce l’antico "Hortus Cinctus" rinascimentale circondato da mura con il modernissimo "Giardino della Biodiversità": una serra bioclimatica ultramoderna lunga 100 metri che simula 5 differenti biomi del pianeta, dalle foreste pluviali equatoriali al deserto arido.',
    foodAndNearbyTips:
      'A 3 minuti a piedi trovi Prato della Valle e la Basilica del Santo, con ottimi locali e osterie tipiche per una sosta rilassante.',
    curiosities:
      'Nel Cinquecento le piante medicinali erano talmente rare e preziose che l’Orto subiva continui furti notturni: per questo venne eretta l’alta cinta muraria circolare in mattoni con un robusto portale d’accesso chiuso a chiave da guardiani armati.',
    practicalInfo: {
      tickets: 'Ingresso con biglietto (ridotto per studenti, over 65 e famiglie). Include orto storico e serra della biodiversità.',
      hours: 'Aperto dal martedì alla domenica dalle 09:00 alle 19:00 (in inverno fino alle 17:00). Chiuso i lunedì non festivi.',
      dogs: 'I cani non sono ammessi all’interno dell’Orto Botanico e delle serre per salvaguardare le specie vegetali rare (ammessi solo cani guida).',
      accessibility: 'Interamente accessibile: tutti i percorsi dell’orto antico e delle serre moderne sono pianeggianti e senza barriere.',
      transport: 'Situato tra il Santo e Prato della Valle, a 3 minuti dalla fermata tram "Santo" o "Prato della Valle".',
      restrooms: 'Servizi igienici moderni e accessibili all’ingresso e presso il padiglione della biodiversità.',
    },
    qaPairs: [
      {
        keywords: ['palma di goethe', 'goethe', 'palma antica', '1585'],
        answer:
          'La Palma di Goethe è l’esemplare più antico dell’Orto Botanico, messa a dimora nel 1585. Quando Goethe la osservò nel 1786 rimase colpito da come da una singola radice si sviluppassero foglie con stadi evolutivi diversi, intuendo che tutte le parti vegetali derivano dalla metamorfosi della foglia.',
      },
      {
        keywords: ['piante introdotte', 'patata', 'caffè', 'girasole'],
        answer:
          'Grazie ai commerci marittimi della Repubblica di Venezia, l’Orto di Padova fu il primo luogo in Italia dove vennero coltivate e descritte scientificamente piante fondamentali per l’alimentazione moderna come la patata, il caffè, il girasole e il sesamo.',
      },
    ],
  },

  // --- ROMA ---
  {
    name: 'Colosseo (Anfiteatro Flavio)',
    aliases: ['colosseo', 'anfiteatro flavio', 'gladiatori', 'arena', 'vespasiano', 'tito'],
    city: 'Roma',
    summary:
      'Il più grande e celebre anfiteatro del mondo romano antico, capace di accogliere oltre 50.000 spettatori. Fu inaugurato nell’80 d.C. dall’imperatore Tito con 100 giorni consecutivi di giochi straordinari.',
    authorAndCommission:
      'Voluto dall’imperatore Vespasiano nel 72 d.C. della dinastia Flavia e completato dal figlio Tito nell’80 d.C., fu edificato nella valle dove Nerone aveva scavato il lago artificiale della sua sontuosa Domus Aurea, restituendo quello spazio al popolo romano.',
    historyAndDates:
      'Ospitava combattimenti tra gladiatori (munera), cacce ad animali feroci esotici (venationes) e, nei primi anni prima della costruzione dei sotterranei murati, spettacolari battaglie navali con l’arena allagata (naumachie).',
    hiddenSecrets:
      'In cima all’anfiteatro era stazionato un distaccamento speciale di marinai della flotta imperiale di Miseno, incaricati di manovrare il "velarium": un immenso sistema di vele e corde di canapa steso sopra le gradinate per proteggere gli spettatori dal sole cocente e dalla pioggia.',
    interiorAndArt:
      'Sotto il piano dell’arena in legno ricoperto di sabbia si sviluppavano i complessi sotterranei dell’Ipogeo, con decine di montacarichi e argani manuali che permettevano di far comparire a sorpresa gladiatori e belve feroci direttamente sul campo di battaglia.',
    foodAndNearbyTips:
      'Nel vicino Rione Monti, a 7 minuti a piedi salendo verso via dei Serpenti o via Panisperna, puoi gustare tonnarelli cacio e pepe autentici e ottimi carciofi alla giudia.',
    curiosities:
      'Il nome "Colosseo" non deriva dalle sue dimensioni monumentali, ma dal gigantesco "Colosso di Nerone", una statua bronzea alta più di 30 metri che sorgeva proprio accanto all’anfiteatro.',
    practicalInfo: {
      tickets: 'Biglietto nominativo obbligatorio con prenotazione oraria online. Include l’accesso al Foro Romano e al Colle Palatino.',
      hours: 'Aperto tutti i giorni dalle 08:30 fino a circa un’ora prima del tramonto (chiuso a Natale e Capodanno).',
      dogs: 'I cani non sono ammessi all’interno del monumento (ammessi solo cani guida certificati).',
      accessibility: 'Accessibile alle persone con disabilità motoria tramite ascensori e rampe dedicate al primo e secondo livello.',
      transport: 'Stazione della metropolitana Linea B "Colosseo" proprio davanti all’uscita.',
      restrooms: 'Servizi igienici situati all’ingresso e al primo ordine di gradinate.',
    },
    qaPairs: [
      {
        keywords: ['velario', 'velarium', 'tenda', 'sole', 'marinai'],
        answer:
          'Il velarium era una meraviglia d’ingegneria navale: 240 pali di sostegno sulla sommità reggevano una colossale ragnatela di funi e teli di canapa manovrati da esperti marinai militari per schermare il pubblico dal calore estivo romano.',
      },
      {
        keywords: ['naumachie', 'battaglie navali', 'acqua', 'allagare'],
        answer:
          'Nei primi anni di attività, prima che Domiziano costruisse i sotterranei in muratura fissi, l’arena poteva essere allagata grazie a condutture collegate con acquedotti per inscenare vere battaglie navali con navi da guerra e decine di figuranti.',
      },
      {
        keywords: ['nome colosseo', 'perché colosseo', 'colosso nerone'],
        answer:
          'Nel Medioevo prese il nome di Colosseo non per la sua grandezza, ma perché sorgeva accanto alla colossale statua bronzea di Nerone alta oltre 30 metri, paragonabile al Colosso di Rodi.',
      },
    ],
  },
  {
    name: 'Pantheon di Agrippa',
    aliases: ['pantheon', 'cupola pantheon', 'oculo pantheon', 'agrippa', 'adria'],
    city: 'Roma',
    summary:
      'Il tempio pagano dedicato a tutti gli dei romani, trasformato nel 609 d.C. nella basilica cristiana di Santa Maria ad Martyres. Vanta la cupola in calcestruzzo non armato più grande mai costruita nella storia umana, con un diametro interno di 43,30 metri esattamente pari alla sua altezza.',
    authorAndCommission:
      'Costruito originariamente nel 27 a.C. da Marco Vipsanio Agrippa (il cui nome è ancora inciso a grandi lettere di bronzo sul fregio), fu interamente ricostruito nella forma sferica attuale dall’imperatore Adriano tra il 118 e il 125 d.C.',
    historyAndDates:
      'La sua perfetta conservazione attraverso due millenni si deve alla donazione dell’imperatore bizantino Foca a papa Bonifacio IV nel 609 d.C., che lo consacrò a chiesa preservandolo dalle spoliazioni.',
    hiddenSecrets:
      'La leggenda che all’interno del Pantheon non piova è falsa: l’acqua entra dall’oculo zenitale di 9 metri di diametro aperto al cielo, ma il pavimento marmoreo convesso ha 22 minuscoli fori di drenaggio invisibili che evacuano istantaneamente l’acqua piovana.',
    interiorAndArt:
      'All’interno si trovano le tombe solenni dei primi re d’Italia Vittorio Emanuele II e Umberto I con la regina Margherita, oltre alla tomba sublime del grande maestro del Rinascimento Raffaello Sanzio.',
    foodAndNearbyTips:
      'A 50 metri dal Pantheon, fermati per un caffè torrefatto a legna al celebre bar Sant’Eustachio o alla Tazza d’Oro per una granita al caffè con doppia panna.',
    curiosities:
      'A mezzogiorno del solstizio d’estate (21 giugno), il fascio di luce solare che penetra dall’oculo colpisce con geometrica precisione il centro del portale monumentale in bronzo.',
    practicalInfo: {
      tickets: 'Ingresso a pagamento (5 euro intero, ridotto per residenti e giovani). Nei weekend è richiesta la prenotazione online.',
      hours: 'Aperto tutti i giorni dalle 09:00 alle 19:00 (ultimo ingresso 18:30).',
      dogs: 'I cani non sono ammessi essendo un luogo di culto consacrato.',
      accessibility: 'Completamente pianeggiante e accessibile senza gradini.',
      transport: 'Nel cuore pedonale di Roma, a 8 minuti da Piazza Navona e Largo di Torre Argentina.',
      restrooms: 'Non ci sono bagni all’interno del monumento; numerosi bar con servizi nelle piazze adiacenti.',
    },
    qaPairs: [
      {
        keywords: ['piove', 'pioggia', 'oculo', 'buco', 'apertura'],
        answer:
          'L’oculo è completamente aperto al cielo: quando a Roma piove, l’acqua entra copiosamente. Tuttavia il pavimento ha una leggera pendenza verso l’esterno e 22 fori di drenaggio tra i marmi policromi che la fanno defluire all’istante.',
      },
      {
        keywords: ['raffaello', 'tomba', 'pittore', 'lapide'],
        answer:
          'Nel Pantheon è sepolto Raffaello Sanzio. Sulla sua tomba puoi leggere il celebre epitaffio in latino di Pietro Bembo: "Qui giace quel Raffaello da cui, vivo, la Natura temette di essere vinta, e quando morì, temette di morire con lui".',
      },
    ],
  },
];

/**
 * Intelligent Conversational Engine for Monument Q&A
 * Accurately handles general chat, greetings, identity, practical questions,
 * and deep artistic inquiries without canned or truncated text.
 */
export function generateSmartMonumentAnswer(params: {
  question: string;
  currentMonument?: string;
  city?: string;
  voicePersona?: string;
}): string {
  const q = params.question.toLowerCase().trim();
  const currentCity = params.city || 'Padova';
  const monumentQuery = (params.currentMonument || '').toLowerCase();

  // 1. GREETINGS & CASUAL OPENINGS
  const isGreeting = /^(ciao|buongiorno|buonasera|salve|buondì|ehi|hey|ciao almagora)/i.test(q);
  if (isGreeting && q.split(' ').length <= 4) {
    return `Ciao! Sono Almagora, la tua guida vocale in cuffia. Sono qui accanto a te per esplorare ${
      params.currentMonument ? `${params.currentMonument} a ${currentCity}` : currentCity
    }. Dimmi pure: vuoi scoprire i segreti artistici di questo luogo, curiosità storiche o magari un consiglio pratico?`;
  }

  // 2. IDENTITY, BOT ROLE & CAPABILITIES
  const isIdentity =
    q.includes('chi sei') ||
    q.includes('come ti chiami') ||
    q.includes('cosa fai') ||
    q.includes('cosa puoi fare') ||
    q.includes('cosa sai fare') ||
    q.includes('chi siete') ||
    q.includes('presentati') ||
    q.includes('cosa è almagora') ||
    q.includes('cos’è almagora');

  if (isIdentity) {
    return `Sono Almagora, la tua guida turistica personale con intelligenza artificiale integrata nei tuoi auricolari. Ti accompagno a piedi per ${currentCity}, raccontandoti la storia, i dettagli nascosti dei monumenti, aneddoti curiosi e consigli pratici in tempo reale. Puoi farmi qualsiasi domanda al microfono mentre cammini!`;
  }

  // 3. POLITE & STATUS INTERACTIONS
  if (q.includes('come stai') || q.includes('tutto bene')) {
    return `Sto benissimo e sono entusiasta di accompagnarti in questa passeggiata! Come posso aiutarti ad ammirare al meglio ${
      params.currentMonument || currentCity
    }?`;
  }

  if (q.includes('grazie') || q.includes('bravissima') || q.includes('ottimo') || q.includes('interessante')) {
    return `È un vero piacere guidarti! Quando sei pronto a scoprire altri dettagli o a proseguire verso la prossima tappa, chiedimi pure nelle cuffie.`;
  }

  if (q.includes('cosa posso chiederti') || q.includes('aiuto') || q.includes('istruzioni')) {
    return `Puoi chiedermi tutto ciò che ti incuriosisce: chi ha commissionato o realizzato questo monumento, aneddoti storici, particolari nascosti da cercare con gli occhi, informazioni su orari e biglietti, o dove gustare una specialità tipica qui nei paraggi!`;
  }

  // 4. FIND MONUMENT CONTEXT
  let match = MONUMENT_KNOWLEDGE_BASE.find((m) => {
    const nameMatch = m.name.toLowerCase().includes(monumentQuery) || monumentQuery.includes(m.name.toLowerCase());
    const aliasMatch = m.aliases.some((a) => monumentQuery.includes(a) || a.includes(monumentQuery) || q.includes(a));
    return nameMatch || aliasMatch;
  });

  if (!match) {
    match = MONUMENT_KNOWLEDGE_BASE.find((m) => {
      return (
        m.city.toLowerCase() === currentCity.toLowerCase() &&
        m.aliases.some((alias) => q.includes(alias))
      );
    }) || MONUMENT_KNOWLEDGE_BASE.find((m) => m.city.toLowerCase() === currentCity.toLowerCase());
  }

  // If outside known monuments, give a polite, helpful generic response
  if (!match) {
    const mon = params.currentMonument || 'questo splendido monumento';
    if (q.includes('mangiare') || q.includes('bere') || q.includes('caffè') || q.includes('pranzo')) {
      return `Nelle immediate vicinanze di ${mon} a ${currentCity} ti consiglio di imboccare le vie pedonali laterali: a meno di cinque minuti a piedi troverai osterie tipiche e botteghe storiche dove assaggiare i sapori più autentici del territorio.`;
    }
    if (q.includes('chi') || q.includes('autore') || q.includes('quando')) {
      return `Riguardo a ${mon}, è un’opera di grande rilevanza storica per ${currentCity}, edificata nel corso dei secoli e custodita con cura dalla comunità locale per preservare le memorie civiche e religiose della città.`;
    }
    return `Ti trovi davanti a ${mon} a ${currentCity}. Osserva con attenzione l’armonia delle proporzioni e la finitura della pietra: riflette l’identità architettonica della città. Chiedimi pure qualsiasi consiglio o curiosità specifica!`;
  }

  // 5. MATCH SPECIFIC QA PAIRS FOR THIS MONUMENT
  for (const qa of match.qaPairs) {
    const hasKeyword = qa.keywords.some((kw) => q.includes(kw));
    if (hasKeyword) {
      return qa.answer;
    }
  }

  // 6. PRACTICAL INTENT RECOGNITION
  // Tickets & Prices
  if (
    q.includes('bigliett') ||
    q.includes('costo') ||
    q.includes('costa') ||
    q.includes('prezzo') ||
    q.includes('prenot') ||
    q.includes('gratis') ||
    q.includes('ingresso') ||
    q.includes('ticket') ||
    q.includes('pagare')
  ) {
    return match.practicalInfo.tickets;
  }

  // Opening Hours
  if (
    q.includes('orari') ||
    q.includes('orario') ||
    q.includes('aperto') ||
    q.includes('chiuso') ||
    q.includes('quando apre') ||
    q.includes('a che ora') ||
    q.includes('giorni')
  ) {
    return match.practicalInfo.hours;
  }

  // Dogs & Pets
  if (q.includes('can') || q.includes('animale') || q.includes('animali') || q.includes('quattro zampe')) {
    return match.practicalInfo.dogs;
  }

  // Accessibility
  if (
    q.includes('disabili') ||
    q.includes('carrozzina') ||
    q.includes('accessibil') ||
    q.includes('passeggino') ||
    q.includes('gradini') ||
    q.includes('scale')
  ) {
    return match.practicalInfo.accessibility;
  }

  // Transportation / Parking
  if (
    q.includes('parcheggio') ||
    q.includes('parcheggi') ||
    q.includes('tram') ||
    q.includes('bus') ||
    q.includes('arrivare') ||
    q.includes('stazione') ||
    q.includes('mezzi')
  ) {
    return match.practicalInfo.transport;
  }

  // Restrooms
  if (
    q.includes('bagno') ||
    q.includes('bagni') ||
    q.includes('toilette') ||
    q.includes('servizi igienici') ||
    q.includes('wc')
  ) {
    return match.practicalInfo.restrooms;
  }

  // 7. FOOD, DRINK & LEISURE
  if (
    q.includes('mangiare') ||
    q.includes('caffè') ||
    q.includes('caffe') ||
    q.includes('bar') ||
    q.includes('ristorante') ||
    q.includes('pausa') ||
    q.includes('bere') ||
    q.includes('spritz') ||
    q.includes('pranzo') ||
    q.includes('cena') ||
    q.includes('dolce')
  ) {
    return match.foodAndNearbyTips;
  }

  // 8. SECRETS, MYSTERIES & CURIOSITIES
  if (
    q.includes('segreto') ||
    q.includes('segreti') ||
    q.includes('mistero') ||
    q.includes('leggenda') ||
    q.includes('curiosità') ||
    q.includes('curiosita') ||
    q.includes('strano') ||
    q.includes('particolare') ||
    q.includes('aneddoto') ||
    q.includes('nasconde')
  ) {
    return `${match.hiddenSecrets} ${match.curiosities}`;
  }

  // 9. ARTIST, AUTHOR & COMMISSION
  if (
    q.includes('chi') ||
    q.includes('autore') ||
    q.includes('dipinto') ||
    q.includes('costruito') ||
    q.includes('architetto') ||
    q.includes('committente') ||
    q.includes('realizzato') ||
    q.includes('fondatore')
  ) {
    return `${match.authorAndCommission} ${match.summary}`;
  }

  // 10. HISTORICAL DATES & TIMELINE
  if (
    q.includes('quando') ||
    q.includes('anno') ||
    q.includes('data') ||
    q.includes('secolo') ||
    q.includes('epoca') ||
    q.includes('storia')
  ) {
    return `${match.historyAndDates} ${match.authorAndCommission}`;
  }

  // 11. INTERIOR & WORKS TO ADMIRE
  if (
    q.includes('dentro') ||
    q.includes('interno') ||
    q.includes('vedere') ||
    q.includes('affresch') ||
    q.includes('opera') ||
    q.includes('statue') ||
    q.includes('quadri')
  ) {
    return `${match.interiorAndArt} ${match.hiddenSecrets}`;
  }

  // 12. "PERCHÉ" / REASONS
  if (q.includes('perché') || q.includes('perche') || q.includes('motivo') || q.includes('ragione')) {
    return `${match.curiosities} ${match.summary}`;
  }

  // 13. COMPREHENSIVE ELOQUENT SPOKEN OVERVIEW
  return `${match.summary} ${match.authorAndCommission} Un dettaglio da osservare subito sul posto: ${match.hiddenSecrets}`;
}
