# EU AI Act for utviklere: Hva som gjelder fra 2. august, og hva som nettopp ble utsatt

Published: July 2026
Originally published at Capra Consulting: https://capraconsulting.no/vare-historier/eu-ai-act-for-utviklere

> Høyrisiko-regimet er utsatt til 2027, Norge er ikke bundet ennå, og kodeassistenter er ikke høyrisiko. Dette gjelder faktisk fra 2. august 2026.

![Editorial illustration, wide 16:9 banner composition. A calm, flat European Union flag motif fills the frame: a deep muted navy-blue field with a circle of twelve small five-pointed gold stars placed off-center toward the left, rendered flat and matte. In the open space to the right of the star circle, elegant serif text in warm cream reads exactly, with correct Norwegian spelling including the letter å: "Hvordan forbereder jeg meg på EU AI Act?" set in a classic editorial serif typeface, broken over two or three lines, with generous letter spacing. No other text anywhere in the image. Mood: calm, civic, editorial. Palette: deep muted navy blue, soft matte gold, warm cream. Flat editorial illustration with subtle paper grain texture, restrained detail and no fine line work, generous negative space. Magazine opinion-section feel like The Economist or New York Times opinion illustrations.](https://www.magnusrodseth.com/blog/eu-ai-act-for-utviklere/banner.webp)
_Hvordan forbereder du deg på EU AI Act? Kortversjonen: roligere enn overskriftene tilsier. Kilde: OpenAI gpt-image-2._

## Innledning

Den 2. august 2026 skrus håndhevingsmaskineriet i EU AI Act (KI-forordningen, EUs felles regelverk for utvikling og bruk av AI) på: nasjonale tilsyn får bøtemyndighet, og transparenskravene i artikkel 50 begynner å gjelde. Samtidig vedtok EU i juni en endringspakke, [Digital Omnibus](https://www.europarl.europa.eu/legislative-train/package-digital-package/file-digital-omnibus-on-ai), som flytter de tyngste pliktene, hele høyrisiko-regimet (de strengeste kravene, forbeholdt AI på særlig sensitive bruksområder), til desember 2027. Begge deler skjedde i løpet av de siste ukene, og begge deler er underkommunisert blant utviklere.

Jeg har brukt en del tid på å nøste i hva dette faktisk betyr for oss som bygger med AI-agenter i hverdagen. Kortversjonen: kodeassistenten din er ikke høyrisiko, du må etter alt å dømme ikke vannmerke AI-generert kode, og Norge er strengt tatt ikke bundet av forordningen ennå. Men noen plikter er reelle, og et par feller er lette å gå i.

I dette innlegget får du datoene som gjelder etter endringene, hva som faktisk treffer et utviklingsteam, og hvor Norge står.

![Editorial illustration, wide composition. A long straight road recedes toward a calm horizon across a flat landscape. In the foreground a simple stone milestone marker stands beside the road. Much further down the same road stands a second, identical milestone, freshly planted, with faint drag marks in the ground between the two showing it was recently moved from the near position to the far one. No people. Mood: postponement, recalibration, calm. Road in soft slate, milestones in muted teal, a single rust accent on the far milestone, warm cream background and sky. Flat editorial illustration with subtle paper grain texture, restrained detail and no fine line work, a single central concept, symbolic rather than literal, with generous negative space. No labels, no text, no numbers inside the image. Wide 16:9 composition, magazine opinion-section feel like The Economist or New York Times opinion illustrations.](https://www.magnusrodseth.com/blog/eu-ai-act-for-utviklere/milestone-moved.webp)
_Den store fristen ble nettopp flyttet: høyrisiko-regimet gjelder først fra desember 2027. Kilde: OpenAI gpt-image-2._

## Datoene, etter Digital Omnibus

Forordningen trådte i kraft allerede i 2024, men pliktene fases inn over flere år. Etter endringspakken ser [tidslinjen](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act) slik ut:

- **2. februar 2025:** Forbudene (artikkel 5, praksiser som sosial poengsetting og manipulerende AI) og kravet om AI literacy (artikkel 4, at folk som bruker AI i jobben skal ha tilstrekkelig kompetanse) gjelder allerede.
- **2. august 2025:** Plikter for tilbydere av generelle AI-modeller (GPAI, general-purpose AI: grunnmodellene som alt annet bygges på), altså selskaper som OpenAI, Anthropic og Google.
- **2. august 2026:** Transparenskravene i artikkel 50, pluss håndhevingen: nasjonale tilsyn, bøter og [regulatoriske sandkasser](https://www.datatilsynet.no/regelverk-og-verktoy/sandkasse-for-kunstig-intelligens/) (veiledede testmiljøer der bedrifter prøver ut AI-systemer sammen med tilsynet).
- **2. desember 2027:** Høyrisiko-regimet for bruksområdene i [Annex III](https://artificialintelligenceact.eu/annex/3/) (forordningens vedlegg som lister opp hvilke bruksområder som regnes som høyrisiko). Denne fristen var opprinnelig 2. august 2026.
- **2. august 2028:** Høyrisiko-krav for AI innebygd i produkter som allerede er regulert på andre måter, for eksempel medisinsk utstyr og biler (Annex I).

Utsettelsene kom med Digital Omnibus, som Europaparlamentet vedtok 16. juni og Rådet ga endelig klarsignal i slutten av juni. Pakken er i skrivende stund på vei inn i EUs offisielle tidsskrift. Har du sett paniske innlegg om at «alt» gjelder fra 2. august, kan du altså puste rolig ut: [den største fristen ble nylig flyttet 16 måneder frem i tid](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/).

## Er kodeassistenten din høyrisiko?

Nei. Annex III er en lukket liste over _bruksområder_, og vanlig utviklerassistanse står ikke på den. Listen handler om ting som rekruttering, kredittvurdering, utdanning og kritisk infrastruktur. Et team som bruker Claude Code eller Copilot til å skrive, teste og gjennomgå kode, har i praksis [null Annex III-eksponering](https://www.augmentcode.com/guides/eu-ai-act-2026).

![Editorial illustration. A short, elegant velvet rope cordon on two small posts encloses a tight cluster of a few abstract geometric shapes at the center of the frame. Clearly outside the cordon, at a comfortable distance, sits a single closed laptop, calm and unbothered. Mood: a small, well-defined enclosure; everything else stands outside it. Cordon and posts in muted teal, enclosed shapes in soft slate, one rust accent on the rope, laptop in soft slate, warm cream background. Flat editorial illustration with subtle paper grain texture, restrained detail and no fine line work, a single central concept, symbolic rather than literal, with generous negative space. No labels, no text inside the image. Magazine opinion-section feel like The Economist or New York Times opinion illustrations.](https://www.magnusrodseth.com/blog/eu-ai-act-for-utviklere/closed-list.webp)
_Annex III er en lukket liste over bruksområder. Kodeverktøyene dine står utenfor. Kilde: OpenAI gpt-image-2._

Fellen ligger et annet sted: **arbeidsstyring** (Annex III punkt 4). Bruker organisasjonen AI til å fordele oppgaver til ansatte eller overvåke og evaluere prestasjoner, er det høyrisiko. Et konkret eksempel: å pipe utviklertelemetri fra GitHub inn i et lederdashboard som evaluerer enkeltpersoner, flytter deg rett inn i høyrisiko-territorium. Da venter krav om teknisk dokumentasjon, automatisk logging og menneskelig oversikt, fra desember 2027.

Rollene avgjør hvem som bærer hvilke plikter. Bruker teamet ditt Claude eller GPT via API, er dere **deployer** (forordningens ord for den som tar et AI-system i bruk), mens modelltilbyderen (**provider**, den som utvikler og tilbyr systemet) bærer GPAI-pliktene. Dere arver dem ikke ved å bruke API-et, og heller ikke ved vanlig «fine-tuning» av AI-modeller (videretrening av en eksisterende modell på egne data): EU-kommisjonens veiledende terskel for å [bli regnet som tilbyder av en modifisert modell](https://artificialintelligenceact.eu/article/25/) er «fine-tuning» med over en tredjedel av compute (regnekraften) som gikk med til å trene originalmodellen. Det gjør ingen av oss til hverdags.

## Dette gjelder faktisk fra 2. august

[Artikkel 50](https://artificialintelligenceact.eu/article/50/) er transparenskrav, og de treffer team som lanserer AI-funksjoner til brukere:

- **Chatboter:** Brukere skal vite at de snakker med en AI, med mindre det er åpenbart. Lanserer du en chat-funksjon bygget på Claude API, er det ditt ansvar som tilbyder av selve applikasjonen.
- **Generert innhold:** Systemer som genererer tekst, bilde, lyd eller video, skal merke innholdet maskinlesbart (for eksempel med metadata eller usynlig vannmerking, slik at programvare kan gjenkjenne det som AI-generert). Systemer som allerede var på markedet før 2. august, har frist til 2. desember 2026.
- **AI-generert kode:** Etter alt å dømme utenfor. Artikkel 50 sikter på syntetisk medieinnhold, og ingen autoritative kilder leser kildekode inn i kravet. Helt svart på hvitt er det likevel ikke; lovteksten sier «tekst».

Fra samme dato kan tilsynene faktisk bøtelegge: [inntil 35 millioner euro eller 7 prosent av global omsetning](https://artificialintelligenceact.eu/article/99/) for forbudte praksiser, 15 millioner eller 3 prosent for de fleste andre brudd. For små og mellomstore bedrifter gjelder det laveste av beløpene, ikke det høyeste.

Og siden ryktene går: per juli 2026 finnes det ingen bekreftede bøter etter forordningen. Historiene om «de første millionbøtene» som sirkulerer i sosiale medier, er ikke belagt i noen offisiell kilde.

## Hvor står Norge?

Forordningen er ennå ikke tatt inn i EØS-avtalen; den ligger fortsatt til vurdering i EØS-komiteen (organet som avgjør hvilke EU-regler som tas inn i EØS-avtalen og dermed blir bindende for Norge). Den norske KI-loven som skal gjennomføre den, var på [høring sommeren 2025](https://www.regjeringen.no/no/dokumenter/3112327/id3112327/), men er [per våren 2026 ikke lagt frem for Stortinget](https://kiforordning.no/ki-loven-norge/). [Nkom (Nasjonal kommunikasjonsmyndighet) er utpekt som koordinerende tilsynsmyndighet](https://www.regjeringen.no/en/whats-new/gjor-norge-klar-for-trygg-og-innovativ-ki-bruk/id3093081/), og Digdir (Digitaliseringsdirektoratet) huser kompetansemiljøet KI-Norge.

![Editorial illustration, wide composition. Two solid piers face each other across a calm, narrow strait of water, one large pier on the left and one smaller pier on the right. A clean bridge extends from the large pier toward the smaller one but stops partway across the water, its unfinished end wrapped in neat, orderly scaffolding. The water is still. Mood: a connection underway but not yet complete, patient. Piers and bridge in muted teal, scaffolding in soft slate with a single rust accent, water and sky in warm cream tones. Flat editorial illustration with subtle paper grain texture, restrained detail and no fine line work, a single central concept, symbolic rather than literal, with generous negative space. No labels, no text, no flags inside the image. Wide 16:9 composition, magazine opinion-section feel like The Economist or New York Times opinion illustrations.](https://www.magnusrodseth.com/blog/eu-ai-act-for-utviklere/eea-bridge.webp)
_Forordningen er vedtatt i EU, men broen over til EØS-avtalen og norsk lov er ikke ferdig bygget. Kilde: OpenAI gpt-image-2._

I praksis betyr det to ting. Selger du kun i Norge, har du ingen direkte forpliktelser etter forordningen i dag, men loven kommer, så det er fornuftig å bygge vanene nå. Selger du inn i EU, gjelder forordningen deg allerede, selv om selskapet ditt ligger utenfor EU ([artikkel 2](https://artificialintelligenceact.eu/article/2/)). Det holder at systemet ditt tilbys på EU-markedet, eller at output fra det brukes i EU.

Ett krav har for øvrig vært gjeldende i EU siden februar 2025: [AI literacy (artikkel 4)](https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers). Både tilbydere og deployere skal sørge for at folk som opererer AI på deres vegne, har tilstrekkelig kompetanse. Omnibus-pakken skal ha myknet formuleringen noe, men opplæringsplikten rundt høyrisiko-systemer består, og kravet følger med inn i norsk lov når den kommer.

## Hva bør teamet ditt gjøre?

Fire konkrete punkter, i prioritert rekkefølge:

1. **Kartlegg rollen deres.** Bruker dere modeller via API, er dere deployer, og pliktene er håndterbare. Tilbyder-plikter oppstår først når dere setter eget navn på et høyrisiko-system eller endrer formålet dets vesentlig.
2. **Sjekk brukervendte AI-funksjoner.** Har produktet en chatbot eller genererer det innhold for brukere i EU, må merkingen være på plass til 2. august (eller 2. desember for systemer som allerede er ute).
3. **Hold agenter unna personalvurderinger.** Oppgavefordeling og prestasjonsevaluering av mennesker er høyrisiko fra desember 2027, og det er billigere å designe seg bort fra det nå enn å dokumentere seg ut av det senere.
4. **Vær skeptisk til skremselsmarkedsføring.** De tyngste fristene ble nettopp utsatt, ingen bøter er delt ut, og vanlige kodeverktøy står utenfor hele høyrisiko-regimet.

## Oppsummering

AI Act treffer utviklingsteam mykere enn overskriftene tilsier, og etter Digital Omnibus enda mykere: høyrisiko-regimet kommer først i desember 2027, og vanlige kodeverktøy står uansett utenfor. Det som gjelder fra 2. august, er transparens for brukervendte AI-funksjoner og et håndhevingsapparat som endelig skrus på. For norske team er den viktigste øvelsen å vite hvilken rolle man har, og å følge med på når forordningen tas inn i EØS-avtalen.

For ordens skyld: jeg er utvikler, ikke jurist, og dette innlegget er orientering, ikke juridisk rådgivning. Lovteksten etter Omnibus-endringene er i skrivende stund på vei inn i EUs offisielle tidsskrift (Official Journal, der EU-regelverk publiseres før det trer i kraft), så sjekk konsolidert tekst (lovteksten med alle endringer innarbeidet) før du tar beslutninger med juridiske konsekvenser.

## Ressurser

- [EU-kommisjonens offisielle tidslinje for AI Act](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act): Datoene fra primærkilden
- [Digital Omnibus i Europaparlamentets lovsporing](https://www.europarl.europa.eu/legislative-train/package-digital-package/file-digital-omnibus-on-ai): Status for endringspakken
- [Artikkel 50 forklart](https://artificialintelligenceact.eu/article/50/): Transparenskravene i detalj
- [Artikkel 99: Bøtenivåene](https://artificialintelligenceact.eu/article/99/): Sanksjonsregimet
- [Regjeringen: Høring av ny KI-lov](https://www.regjeringen.no/no/dokumenter/3112327/id3112327/): Norsk gjennomføring
- [kiforordning.no](https://kiforordning.no/ki-loven-norge/): Utviklervennlig norsk sporing av KI-loven
- [EU AI Act for utviklingsteam (Augment Code)](https://www.augmentcode.com/guides/eu-ai-act-2026): God gjennomgang av kodeassistent-spørsmålet
