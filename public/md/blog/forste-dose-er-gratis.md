# Første dose er gratis: Refleksjoner om token-økonomien

Published: June 2026
Originally published at Capra Consulting: https://capraconsulting.no/vare-historier/forste-dose-er-gratis-refleksjoner-om-token-okonomien

> AI-kodeprisene har skiftet og synliggjort hva inferens egentlig koster. Det relevante spørsmålet er ikke hvordan du kutter token-forbruket, men hvordan du får mer ut av tokenene du bruker.

![Et iskremstativ med skiltet "FØRSTE GRATIS"](/blog/forste-dose-er-gratis/banner.jpeg)
_Den første dosen er alltid på huset. Resten betaler vi for. Kilde: OpenAI gpt-image-2._

## Innledning

I mai 2026 brant et stort norsk selskap gjennom sitt månedlige GitHub Copilot-budsjett mye raskere enn ventet. Jo flere kolleger jeg snakker med, desto oftere hører jeg lignende historier. Mønsteret går igjen, og det kommer bare til å bli mer utbredt.

Tre ting har skjedd samtidig denne våren. [GitHub Copilot legger om til forbruksbasert prising](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) 1. juni 2026. [Claude Opus 4.7 har blitt langt dyrere å bruke på Copilot](https://www.mindstudio.ai/blog/github-copilot-new-multiplier-table-price-hikes) på to måneder: hver forespørsel telles nå som 27 vanlige forespørsler mot kvoten din, mot 7,5 ved lansering. [Anthropic har samtidig endret tokenizeren](https://www.finout.io/blog/claude-opus-4.7-pricing-the-real-cost-story-behind-the-unchanged-price-tag) slik at samme input kan bli opptil 35% flere tokens, uten å endre listeprisen. De tre punktene forsterker hverandre.

For utviklere som har bygd agentiske arbeidsflyter inn i hverdagen, betyr dette at den marginale kostnaden ved hver beslutning du delegerer til en agent, har gått fra "neglisjerbar" til "noe _noen_ følger med på". Det er en synliggjøring av hva inferens (det å la en modell kjøre og produsere et svar) faktisk koster, og en kvittering for vanene vi rakk å bygge oss mens prisen var lav.

Dette innlegget handler om hvordan jeg tenker på den nye token-økonomien, ikke som et kostnadsspørsmål, men som et spørsmål om hvor mange velinformerte valg og parallelle hypoteser teamet ditt får ut av tokenene det bruker, forutsatt at teamet er rigget for å bruke dem godt. Linsen er bevisst smal: jeg velger her å skrive om de konkrete grepene utviklere _selv_ kan ta i sin daglige praksis.

## Hva er en token?

Hopp videre om du vet det. En token er ikke et ord eller et tegn, men en underordsbit modellen leser: vanlige ord blir gjerne ett token, sjeldne ord splittes i flere. Det er disse bitene du faktureres for.

Tre nyanser er verdt å ta med inn i resten av innlegget. Input-tokens (det du sender inn) og output-tokens (det modellen genererer) [prises ulikt](https://www.finout.io/blog/anthropic-api-pricing), og output koster typisk rundt fem ganger så mye som input. Det er en stor del av forklaringen på hvorfor verktøy som komprimerer modellens svar har konkret økonomisk verdi. [Reasoning-tokens](https://tokenmix.ai/blog/thinking-tokens-billing-trap-2026), altså modellens skjulte tankerekker når den jobber i resonneringsmodus, faktureres som output-tokens hos både OpenAI og Anthropic, selv om de ikke vises i svaret du leser. Og hver leverandør har sin egen tokenizer, slik at samme tekst kan bli ulikt antall tokens hos Anthropic, OpenAI og Google. Det er nettopp den mekanikken Anthropic justerte i Opus 4.7 og fikk ca. 35% effektiv prisøkning uten å røre listeprisen.

Norsk havner forøvrig rundt [1,7–1,9 tokens per ord](https://arxiv.org/html/2605.24718), mot engelsk på ca. 1,2. En liten språkskatt, ikke en stor, men verdt å vite om når du regner på forbruket.

## Det skjer overalt, ikke bare hos oss

Historien om selskapet som går tom for tokens før måneden er over er en av mange. [Microsoft kansellerte sine Claude Code-lisenser](https://fortune.com/2026/05/22/microsoft-ai-cost-problem-tokens-agents/) i Experiences and Devices-divisjonen seks måneder etter pilotering, og dirigerer ansatte over på Copilot CLI innen 30. juni 2026. [Uber sin CTO](https://www.tomshardware.com/tech-industry/artificial-intelligence/ai-cost-crisis-hits-tech-giants-as-employee-tokenmaxxing-backfires-agentic-ai-eats-up-to-1000x-more-tokens-than-standard-ai-sparks-corporate-pullback-at-microsoft-meta-and-amazon) forteller at selskapet brant gjennom hele sitt AI-budsjett for 2026 på fire måneder. Goldman Sachs anslår 24x vekst i samlet token-konsum innen 2030, drevet av agentiske systemer som bruker opptil 1000x flere tokens per oppgave enn en standard LLM-forespørsel.

Pris per token faller, mens samlet forbruk eksploderer. Det er ingen motsetning. Agenter er vesentlig dyrere å kjøre enn en chat som varer i noen få samtalerunder.

![Et isfjell der den synlige toppen er bitteliten mot den enorme massen under vann](/blog/forste-dose-er-gratis/pris-vs-forbruk.webp)
_Det synlige prisfallet er bare toppen. Forbruksveksten under overflaten er den som styrer regningen. Kilde: OpenAI gpt-image-2._

I det norske selskapet jeg nevnte innledningsvis ble ekstra budsjett lagt til og brukt opp samme dag, ifølge intern kommunikasjon. Ledelsen innførte derfor en månedlig cap per lisensiert bruker inntil videre. En ansatt påpekte at beløpet var altfor lavt, at de ville gå tomme innen midten av måneden selv om folk var bevisste på token-bruken, og at et realistisk budsjett lå nærmere fire til fem ganger høyere. Hva er poenget med å fortelle deg dette, tenker du kanskje?

Det nye er ikke at ledelsen har en mening om hva verktøyene koster; sky-budsjetter, lisenstak og kvoter på infrastruktur har lenge vært en del av utviklerhverdagen. Det nye er _granulariteten_: nå handler det i større grad om den enkelte utviklerens prompting-vaner i nær sanntid. Den dynamikken kan i verste fall bremse utviklingshastigheten, ikke øke den. Og utviklere som har valget, kan begynne å se seg rundt etter andre arbeidsplasser.

## Den første dosen er alltid på huset

Det første halvannet året med moderne agentisk koding har vært kraftig subsidiert, men subsidien er ulikt fordelt, og det er verdt å være presis på hvordan. Anthropic og OpenAI priser fortsatt sine egne førstepartsprodukter (Claude Code via Claude-abonnementet, Codex via ChatGPT-abonnementet) et godt stykke under det reelle inferensregnskapet. Det er ikke et mysterium hvorfor: markedet skulle vinnes, vanene skulle etableres, byttekostnaden skulle bygges opp.

Tredjepartsverktøy som GitHub Copilot lever derimot oppå API-endepunktene til de samme labene, og API-prisene ligger vesentlig høyere enn det en sluttbruker betaler i et førstepartsabonnement. Når Anthropic justerer API-prisen sin på Opus 4.7 eller endrer tokenizeren, slår det rett inn i kostnaden GitHub må videresende til lisenskunden sin. Det er hovedforklaringen på hvorfor det er organisasjonene som bruker Copilot-lisenser som først merker at regningen kommer, mens utviklere som jobber direkte på en Claude- eller ChatGPT-konto foreløpig sitter i den subsidierte gangen.

Den asymmetrien blir neppe varig: før eller siden må også førstepartsproduktene reflektere reell inferenskostnad. Men akkurat nå er valg av plattform en av de største enkeltfaktorene for hva tokens faktisk koster deg.

## Spør om verdi, ikke kostnad

Maxim Salnikov hos Microsoft skrev nylig en [guide](https://www.linkedin.com/pulse/practitioners-guide-getting-more-value-out-ai-coding-agent-salnikov-mhume/) som setter dette i en presis ramme. Hans poeng er at spørsmålet de fleste team stiller seg nå, "Hvordan kutter vi token-forbruket?", er feil spørsmål. Det riktige spørsmålet er: "Hvordan får vi mer ut av tokenene vi bruker?"

Et team som jakter på lavest mulig token-forbruk, optimaliserer mot en kostnadslinje. Den optimaliseringen har et nullpunkt, nemlig at den billigste prompten er den du aldri sender. Et team som jakter på høyest mulig avkastning per token, har ikke det samme nullpunktet; du må faktisk bruke tokens for å produsere noe. Det kan høres ut som to fremstillinger av samme problem, men de drar adferden i ulike retninger. Det første resulterer i en gnien token-kultur, der utviklere føler skyld for å bruke verktøyene, velger en svakere modell enn oppgaven fortjener, og kutter kontekst som kanskje var nødvendig for å løse problemet. Det andre oppfordrer til disiplin: bedre prompts, klokere modellvalg per oppgave, reflekterte tanker rundt kontekst, bedre verktøykasse for utviklerne.

Salnikovs sentrale påstand er at "agent gambling", altså å kaste en lat og tvetydig prompt mot en dyr modell og prøve igjen om det feiler, var en levedyktig strategi når tokens var tilnærmet gratis, men den slutter å være det i det øyeblikket den marginale kostnaden synliggjøres. Den løses ikke ved å gamble _mindre_, men ved at hvert agent-kall lander mer presist.

## Konkrete grep

Med grunnlaget på plass har jeg noen konkrete råd. De henvender seg særlig til deg som kjenner på at kontekstvinduet ikke alltid strekker til, eller som stadig føler at du må optimalisere for token-bruk.

### Dominoeffekten i en agentisk flyt

Det er en mekanikk i agentiske flyter som mange team ikke tenker over. Hvert steg en agent tar bærer en liten sjanse for å gå feil, og fordi stegene bygger på hverandre, legger ikke den risikoen seg sammen, den ganges. Jo lengre kjeden er, desto større er den samlede sjansen for at noe glipper underveis. En agent som løser ti steg upåklagelig, kan fortsatt rote seg bort på steg førti, og da arver alt som kommer etterpå feilen.

En nyttig måte å se det på er at hver modell har en horisont: en oppgavelengde der den fortsatt holder kvaliteten oppe, og et punkt forbi der påliteligheten faller bratt. [METR måler nettopp dette](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/), altså hvor lange oppgaver en agent klarer før treffsikkerheten ryker, og finner at horisonten har doblet seg omtrent hver syvende måned. Det er ingen tilfeldighet: lange, sammenhengende agentiske oppgaver er nettopp aksen frontier-labbene konkurrerer på nå.

Her ligger også svaret på hvorfor man ikke bare kan "ha en billigere agent". Forbedringene konsentreres i toppmodellene, og avstanden mellom en dyr og en billig agent vokser nettopp langs denne horisonten. En billigere modell betyr derfor ikke bare litt lavere kvalitet per kall; den har en kortere horisont og treffer pålitelighetsstupet tidligere på akkurat den samme oppgaven. Og hver kjøring som detter utfor koster nye tokens i tillegg til menneskelig tid for å rydde opp. Det er her prinsippet om å avdekke feil tidlig, kjent fra testing og sikkerhet, blir avgjørende når du setter sammen agentiske flyter, et poeng jeg kommer tilbake til lenger ned.

![En rad dominobrikker som detter, der den siste brikken så vidt står igjen](/blog/forste-dose-er-gratis/komposisjonsfeil.webp)
_Risikoen ganges, den legger seg ikke sammen. Jo lengre kjeden, desto før treffer en svak modell pålitelighetsstupet. Kilde: OpenAI gpt-image-2._

### De to største spakene

Av alle optimaliseringer er to mer betydningsfulle enn alle andre kombinert:

1. **Modellvalg.** Kostnadsgapet mellom Opus 4.7 og GPT-5.4 mini er omtrent 24x. Å velge riktig modell til oppgaven er derfor den enkleste store spaken du har å skru på. Reasoning-modeller som Opus 4.7 og GPT-5.5 hører hjemme der det å tenke nøye gjennom problemet er hele poenget: planlegging, arkitektur, debugging og oppgaver som spenner over store kontekstvinduer. Mid-tier-modellene Sonnet og GPT-5.4 er sterke valg for asynkron implementasjon, der du gjerne kjører flere agenter i parallell på en velkonstruert spec. Low-tier-modeller som Haiku og GPT-mini holder fint til små refaktoreringer, mekaniske endringer og dokumentasjonsoppdateringer. En reasoning-modell på en triviell oppgave er sjelden bare dyrere; den er også betydelig tregere, og bruker reasoning-tokens som ikke gjør svaret målbart bedre i en situasjon som ikke krevde noen tung resonnering i utgangspunktet.

2. **Relevant kontekst.** Send så lite kontekst som mulig, men så mye som nødvendig. For mye kontekst drar modellen mot irrelevante mønstre og svekker signalet. For lite tvinger modellen til å gjette. Det rette balansepunktet krever bevisst valg av hva du sender med, ikke en refleks om å kaste inn alt.

Konteksten råtner også over tid. Når kontekstvinduet fylles opp forbi halvparten, begynner modellen å vektlegge de siste meldingene på bekostning av systemprompten og de opprinnelige instruksjonene dine. Slik er modellen trent. Konsekvensen er at agenten gradvis glir bort fra målet du definerte i starten, uten at noen varsler deg om det.

En `/clear` for hver ny oppgave er derfor ofte bedre enn å kompaktere konteksten. Kompaktering frigjør plass ved å oppsummere samtalen, men tapet av mellomliggende resonnement og nyanser er reelt. En ren ny oppstart med et nøyaktig formulert mål er som regel både billigere og mer presist.

### Det jeg selv har endret

I praksis betyr dette at jeg nylig har gjort to håndfaste endringer.

For det første har jeg blitt en mer aktiv bruker av OpenAI-modellene. Jeg var tidligere nesten utelukkende på Anthropic. GPT-5.4 og GPT-5.5 har imponert nok til å bli en fast rotasjon inn i min workflow, særlig for oppgaver der jeg verdsetter forutsigbar instruksjonsfølging fremfor brainstorming og sparringssesjoner.

For det andre har jeg eksperimentert mer med reasoning-nivåer. GPT-5.5 på lav reasoning er en kostbar modell brukt billig, men i implementasjonsfasen, der jeg allerede har en nøye definert spec og bare trenger velkonstruerte små endringer, gir det høyere utviklingshastighet uten å ofre den delen av modellens kapasitet jeg faktisk trenger.

### Input-siden og output-siden

Så langt har vi snakket om atferdsendringer: hvordan du velger modell, strukturerer kontekst og organiserer arbeidsflyten. Men det finnes også verktøy som sparer tokens uten at du trenger å endre måten du jobber på. To av dem fortjener omtale fordi de illustrerer to ulike retninger av samme problem.

**[rtk](https://github.com/rtk-ai/rtk)** ("Rust Token Killer") sitter mellom agentens Bash-verktøy og selve shell-kommandoen. Den filtrerer og komprimerer output før den treffer kontekstvinduet. `git status` blir `rtk git status` via en pre-tool hook, og agenten merker ingenting.

Mine egne tall etter ca. 164 000 kommandoer på fem uker: 29,6 millioner tokens spart, 85% effektivitet. Den varige gevinsten kommer fra hverdagslige mønstre: `curl`-kall som henter store assets, `ps aux`, `gh pr diff` og fillesing via `rtk read`. Det er den typen støy som stille akkumulerer i kontekstvinduet uten at du legger merke til det.

**[caveman](https://github.com/JuliusBrussee/caveman)** er den filosofiske motsatsen: en agent-skill som instruerer modellen til å komprimere sin egen output, omtrent som å snakke som en huleboer. Forfatteren rapporterer ca. 65% reduksjon i output-tokens på tvers av et benchmark-sett, men med et viktig forbehold: caveman påvirker bare output-tokens, ikke reasoning-tokens. Jeg bruker den ikke aktivt selv, men jeg tar den med fordi den illustrerer output-siden av disse mekaniske endringene man kan gjøre i arbeidsflyten sin. Par-tankegangen er nyttig: rtk sier "ikke send unødvendig tekst inn", caveman sier "ikke generer unødvendig tekst ut".

### Deterministiske hjelpemidler

Hver test, linter, type-sjekker og sikkerhetssjekk som koden må passere er et deterministisk gjerde rundt agentens output. Hver passerende test nullstiller feilraten for den egenskapen testen dekker. Hvis teamet ditt allerede jobber agentisk, men uten bevisst fokus på testkvalitet og testdekning, bør det stå på agendaen i nær fremtid. Ikke bare fordi testing er god skikk i seg selv, men fordi agentisk utvikling uten et solid testfundament forsterker feil raskere enn manuell utvikling noen gang gjorde.

Som en naturlig forlengelse av dette lønner det seg å rigge selve kodebasen for agenten. Hold dokumentasjon fersk og nær selve koden, ikke gjemt i en wiki agenten aldri åpner. Plasser domenespesifikk kontekst der arbeidet faktisk skjer, gi modulene tydelige grenser, og bruk filer som `CLAUDE.md` eller `AGENTS.md` til å peke agenten på hvor ting hører hjemme i kodebasen. Det sparer tokens hver gang en agent skal utforske, fordi den slipper å skanne seg fram til kontekst som kunne vært gjort eksplisitt fra start. Bonusen er at den samme jobben løfter din egen utviklingshastighet: når du rigger kodebasen for agenten, rigger du den samtidig for deg selv.

## Tokens som primitiv

Her ender jeg opp når jeg forsøker å se 12 måneder fram i tid.

Før agentisk AI var den bindende begrensningen for de fleste typer kunnskapsarbeid menneskelig oppmerksomhet. En ingeniør kunne veie N implementasjonsalternativer per uke, en PM kunne stresse-teste M posisjoneringsvinkler per kvartal, en CFO kunne kjøre K finansielle scenarier før et styremøte. På mange måter var taket timer per hode.

Tokens flytter taket fra arbeidsbegrensning til kapitalbegrensning, i hvert fall i langt større grad enn for noen få år siden. Spørsmålet blir et annet: hvor mange parallelle hypoteser har du råd til å kjøre? Hvor mange design utforsket, arkitekturvalg modellert, finansielle scenarier stresstestet, alternative kodeimplementasjoner undersøkt før lansering til produksjon?

Forskningen bekrefter retningen, men med forbehold. [DORA-rapporten for 2025](https://dora.dev/dora-report-2025/) finner en positiv sammenheng mellom AI-adopsjon og software delivery throughput, og over 80 prosent av utviklere rapporterer økt produktivitet. Men gevinstene er ujevnt fordelt: Stanford-forskning viser 35–40 prosent produktivitetsgevinst på greenfield-oppgaver mot under 10 prosent på kompleks legacy-kode. DORAs viktigste funn er at AI ikke fikser et team, den forsterker det som allerede er der. Sterke team blir sterkere, svake team får svakhetene sine forstørret. Løs kobling i arkitekturen og raske tilbakemeldingsløkker er det som gjør forskjellen. Token-disiplinen er altså ikke en automatisk vei til høyere gjennomstrømming; den er den marginale spaken for teamene som først har gjort grunnarbeidet.

Tokens er ikke en kostnadslinje, de er en _innsatsfaktor_, altså en ressurs som direkte inngår i det du produserer. En kostnadslinje kan ofte være noe du prøver å _minimere_, mens en innsatsfaktor _optimaliserer_ du for. En fabrikk prøver ikke å bruke minst mulig strøm; den optimaliserer for å bruke akkurat den strømmen som trengs for å produsere mest mulig til lavest mulig kostnad per enhet. Tokens fungerer på samme måte: spørsmålet er ikke hvor lite du kan bruke mens du jobber, men hvor mye du får ut i andre enden av det du bruker.

Den relevante KPI-en er altså ikke "kroner brukt på tokens", men **beslutningskapasitet per token**: hvor mange velinformerte valg du klarer å produsere per krone forbrukt i inferens.

![En figur i silhuett omgitt av flere transparente ekko-versjoner av seg selv](/blog/forste-dose-er-gratis/beslutningskapasitet.webp)
_Det er ikke flere timer i døgnet, men flere hypoteser per time. Beslutningskapasitet er den nye flaskehalsen. Kilde: OpenAI gpt-image-2._

## Det dette innlegget ikke handler om

Token-økonomien er et større tema enn ett blogginnlegg, og det blir bare større etter hvert som forbruket vokser. Jeg har her bevisst snevret meg inn på det utviklere selv kan gjøre i sin daglige arbeidsflyt. Det betyr at en rekke spørsmål som hører hjemme på ledelsens, plattformteamets og CFO-ens bord, ikke er behandlet her. Noen av de viktigste, slik jeg ser dem:

- **Governance-modeller.** Skal kvoter settes på organisasjonsnivå, team-nivå eller per utvikler? Hvem eier beslutningen, hvem betaler regningen, og hvem får unntakene? Det er verdt å gjenkjenne dette som et allokeringsproblem mer enn et budsjettproblem. Er det først-til-mølla fra en felles pool? Lik kvote per bruker, eller en fair-share-modell der ubrukte tokens kan høstes av power-brukere som faktisk får mer ut av dem? Skal incident-respons eller andre kritiske oppgaver ha prioritet i køen, og skal noen kjøringer kunne avbrytes hvis budsjettet røyner på? Dette er ikke nye spørsmål, men gamle problemer i ny innpakning.
- **AI-gateways og intelligent ruting.** Et proxy-lag som automatisk sender enkle oppgaver til billigere modeller, og som gir cost visibility, caching og fallback på tvers av leverandører, er på mange måter den største spaken på organisasjonsnivå. Den ligger utenfor det utvikleren kan løse alene.
- **Telemetri og datadrevet justering.** Riktige kvoter krever data: modell-bruk per team, per oppgavetype, per kostnad. Uten dashbordene blir kvotene magefølelse, og du får den dynamikken Slack-tråden i introduksjonen viser.
- **Leverandørstrategi og redundans.** Hvor avhengig vil dere være av én frontier-leverandør? Hva sier kontraktene om data-retensjon, trening og oppsigelsesfrister?
- **ROI-rapportering mot finans.** Hvordan oversetter engineering "kroner i tokens" til "kroner i produktivitet"?
- **Operasjonell motstandsdyktighet.** Hva er beredskapsplanen dagen Anthropic, OpenAI eller GitHub er nede, eller dagen en modell blir trukket tilbake? Det at tilgangen oppleves som infrastruktur betyr ikke at den faktisk _er_ det.
- **Kompetanseheving og kultur.** Hvordan trener du noen hundre utviklere på samme tid til å bli skikkelig gode på modellvalg, kontekstdisiplin og prompt-design? Rammeverket presentert av Salnikov er verdiløst hvis 80% av teamet defaulter til den dyreste modellen fordi ingen har vist dem alternativene.
- **Skygge-IT.** Når den interne kvoten brennes opp, kan utviklere ty til å betale for sine egne abonnementer for Claude eller Cursor. Dette skaper både sikkerhets-, compliance- og kulturproblemer.

## Oppsummering

Utviklingen i token-kostnad denne våren har avdekket en reell sårbarhet. Hele bransjen har bygd arbeidsprosesser oppå en pris som for mange ikke oppleves som økonomisk bærekraftig, og når regningen kommer føles plutselig hele oppsettet skjørt. Å sitte uten toppmodellene i en time føles for mange utviklere som regressivt på en måte som er ny for en utviklerprofesjon vant til at verktøyene bare ligger der til enhver tid.

Men det er noe å hente i dette også. Når tokenene koster det de koster, blir disiplinen rundt modellvalg, kontekst og automatiserte kvalitetssjekker enda viktigere å være bevisst på. Det er nettopp den jobben Salnikov peker på, og det er der verktøy som `rtk` og `caveman` gir deg konkrete grep.

Flere og flere bedrifter legger nå merke til at første dose er gratis. Resten betaler vi for. Spørsmålet er bare om vi bruker dem godt.

## Avsluttende tanker: Hvis du ikke har sett dette enda

Sannsynligheten er stor for at du legger merke til dette i løpet av sommeren 2026. Når regnestykket først lander på arbeidsgiverens bord, vil den naturlige refleksen være å snakke om _kostnad_. Det er den enkleste og mest umiddelbare rammen å ta inn over seg.

Det er der utvikleren har en jobb å gjøre, før samtalen settes i gang av noen andre. Den som flagger dette tidlig, får være med å forme rammen. Jeg mener den rammen bør være basert på _verdi per token_, ikke et generelt sparepåbud. Domino-dynamikken og horisont-poenget vi så tidligere i innlegget viser hvorfor det betyr noe: et sparepåbud forsterker feilraten gjennom hele flyten, ikke motsatt, og det er nettopp det organisasjonen må unngå.

## Ressurser

- [GitHub: Copilot is moving to usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/): GitHubs egen kunngjøring av modellskiftet 1. juni
- [MindStudio: Copilot's New Multiplier Table](https://www.mindstudio.ai/blog/github-copilot-new-multiplier-table-price-hikes): Multiplikatorhistorikken for Opus 4.7
- [Finout: Claude Opus 4.7 Pricing, The Real Cost Story](https://www.finout.io/blog/claude-opus-4.7-pricing-the-real-cost-story-behind-the-unchanged-price-tag): Den stille tokenizer-inflasjonen
- [Fortune: Microsoft reports are exposing AI's real cost problem](https://fortune.com/2026/05/22/microsoft-ai-cost-problem-tokens-agents/): Microsofts interne Claude-kansellering
- [Tom's Hardware: AI cost crisis hits tech giants](https://www.tomshardware.com/tech-industry/artificial-intelligence/ai-cost-crisis-hits-tech-giants-as-employee-tokenmaxxing-backfires-agentic-ai-eats-up-to-1000x-more-tokens-than-standard-ai-sparks-corporate-pullback-at-microsoft-meta-and-amazon): Uber-utsagnet og Goldman Sachs-anslagene
- [Maxim Salnikov: A practitioner's guide to getting more value out of AI coding](https://www.linkedin.com/pulse/practitioners-guide-getting-more-value-out-ai-coding-agent-salnikov-mhume/): Den analytiske rammen i dette innlegget
- [DORA: State of AI-assisted Software Development 2025](https://dora.dev/dora-report-2025/): Empirisk grunnlag for produktivitetsclaimet, og forbeholdene
- [METR: Measuring AI Ability to Complete Long Tasks](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/): Tidshorisonten for agentiske oppgaver, og hvordan den dobles omtrent hver syvende måned
- [Matt Pocock: Most devs don't understand how LLM tokens work](https://www.youtube.com/watch?v=nKSk_TiR8YA): Tokenisering fra grunnen
- [TokenMix: Thinking Tokens Trap](https://tokenmix.ai/blog/thinking-tokens-billing-trap-2026): Hvordan reasoning-tokens faktureres som output hos OpenAI og Anthropic
- [Finout: Anthropic API Pricing 2026](https://www.finout.io/blog/anthropic-api-pricing): Forholdet mellom input- og output-priser
- [arXiv: The Tokenizer Tax Across 24 European Languages](https://arxiv.org/html/2605.24718): Tokenizer-skatten på tvers av europeiske språk, inkludert norsk
- [rtk-ai/rtk](https://github.com/rtk-ai/rtk): Input-side filtrering
- [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman): Output-side komprimering
