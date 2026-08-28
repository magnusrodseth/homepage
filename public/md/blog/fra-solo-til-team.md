# Fra solo til team: Rigg arbeidsflyten for agenter som jobber i timevis

Published: June 2026
Originally published at Capra Consulting: https://capraconsulting.no/vare-historier/agenten-jobbet-alene-i-fire-timer-er-teamet-ditt-rigget-for-det

> Kodemodellene jobber nå i timevis av gangen. Da flytter jobben seg fra prompten til riggen rundt agenten, og den riggen hører hjemme i repoet, ikke på laptopen.

## Innledning

Den 9. juni 2026 slapp Anthropic [Fable 5](https://www.anthropic.com/news/claude-fable-5-mythos-5), en modell bygget for lange, sammenhengende oppgaver. Dette forsterker noe vi har sett nærme seg en stund: en agent kan nå jobbe selvstendig i timevis og komme tilbake med ferdig arbeid. En gren som bygger, tester grønt og venter på review, i stedet for et utkast du må reparere. Du gir den et mål, og den arbeider mot det på egen hånd.

Men når agenten kan løpe så langt på egen hånd, bommer de fleste av oss i én av to retninger. Den første er **autopilot**: overlat alt, godkjenn alt, og våkn opp tre uker senere i en kodebase ingen forstår. Den andre er **mikrostyring**: stol på ingenting, les hver diff linje for linje, og bli sittende som flaskehals i ditt eget verktøy.

![Editorial illustration, wide side-on composition. A single human figure in muted slate kneels in the foreground, laying and extending a clean railway track that stretches ahead toward a calm horizon. The track is already built behind the figure, where one small simple cart waits on the laid rails; it continues unbuilt ahead as the figure places the next section. Mood: calm, purposeful, building the way forward. Track in muted teal, the figure in soft slate, a single rust accent at the horizon as a low sun, warm cream background and sky. Flat editorial illustration with subtle paper grain texture, restrained detail and no fine line work, a single central concept, symbolic rather than literal, with generous negative space. No labels, no text, no signage inside the image. Wide 16:9 composition, magazine opinion-section feel like The Economist or New York Times opinion illustrations.](/blog/fra-solo-til-team/laying-the-rails.webp)
_Du legger skinnene; agenten kjører på dem. Det er riggen. Kilde: OpenAI gpt-image-2._

Middelveien er verken mer tillit eller mer kontroll. Den handler om **design av utviklingsprosess**. Jo lenger agenten kan løpe på egen hånd, desto mer avhenger resultatet av miljøet den løper i, ikke av den enkelte prompten du skriver. Du rigger arbeidsflyten, koder prosessen inn som skills og regler, og lar agenten løpe på skinnene du har lagt. Det er det jeg kaller å rigge kodebasen din for suksess.

Og her ligger spenningen dette innlegget skal løse opp i. Nesten alle utviklere jeg snakker med har nå et personlig oppsett: en AGENTS.md her, et par skills der, en lokal vane for hvordan de prompter. Mange har også begynt å løfte deler av det til teamnivå, i ulik grad. Det er der dette innlegget kommer inn, som en sjekkliste for hvor langt oppsettet ditt faktisk rekker.

Dette innlegget er et personlig forsøk på å fortelle om skinnene: fra spec via rigg og byggesløyfe til review og parallellitet, og til slutt det viktigste steget, fra solo til team.

## Tommelfingerregelen som binder alt

Før vi bygger noe som helst, må vi forstå én grunnsetning. Alt annet i dette innlegget er konsekvenser av den.

> **Hands-off rekker nøyaktig så langt som agenten kan verifisere seg selv.**

Hvorfor? Fordi modellen som vurderer om arbeidet er ferdig, bare ser det som havner i samtalekontekst. Den ser ikke skjermen din (før det havner i kontekst), ikke intensjonen din, ikke det du "egentlig mente". Hvis testresultatet, typesjekken eller skjermbildet ikke finnes i konteksten, finnes det ikke for agenten.

Konsekvensen er at "ferdig" må være noe en maskin kan observere. En vag følelse som "brukeropplevelsen er bra" holder ikke alene, men det betyr ikke at opplevelse er umålbar. Definerer du akseptkriterier (acceptance criteria) for hva "bra" faktisk betyr, og gir agenten verktøy til å sjekke dem, for eksempel skjermbilder eller Playwright-snapshots i nettleseren, blir også det observerbart. "Føles bra" blir til "skjermbildet matcher designet og testene som dekker flyten passerer", og det kan en maskin faktisk verifisere.

![Editorial illustration. A single small figure rendered in muted teal stands at the center holding a lantern that casts a soft circular pool of warm light on the ground around them. Inside the circle everything is crisp and visible; right at the edge the light fades abruptly into flat darkness. The figure faces the boundary where the light stops, about to step toward it. Mood: contemplative, a quiet limit. Inside the light warm cream and a soft rust glow; beyond the edge deep muted slate. Flat editorial illustration with subtle paper grain texture, restrained detail and no fine line work, a single central concept, symbolic rather than literal, with generous negative space. No labels, no text, no other objects inside the image. Magazine opinion-section feel like The Economist or New York Times opinion illustrations.](/blog/fra-solo-til-team/self-verification-boundary.webp)
_Hands-off rekker akkurat så langt som lyset. Agenten kan bare jobbe selvstendig der den ser sin egen suksess. Kilde: OpenAI gpt-image-2._

Alt som følger i dette innlegget kan leses som svar på ett spørsmål: hvordan flytter vi den grensen lenger ut? Spec-en gjør målet observerbart. Riggen gir agenten øyne og hender. Reviewsløyfen fanger det agenten ikke ser selv. Og teamsteget gjør at grensen flyttes for alle, ikke bare for deg.

## Spec-en: Start i den menneskelige enden

Det første skinnesporet legges før agenten i det hele tatt starter. En god oppgave er definert av verifiserbare **akseptkriterier (acceptance criteria)**: konkrete betingelser agenten selv kan sjekke, som "testene i `auth/` passerer og endepunktet returnerer 401 uten gyldig token". Hele disiplinen rundt dette dekket vi i [Spec-Driven Development](/blog/spec-driven-development), så her nøyer jeg meg med det som er nytt.

### Press spec-en før koden

Min mest verdifulle vane er det jeg kaller **grill-me-fasen**: en egen modus der agenten nekter å skrive kode og i stedet intervjuer deg. Den stiller spørsmålene du ikke har tenkt på. Dette er noe annet enn å be agenten "still meg noen spørsmål". Claude Code har et innebygd "Ask User"-verktøy, men det er bare en primitiv for å stille et spørsmål. Grill-me er grundig og uttømmende: den jobber seg gjennom hele beslutningstreet og gir seg ikke før dere har en delt forståelse. Den kan gjerne bruke Ask User-verktøyet underveis, det er ikke enten eller, men i praksis sier jeg alltid "grill meg" heller enn "still meg spørsmål".

Ti minutter med grundige spørsmål før koding tvinger meg til å være mentalt påskrudd, og sparer timer med feilrettet arbeid etterpå. Det er billigere å finne hullene i spec-en mens den fortsatt er tekst. Den samme øvelsen er minst like nyttig sammen med teamet: bruk grillingen til å samkjøre dere om edge-casene før noen setter i gang med implementeringen.

### Hent oppgaven fra en issue, ikke fra chatten

En oppgave som bare finnes i en chat-melding er flyktig. Den forsvinner når kontekstvinduet komprimeres, og den kan ikke deles. Trekk i stedet oppgaven fra en issue i prosjektstyringsverktøyet ditt, enten det er GitHub Issues, Jira eller noe annet: der ligger kravene, diskusjonen og akseptkriteriene på ett varig, delbart sted. Agenten leser issuen, du leser den samme issuen, og "hva var det vi egentlig ble enige om?" har alltid et svar.

Gi agenten CLI-en til verktøyet, og "skillify" hvordan dere bruker det. Hos kunden jeg jobber for nå, har vi kodet inn som skills hvordan vi vil at issues skal opprettes, hvordan pull requests skrives, og hvordan en agent administrerer kanban-tavlen vår i GitHub Projects. Det samme lar seg gjøre i Jira; prinsippet er uavhengig av verktøy.

Gevinsten er delt kontekst. Spec, diskusjon, akseptkriterier og ferske funn dokumenteres som kommentarer på issuen, slik at hele teamet kan lese dem i sanntid og mate dem inn i sin egen agent. Tatt helt til det ekstreme: når designerne og forretningsutviklerne også har agenter koblet til de samme verktøyene, får de den samme rike konteksten som deg. Det er en fordel for hele teamet.

### Skills: "Slik gjør vi det her"

Skills er kodifisert prosess: små, navngitte instruksjonsfiler som beskriver hvordan en bestemt type oppgave skal gjøres i akkurat dette prosjektet.

Mekanismen som gjør dette levende er en skill kalt `/write-a-skill`, en av skillsene i [Matt Pococks skill-sett](https://github.com/mattpocock/skills) jeg bruker daglig. Tanken bak er at når du finner ut av noe, fikser du det ikke bare én gang. Du koder oppdagelsen inn som en skill, slik at den blir permanent for deg og resten av teamet.

En kort merknad: mange har hørt om Anthropics [Skill Creator](https://www.skills.sh/anthropics/skills/skill-creator), men færre kjenner Matt Pococks `/write-a-skill`. For meg er dette ren personlig preferanse, men Matt har bygget seg et godt rykte med skarpe, presise og konsise skills, og det smitter over på `write-a-skill`. Bruk gjerne den du selv foretrekker; begge gjør jobben.

I konteksten av skills er det dette som er den mentale modellen: **institusjonaliser arbeidsflyten du gjentar igjen og igjen**. Hold øye med hva du retter på agenten for, uke etter uke. Og vær oppmerksom på det du vet du kommer til å gjøre mange ganger: opprette en issue, kartlegge hvordan data flyter fra klient til server til database og tilbake, eller slå opp intern dokumentasjon i en enterprise-kontekst. Dette er gode kandidater for `write-a-skill`.

## Riggen agenten jobber i

Spec-en sier hvor agenten skal. Riggen avgjør om den kommer frem. En agent er aldri bedre enn miljøet den jobber i, og miljøet har fire lag.

![Editorial illustration. A single sturdy, orderly scaffold frame stands alone at the center, clean, geometric and structural, and completely empty inside. No figure, no person, no desk, no objects inside or around it. Mood: orderly, solid, a structure standing ready. The scaffold in muted teal with one small rust accent, on a warm cream background. Flat editorial illustration with subtle paper grain texture, restrained detail and no fine line work, a single central concept, symbolic rather than literal, with generous negative space. No labels, no text inside the image. Magazine opinion-section feel like The Economist or New York Times opinion illustrations.](/blog/fra-solo-til-team/the-rig-scaffold.webp)
_Riggen er stillaset: strukturen som står klar før agenten setter i gang. Kilde: OpenAI gpt-image-2._

### Lag 1: Kodebase-rigging

Raske tester, tydelige scripts (`pnpm test`, `pnpm typecheck`, `pnpm lint`) og en god AGENTS.md som forklarer konvensjonene gir agenten en tilbakemeldingssløyfe den kan stole på.

Et nyansert poeng om tester: det er ingenting i veien for å ha et stort, grundig sett med enhetstester på tvers av hele kodebasen, tvert imot gir det en grad av trygghet. Det viktige er å fortelle agenten hvordan den kjører et relevant utvalg. Dersom hele testsuiten tar to minutter å kjøre og agenten endrer én fil i backend, holder det å kjøre testene som dekker akkurat den koden underveis, og la hele suiten kjøre i CI. Slik beholder du både rask iterasjon lokalt og full dekning på GitHub.

Et ord om AGENTS.md: du kan ha flere av dem, én i roten og egne i undermapper. Men ikke fyll den med alt. Dagens modeller er blitt veldig gode til å utforske en kodebase på egen hånd, så det agenten kan finne selv, bør du la den finne selv; det sparer tokens. Hold AGENTS.md slank, og bruk den til det agenten ikke enkelt kan slå opp ved å lese koden: hva er dette produktet, og hvorfor bygger vi det? Den slags kontekst hører hjemme der.

### Lag 2: Riktig tilgang og scopes

Prøv så godt du kan å gi agenten færrest mulig rettigheter (least privilege), altså akkurat de tilgangene oppgaven krever for å gjøre jobben. Dette er sikkerhetsarbeidet fra [Alle bruker AI-agenter. Hvem passer på sikkerheten?](/blog/sikkerhet-i-agentenes-tidsalder), anvendt på riggen.

Samtidig bør ikke agenten møte stadige hindre der den må stoppe og be om tilgang. Det dreper hele poenget med langløpende agenter. Husk at disse modellene i stor grad er trent til å være handlekraftige; med godt definerte mål, og tydelige kriterier for hva den ikke skal gjøre, følger de føringene dine godt. Du kan aldri være helt sikker, men det er en god tommelfingerregel.

### Lag 3: Hooks og path-baserte regler som håndhevelse

Hooks er håndhevelse. Et hook er en kommando som kjører automatisk på en hendelse: etter hver filendring, før en commit, eller når et bestemt verktøy kalles. Endrer agenten en komponent under `frontend/ui/`, kan et hook kjøre formattering og lint på den med en gang. Mangler en commit tester, kan et hook stoppe den. Reglene håndheves av maskinen, ikke av agentens hukommelse.

Path-baserte regler tar dette videre på instruksjonssiden. Med `.claude/rules/` legger du instruksjoner i egne filer som bare lastes inn når agenten jobber med filer som matcher et mønster. En regel scopet til backend-API-et dukker bare opp når agenten åpner en fil der, og fyller ikke kontekstvinduet resten av tiden:

```markdown
---
paths:
  - "apps/backend/api/**/*.ts"
---

# Regler for API-laget

- Alle endepunkter validerer input.
- Bruk standard feilresponsformat.
- All datatilgang går gjennom repository-laget, aldri rå SQL i handlers.
```

Poenget er at konvensjonene møter agenten akkurat når de er relevante. En frontend-regel trigger på frontend-filer, en API-regel på API-filer, og agenten kan ikke trampe ned arkitekturen i et hjørne av kodebasen den sjelden ser. Du kan lese mer i [Claudes dokumentasjon om rules](https://code.claude.com/docs/en/memory#organize-rules-with-claude/rules/).

Disse mekanismene har sin plass, men det er ikke åpenbart at du trenger dem fra dag én. Start enkelt, og legg til håndhevelse først der du faktisk ser agenten gjøre samme feil om igjen.

### Lag 4: MCP-er og CLI-er som øyne og hender

Jeg holder oppsettet mitt ganske lite og enkelt. Her er MCP-ene og CLI-ene jeg bruker hver dag, ment som et utgangspunkt: de nødvendige byggeklossene de fleste som vil jobbe agentisk bør kjenne til og vurdere mot egen arbeidsmåte.

- **[Context7](https://github.com/upstash/context7)** gir ferske docs, slik at agenten ikke koder mot et API som ble endret etter treningsdataene.
- **[Exa](https://exa.ai/docs/reference/exa-mcp)** gir websøk, slik at agenten kan slå opp ting på det åpne nettet i stedet for å gjette.
- **[grep.app](https://github.com/ai-tools-all/grep_app_mcp)** søker i ekte kode på tvers av offentlige repoer, så agenten kan se hvordan et API faktisk brukes i praksis. Her kan man eventuelt lage seg en skill for å klone et GitHub-repository ned i `/tmp` på maskinen sin for å utforske det, smak og behag.
- **[Figma](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)** gir designets fasit, slik at "lik designet" blir noe agenten kan slå opp i stedet for å gjette.
- **[Playwright](https://github.com/microsoft/playwright-cli)** lar agenten se sin egen UI: navigere, klikke og ta skjermbilder av det den nettopp bygde. For applikasjoner som krever innlogging (interne dashboards etc.) er det viktig å bake inn hvordan man logger inn med en testbruker i skillen som beskriver hvordan man bruker `playwright-cli` i prosjektet ditt.

Et viktig poeng kobler dette tilbake til skills: en skill er oppskriften som beskriver *hvordan* du bruker en MCP eller CLI, så agenten ikke trenger å lære det på nytt hver gang. Ta det å opprette en GitHub-issue. Du har enten GitHub-MCP-en eller GitHub-CLI-en, men måten *dere* oppretter, oppdaterer og lukker issues på, koder du inn som en skill. Da gjør agenten det likt hver gang, uten at du må forklare verktøyet på nytt.

Legg merke til mønsteret: alle disse flytter verifiseringsgrensen fra loven over. Med Playwright i riggen blir "knappen er synlig og klikkbar" observerbart av en maskin.

### Sandboxing

Isolasjon kommer i trinn, og du trenger sjelden alle. **Git worktree** løser isolasjon på fil-laget: hver agent får sin egen arbeidskopi av repoet, så to agenter aldri skriver i samme fil. **Docker** løser isolasjon ved kjøretid: egen prosess, eget filsystem, eget nettverk.

Og her møter du fort et problem, nemlig portkonflikter. Fem parallelle agenter med hver sin dev-server vil alle ha port 3000. Et verktøy som løser nettopp dette er [portless](https://github.com/vercel-labs/portless) fra Vercel. I stedet for at du sjonglerer portnumre, gir det hver app en stabil adresse som `myapp.localhost`, og en lokal proxy ruter trafikken til riktig prosess bak kulissene.

Selve verktøyet er mindre viktig enn prinsippet det illustrerer: alt som kan kollidere mellom parallelle agenter, må håndteres på forhånd. Porten er bare et håndfast eksempel.

## Byggesløyfa

Med spec og rigg på plass kan vi endelig slippe agenten løs, på ordentlig. Sløyfen ser slik ut: agenten implementerer, kjører testene, leser feilene, retter, og gjentar til fullføringsbetingelsen fra issuen din er observert oppfylt i konteksten.

De fleste ganger trenger du ikke mer seremoni enn å peke på en godt spesifisert issue. Lim inn URL-en, og hele oppgaven, krav, diskusjon og akseptkriterier, lastes inn i konteksten agenten jobber mot. Da er det ofte nok å si "implementer denne".

`/goal` hører hjemme i det tøffere tilfellet: et underspesifisert mål, der du vil at agenten selv trekker opp en verifiserbar fullføringsbetingelse før den begynner, kjører i auto-modus og verifiserer seg selv hele veien. Det er power-user-varianten.

![Editorial illustration, wide composition. A single continuous looping rail, like a closed toy-train track, forms one clean even oval on a flat surface. One small simple cart sits on the track, aligned along the rail. At one point the loop has a small open gate where the track could exit outward into open space. Nothing else: no fence, no enclosure, no surrounding rails, no other objects. Mood: controlled, patient momentum within bounds. Track and cart in muted teal, one rust accent on the gate, warm cream background. Flat editorial illustration with subtle paper grain texture, restrained detail and no fine line work, a single central concept, symbolic rather than literal, with generous negative space. No labels, no text, no numbers inside the image. Wide 16:9 composition, magazine opinion-section feel like The Economist or New York Times opinion illustrations.](/blog/fra-solo-til-team/build-loop-guardrails.webp)
_Byggesløyfa med rekkverk. Agenten går runde på runde mot målet, innenfor harde grenser, med én vei ut. Kilde: OpenAI gpt-image-2._

For det repetitive finnes `/loop`: samme oppgave anvendt på mange tilfeller, som eksempelvis "migrér én og én komponent til det nye designsystemet, kjør testene mellom hver". Kjedelig for et menneske, perfekt for en agent med riktig rigg rundt seg.

## Adversarial review: Modellen som skrev koden, ser ikke sine egne feil

Modellen som skrev koden er for tett på den til å se sine egne feil. Den vil bekrefte sine egne antagelser, akkurat som vi gjør når vi korrekturleser vår egen tekst.

Løsningen er "adversarial review": en egen review-agent med ett oppdrag, å finne feil i arbeidet.

![Editorial illustration, symmetric composition. A single sheet of paper stands upright at the exact center of the frame. Two identical magnifying glasses approach it from opposite sides, left and right, each examining the same sheet from its own angle, mirror images of each other but in two different colours to suggest different origins. Mood: rigorous scrutiny, balanced tension. One magnifying glass muted teal, the other rust; the paper soft slate-grey on a warm cream background. Flat editorial illustration with subtle paper grain texture, restrained detail and no fine line work, a single central concept, symbolic rather than literal, with generous negative space. No labels, no text on the paper. Magazine opinion-section feel like The Economist or New York Times opinion illustrations.](/blog/fra-solo-til-team/adversarial-review-loop.webp)
_Adversarial review. Samme arbeid gransket fra to uavhengige hold, og begge må si ja før et menneske merger. Kilde: OpenAI gpt-image-2._

Tre regler gjør sløyfen effektiv:

1. **Separate kontekstvinduer.** Revieweren skal ikke arve forfatterens antagelser. Den leser diffen og spec-en med blanke ark.
2. **Helst ulike leverandører.** Tanken er at to modeller fra samme leverandør kan dele blindsoner, fordi de er trent på liknende data med liknende metoder. En reviewer fra en annen modellfamilie ser i det minste med andre øyne. Du kan for eksempel kode med en Claude-modell og la en GPT-modell ta reviewen, eller la både en GPT-modell og en Claude-modell med fersk kontekst gjennomgå arbeidet.
3. **N runder, begge må godkjenne.** Forfatteren retter, revieweren ser på nytt. Ingenting shippes før begge sier ja.

Det kan også lønne seg å kjøre sløyfen flere ganger. Én review-runde har en blindsone, akkurat som én testkjøring av et ikke-deterministisk system sier lite. To eller tre uavhengige gjennomganger kan fange merkbart mer.

Selve sløyfen kan du i tillegg gjøre om til en skill, eller "skillifye", som jeg stadig oftere finner meg selv i å si. Claude shipper en `/loop`-skill som kjører en kommando om og om igjen, og samme idé lar deg bygge en loop som går gjennom reviewerens anbefalinger og adresserer, forkaster eller implementerer hver enkelt, før et menneske i det hele tatt ser på det. Revieweren kan være Claude i CI, [Greptile](https://www.greptile.com/), [GitHub Copilot](https://github.com/features/copilot) i CI, eller noe helt annet. Da blir den første review-runden enda mer autonom. For å være ærlig er dette et utpreget power-user-tilfelle, og passer ikke nødvendigvis enhver arbeidsflyt eller enhver oppgave, men det kan være lurt å være klar over at det er mulig.

Men det finnes en grense reviewen aldri kan flytte:

> Reviewsløyfen fanger **implementasjonsfeil**, ikke **kravfeil**. Hvis spec-en er gal, vil to agenter i skjønn enighet bygge feil ting, grundig verifisert.

Det er derfor innlegget startet i den menneskelige enden. Ingen mengde automatisert review redder en dårlig spec. Din viktigste jobb ligger før koden.

## Parallellitet og verktøy

Når én agent på skinner fungerer, er fristelsen å kjøre flere på en gang. Det går fint, men med noen klare begrensninger du må kjenne til.

**Kjernen er git worktrees.** [Conductor](https://www.conductor.build/), [cmux](https://github.com/manaflow-ai/cmux) og [OpenCode Workspaces](https://opencode.ai/) er alle praktiske innpakninger rundt det samme primitivet: én git worktree per agent, hver med sin egen arbeidskopi av repoet. Det er worktreet som gjør parallelliteten mulig; verktøyene gir deg bare et hyggeligere grensesnitt mot det.

**Taket er fortsatt deg.** Erfaringsmessig klarer du å holde styr på 2-4 parallelle agenter før *du* blir flaskehalsen i review. Hver agent produserer arbeid som fortjener et kritisk blikk, og blikket ditt skalerer ikke. Mer parallellitet uten mer review-kapasitet er bare en raskere vei ned i autopilot-grøfta.

Under lokal utvikling er det noen ting som er særlig viktig å være bevisst på før du parallelliserer dem:

- **Lockfiler** (`pnpm-lock.yaml` og venner): parallelt arbeid som endrer avhengigheter samtidig, gir konflikter i selve lockfilen.
- **Databasemigrasjoner** forutsetter at hver git worktree kan kjøre sin egen database. Gjør de det, vil parallelle migrasjoner lett kollidere i migrasjonshistorikken, noe du må rydde opp i ved PR- eller review-tid.
- **Store typerefaktoreringer** treffer hele kodebasen og danner bølger gjennom alt. Ikke alt må parallelliseres; noen oppgaver passer rett og slett bedre sekvensielt. Skal du gjøre en stor refaktorering med ringvirkninger overalt, er det ofte best å la den stå alene heller enn å kjøre annet arbeid oppå den samtidig.

Og den siste grensen, uansett hvor mange agenter du kjører: **alt stopper ved PR-en**. Aldri auto-merge. Agenten åpner pull requesten; et menneske trykker på knappen. Den menneskelige godkjenningen er kontrollpunktet som gjør resten av autonomien forsvarlig.

## Avslutning

Det er her alt vi har bygget skal knyttes sammen. Riggen for AI-agentene, AGENTS.md, skills, MCP-konfigurasjon og egne agent-definisjoner, hører til i versjonskontroll, ikke bare på din egen maskin. Det er det som gjør den tilgjengelig for resten av teamet: den ene som finner ut noe smart, deler det med en commit, og dagen etter gjør agentene hos alle utviklere det på samme måte.

```text
repo/
├── AGENTS.md              # Konvensjoner, arkitektur, hva og hvorfor vi bygger
├── .mcp.json              # MCP- og verktøyoppsett
└── .claude/
    ├── agents/            # Egne agent-definisjoner
    └── skills/            # Oppskrifter, ett domene per skill
```

![Editorial illustration, wide composition. A single open book lies flat at the center of the frame. From it several clean parallel rails radiate straight outward in different directions across the surface. At the end of each rail sits one small simple cart, and each cart is oriented along its own rail, pointing outward away from the book, so every cart runs in line with the direction of its track; no cart sits sideways or perpendicular to its rail. Balanced and radial, emphasizing one shared origin feeding many. Mood: collective, a shared foundation. Rails in muted teal, carts in soft slate, one rust accent on the central book, warm cream background. Flat editorial illustration with subtle paper grain texture, restrained detail and no fine line work, symbolic rather than literal, with generous negative space. No labels, no text inside the image. Wide 16:9 composition, magazine opinion-section feel like The Economist or New York Times opinion illustrations.](/blog/fra-solo-til-team/commit-the-rig.webp)
_Commit riggen. Når oppsettet flytter fra laptopen til repoet, løper hele teamet på de samme skinnene. Kilde: OpenAI gpt-image-2._

Verken autopilot eller mikrostyring, altså. Men ingeniøren som går fra å legge hver stein selv til å designe skinnene agenten løper på, koder prosessen inn som skills og regler, og lar agenten løpe.

Retningen videre er tydelig: mer parallellitet, lengre kjøringer, "fabrikker av agenter". Men jo mer av *hvordan* som automatiseres, desto mer verdifullt blir det som ikke flytter seg: menneskelig dømmekraft over *hva* som skal bygges, og *hvorfor* det skal bygges.

Det bringer oss tilbake til der vi startet. Når agentene kan løpe så langt på egen hånd, er det ikke nok å gi dem en god prompt; vi må rigge både kodebasene og måten vi jobber på rundt dem, uten å gi slipp på verifisering, akseptkriterier, testing og menneskelig smak. Dette innlegget har vært mitt forsøk på å destillere hvordan jeg selv jobber, alene og i team, i hobbyprosjekter og i enterprise, ned til en slags sjekkliste. Les den gjerne med en penn i hånden: kryss av det du allerede gjør godt, og finn det ene stedet, lite eller stort, der du eller teamet ditt kan ta neste steg.

## Ressurser

- [Spec-Driven Development](/blog/spec-driven-development) -- Hvordan skrive krav som agenter faktisk forstår
- Agentic Mindset -- Fra skriver til dirigent
- Context Engineering -- Konteksthygiene og den smarte sonen
- Den AI-native utvikleren -- Fra Conductor til Orchestrator
- [Alle bruker AI-agenter. Hvem passer på sikkerheten?](/blog/sikkerhet-i-agentenes-tidsalder) -- Sandboxing, scopes og secrets
- [Testing og evaluering av agenter](/blog/testing-og-evaluering-av-agenter) -- Evaluatoren ser bare transkriptet

### Verktøy og kilder

- [Claude Fable 5 og Mythos 5](https://www.anthropic.com/news/claude-fable-5-mythos-5) -- Anthropics lansering av Fable 5, 9. juni 2026
- [Matt Pococks skills](https://github.com/mattpocock/skills) -- Skill-settet med blant annet `/write-a-skill`
- [Claude Code: organiser regler med `.claude/rules/`](https://code.claude.com/docs/en/memory#organize-rules-with-claude/rules/) -- Path-baserte regler i kontekst
- [Context7](https://github.com/upstash/context7) -- Ferske docs som MCP
- [Exa](https://exa.ai/docs/reference/exa-mcp) -- Websøk som MCP
- [grep.app MCP](https://github.com/ai-tools-all/grep_app_mcp) -- Kodesøk på tvers av offentlige repoer
- [Figma MCP](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server) -- Designets fasit som MCP
- [Playwright CLI](https://github.com/microsoft/playwright-cli) -- Token-effektiv UI-automatisering for agenter
- [portless](https://github.com/vercel-labs/portless) -- Stabile lokale adresser uten portkollisjon (Vercel Labs)
- [Conductor](https://www.conductor.build/) -- Parallelle agenter i git worktrees på Mac
- [cmux](https://github.com/manaflow-ai/cmux) -- Terminal for parallelle kodeagenter
- [OpenCode](https://opencode.ai/) -- Åpen kildekode-agent for terminalen
- [Greptile](https://www.greptile.com/) -- AI-kodegjennomgang med full kodebasekontekst
