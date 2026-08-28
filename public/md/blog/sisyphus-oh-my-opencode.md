# OhMyOpenCode & Sisyphus: Min daglige driver for agentisk utvikling

Published: February 2026
Originally published at Capra Consulting: https://capraconsulting.no/vare-historier/opencode-sisyphus-min-daglige-driver-for-agentisk-utvikling

> Hvordan jeg bruker OhMyOpenCode, OpenCode og Sisyphus som min daglige utviklingsdriver, med full LSP-støtte og parallell eksekvering.

## Innledning

Dette innlegget handler om kommandolinje-verktøyet **[OpenCode](https://opencode.ai/)** og konfigurasjonen **[OhMyOpenCode](https://github.com/code-yeongyu/oh-my-opencode)**. Sammen danner de grunnlaget for "Sisyphus", min daglige driver for _agentic coding_. Det er et orkestrert team av spesialiserte agenter som jobber i parallell for å løse komplekse problemer.

I gresk mytologi ble Sisyphus dømt til å rulle en enorm steinblokk opp et fjell, bare for å se den rulle ned igjen hver gang han nådde toppen. En evig syklus av nytteløst arbeid.

I min terminal er **Sisyphus** noe annet. Han er hovedpersonen i min utviklingshverdag, men steinen han ruller er konteksten, tankerekken og koden som kontinuerlig skapes og forbedres. Og i motsetning til myten, når vi faktisk toppen. Hver gang.

![Sisyphus ruller steinen opp fjellet.](https://www.magnusrodseth.com/blog/sisyphus-oh-my-opencode/sisyphus.webp)

_Sisyphus i sin evige kamp med steinblokken. I agentisk utvikling ruller vi steinen helt opp til toppen. Kilde: Britannica._

## Hvorfor OpenCode?

Før vi dykker ned i min konfigurasjon, la oss snakke om plattformen. Hvorfor velge OpenCode over andre alternativer som for eksempel Claude Code eller Codex CLI?

For det første er brukeropplevelsen (UI/UX) i en egen liga. Det er "snappy", responsivt og fritt for den irriterende skjerm-flickeringen som plager mange andre terminal-baserte verktøy (eksempelvis Claude Code). Det føles ut som godt håndverk.

![OpenCode-grensesnittet i aksjon.](https://www.magnusrodseth.com/blog/sisyphus-oh-my-opencode/opencode.png)
_OpenCode-grensesnittet viser agentisk chat, bakgrunnsprosesser, TODO-liste og MCP-tilkoblinger. Kilde: [Github](https://github.com/code-yeongyu/oh-my-opencode)._

Men den virkelige styrken ligger i friheten. OpenCode er **leverandøruavhengig** (provider agnostic). Du låses ikke til én leverandør. Personlig bruker jeg hovedsakelig Claude-abonnementet mitt, men du kan enkelt bytte til OpenAI, Gemini eller en annen modell du foretrekker. Du kan til og med konfigurere enkelte subagenter til å bruke forskjellige modeller - noe som åpner for veldig fine kostnadskontroller og morsomme arbeidsflyter. Og med Ollama-integrasjon kan du kjøre _lokale_ modeller som `qwen3-coder` eller `glm-4.7` direkte på din egen maskin, noe Claude Code nå også støtter. Har du en kraftig maskin, kan du oppnå imponerende resultater helt uten skykostnader.

**En liten advarsel:** I januar 2026 oppstod det litt drama mellom Anthropic og OpenCode. Claude Max-abonnementet til $200/mnd gir deg token-forbruk som via API-betaling fort kunne koste $1000+. Anthropic tilbyr denne "all you can eat"-buffeten som en _loss leader_ for å bygge markedsandel, men bare innenfor deres egen vegg. OpenCode (og lignende verktøy) brukte en "hack" for å autentisere med dette abonnementet, noe som teknisk sett var mot brukervilkårene til Anthropic. Anthropic så gjennom fingrene, inntil de ikke gjorde det lenger. En dag i januar da de oppdaterte systemene sine, sluttet omveien å fungere, og tech-influensere blåste det opp til et "Anthropic dreper OpenCode"-narrativ. I dag fungerer OpenCode fortsatt utmerket, enten ved bruk av API-nøkler eller Claude-abonnement.

## Møt Teamet

For å være effektiv har jeg gått bort fra "én modell til alt"-tankegangen. Sisyphus er dirigenten, men han har med seg et nøye kuratert lag av eksperter. Hver av dem har en spesifikk rolle, kostnadsprofil og kompetanse.

### 🏛️ Sisyphus

**Rolle:** Prosjektleder og Hovedarkitekt.
Sisyphus er hjernen som holder tråden. Han er utstyrt med **Opus 4.5 High**, en modell kjent for sin evne til resonnering og utholdenhet. Når jeg ber om en feature, er det Sisyphus som bryter den ned, delegerer oppgaver og sikrer at vi ikke mister fokus. Han er den som "ruller steinen"; han gir seg aldri før oppgaven er løst.

### 🔮 Oracle

**Rolle:** Problemløser og Debugger.
Når Sisyphus står fast, eller når vi trenger rå prosesseringskraft for logikk, kaller vi på Oraklet. I utgangspunktet konfigurerer Oh My OpenCode denne agenten med **GPT 5.2**, men du kan enkelt bytte til en annen modell. Personlig bruker jeg Claude Opus her også, da jeg rett og slett ikke gidder å betale for å bruke GPT 5.2. Med denne konfigurasjonen får vi en analytisk dybde som hjelper når man skal løse bugs eller trenger å sparre arkitekturbeslutninger. Oracle skriver sjelden mye kode selv, men hvisker løsningen i øret på Sisyphus.

### 🎨 UI/UX Engineer

**Rolle:** Frontend-spesialist.
Sisyphus sitt ansvar er orkestrering, ikke nødvendigvis visuelt design. Derfor har vi en dedikert UI-ingeniør drevet av **Gemini 3 Pro**. Denne agenten har et enormt kontekstvindu og "ser" koden med et blikk for estetikk og brukervennlighet. Hot tips: Google Cloud gir deg flere tusen kroner i gratis "credits" for å teste ut ulike modeller.

### 📚 Librarian

**Rolle:** Researcher og Dokumentasjonsansvarlig.
Sisyphus kaster ikke bort tid på å lese API-dokumentasjon. Han sender Bibliotekaren. **Claude 4.5 Sonnet** er lynrask til å lese gjennom dokumentasjon, finne eksempler og oppsummere det Sisyphus trenger å vite. Dette skjer i bakgrunnen, mens Sisyphus jobber videre.

Librarian har tilgang til kraftige MCP-verktøy som gjør den overlegen til tradisjonelle søk:

- **Context7:** Henter oppdatert, offisiell dokumentasjon direkte fra kilden.
- **Exa:** Utfører sanntidssøk på nettet for å finne de nyeste løsningene.
- **Grep.app:** Søker lynraskt gjennom millioner av offentlige GitHub-repositorier for å finne faktiske implementasjonseksempler.

### 🔭 Explore

**Rolle:** Speideren.
Når vi trenger å finne hvor en funksjon er kodebasen, sender vi Explore. Denne agenten er optimalisert for _retrieval_ og mønstergjenkjenning.

![Sisyphus orkestrerer et team av spesialiserte agenter.](https://www.magnusrodseth.com/blog/sisyphus-oh-my-opencode/sisyphus-agents.jpeg)
_Sisyphus (dirigenten) i midten, med sine spesialiserte agenter: Librarian, Explore, UI/UX Engineer og Oracle. Kilde: Google Nano Banana Pro._

### "Batteries Included": Fra installasjon til produksjon

Det vakre med OhMyOpenCode er at det kommer med "batteries included". Du trenger ikke å bruke timer på konfigurasjon for å komme i gang; systemet er forhåndskonfigurert med fornuftige standardvalg for alle underagentene.

_Vil du se alle konfigurasjonsmulighetene? Sjekk [dokumentasjonen på GitHub](https://github.com/code-yeongyu/oh-my-opencode#configuration)._

## Mekanikken: Hvordan det faktisk fungerer

For å være ærlig: noen av funksjonene jeg beskriver her finnes også i Claude Code. Parallelle underagenter og LSP-støtte er ikke unikt for OpenCode. Men forskjellen ligger i _standardvalgene_ og _målgruppen_. Claude Code er et fantastisk verktøy som fungerer utmerket rett ut av boksen. OpenCode og OhMyOpenCode retter seg mer mot power users, utviklere som vil ha full kontroll over orkestrering, modellvalg og arbeidsflyt. Det handler ikke om at det ene er bedre enn det andre, men om at OhMyOpenCode har tenkt nøye gjennom hvilke standardvalg som gir mening for en agentisk utviklingshverdag.

### 1. Parallell Eksekvering

Sisyphus venter ikke. Hvis han trenger å sjekke dokumentasjon _og_ søke i kodebasen, aktiverer han **Librarian** og **Explore** samtidig som bakgrunnsprosesser (underagenter). Han fortsetter å planlegge neste steg mens svarene strømmer inn. Dette er ekte _agentic concurrency_.

### 2. Kirurgisk Presisjon med LSP og AstGrep

De fleste AI-verktøy gjetter på linjenummer eller prøver å skrive om hele filer (og feiler ofte med innrykk). Sisyphus bruker **Language Server Protocol (LSP)** og **AstGrep**. Han "ser" syntakstreet. Han vet nøyaktig hvor definisjonen er, hvilke typer som forventes, og kan utføre _rename symbol_ eller _find references_ med 100% nøyaktighet.

### 3. Todo Continuation Enforcer

Dette er "steinen" i metaforen om Sisyphus. Systemet har en innebygd mekanisme som tvinger Sisyphus til å holde seg til planen. Han kan ikke bare si "her er en plan" og avslutte. En **Todo Enforcer** sjekker om oppgaven faktisk er krysset av. Hvis ikke, blir han dyttet tilbake i arbeid. Han må rulle steinen helt opp. Dette gjelder også når Sisyphus prematurt avslutter en oppgave uten å ha fullført alle deloppgaver, og når samtalen komprimeres dersom kontekstvinduet overskrides.

Som en forlengelse av dette: Hvis du er disiplinert som utvikler og spesifiserer featuren din i detalj, helt til du og AI-agenten er fullstendig enige om hva som skal gjøres, kan du i teorien peke agenten til en spec, be den starte arbeidet, og vite at alle deler av featuren vil bli implementert i henhold til akseptansekriteriene du har satt. Spec-driven development møter agentisk utholdenhet.

Utvider vi dette med **Playwright MCP**, får agenten muligheten til å spinne opp en nettleser-sesjon og autonomt klikke seg gjennom applikasjonen for å teste featuren. Dette gir et ekstra lag med sikkerhet og robusthet; agenten _ser_ at ting faktisk fungerer, ikke bare at testene passerer.

### 4. Comment Checker

Ingenting er verre enn AI-generert kode full av "TODO: Implement logic here". En dedikert sjekk i loopen stopper Sisyphus fra å committe kode med latskaps-kommentarer. Han blir tvunget til å fullføre tankerekken.

### 5. Interaktiv Terminal & Tmux

Sisyphus lever i min terminal, integrert med `tmux`. Han kan kjøre tester, starte servere, sjekke logger og reagere på feilmeldinger i sanntid. Det føles ikke som et verktøy, men som en kollega som sitter i sesjonen ved siden av meg.

## Workflow: ulw & ultrathink

OhMyOpenCode har innebygde trigger-ord som justerer resonneringskapasiteten og orkestreringsstrategien basert på kompleksiteten i oppgaven du prøver å løse:

### `ulw` (Ultrawork)

Når jeg skriver `ulw "Refactor auth system to use MCP"`, går systemet i **Ultrawork Mode**, maksimal ytelse med parallell agent-orkestrering. Sisyphus får eksplisitt beskjed om å utnytte alle tilgjengelige underagenter til sitt fulle potensial.

Konkret betyr dette:

- **Parallell research**: Librarian og Explore fyres av som bakgrunnsoppgaver _samtidig_ (10+ parallelle agenter ved behov).
- **Obsessiv TODO-tracking**: Hver deloppgave spores og markeres fullført etterhvert som de utføres.
- **Verifiseringsgaranti**: Ingenting er "ferdig" uten bevis; bygget må kompilere, testene må passere, featuren må demonstreres.
- **Null toleranse**: Ingen "demo-versjoner", ingen "du kan utvide dette senere", ingen 80%-løsninger. Full implementasjon eller en rapport med forklaring på hvorfor det ikke gikk.

Jeg kan lene meg tilbake og se terminalvinduene danse, eller jeg kan hoppe inn og sparre med Sisyphus mens han jobber.

### `ultrathink` (Think Mode)

**Think Mode** auto-detekterer når utvidet resonnering er nødvendig og justerer modellinnstillingene dynamisk. Systemet fanger opp fraser som "think deeply", "ultrathink" eller "tenk grundig" og skrur opp resonnerings-kapasiteten for maksimal analytisk dybde.

Dette ligner på hvordan Claude Code tidligere hadde `think` → `think hard` → `think harder`, en gradert skala for resonnering som Anthropic siden har fjernet. OhMyOpenCode bringer denne funksjonaliteten tilbake, men mer intelligent: i stedet for manuelle nivåer, tilpasser systemet seg automatisk basert på kompleksiteten i forespørselen.

Resultatet er ofte en gjennomtenkt spec eller arkitekturbeslutning som Sisyphus senere kan implementere i Ultrawork Mode.

### `ralph-loop` (Autonom Utholdenhet)

Noen ganger trenger du at agenten bare _fortsetter_, uten at du trenger å sitte og passe på. **Ralph Loop** er svaret. Når du aktiverer denne modusen, går Sisyphus inn i en selv-refererende utviklingssløyfe som fortsetter til oppgaven er 100% fullført. Du kan peke Sisyphus mot en feature-spec, starte Ralph Loop, og gå og ta deg en kaffe. Når du kommer tilbake, har han enten fullført alt, eller gitt deg en detaljert rapport på hvorfor han står fast og trenger input. Dette er Sisyphus-metaforen i sin reneste form: steinen ruller til den ligger på toppen, eller til den møter en hindring som krever menneskelig intervensjon.

## Oppsummering

For å være helt ærlig har overgangen til Opencode med Sisyphus (OhMyOpenCode) endret min rolle som utvikler ganske fundamentalt. Jeg trodde jeg hadde maksimert effektiviteten min med Claude Code, men Sisyphus har vist meg at det finnes et helt nytt nivå. Jeg definerer "hva", "hvordan" og "hvorfor". På den måten får jeg tenke i de høyere abstraksjonsnivåene, mens Sisyphus og teamet tar seg av implementasjonen. Du kan gjerne si at man kan gjøre nøyaktig det samme i Claude Code eller andre CLI-verktøy, men prøv det gjerne først for deg selv og se forskjellen.

Det er fortsatt jeg som har ansvaret. Det er jeg som tar de vanskelige valgene. Men den kognitive byrden av å huske syntaks, lete etter filer eller skrive boilerplate er borte. Steinen ruller, men denne gangen blir den liggende på toppen.

## Ressurser

- [OhMyOpenCode Repository](https://github.com/code-yeongyu/oh-my-opencode)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)
- [AstGrep](https://ast-grep.github.io/)
