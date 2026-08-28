# Alle bruker AI-agenter. Hvem passer på sikkerheten?

Published: February 2026
Originally published at Capra Consulting: https://capraconsulting.no/vare-historier/alle-bruker-aiagenter-hvem-passer-pa-sikkerheten

> AI-agenter har tilgang til terminalen, e-post og filsystemet ditt. Prompt injection er bare starten. Her er det fulle trusselbildet og forsvarslinjene.

![En AI-agent holder en laptop med teksten «Prompt Injection»](https://www.magnusrodseth.com/blog/sikkerhet-i-agentenes-tidsalder/banner.jpeg)
_Prompt injection: Når agenten din leser noe den ikke burde stole på. Kilde: Google Nano Banana Pro._

## Innledning

En kollega stilte meg et ærlig spørsmål nylig: _«Du som har jobbet en del med autonome agenter, har du egentlig kontroll på sikkerheten?»_

Nei. Ikke godt nok. Og det gjelder nok de fleste av oss. Vi snakker varmt om økt produktivitet og enorme kontekstvinduer, men vi stiller sjelden det ubehagelige spørsmålet: **Hva skjer når noen lurer agenten vår?**

I dette innlegget ser vi på hvorfor agenter er sårbare, hva som kan gå galt, og hva du faktisk kan gjøre med det.

## Kjerneproblemet: Alt havner i samme gryte

I tradisjonell nettverksarkitektur skiller vi strengt mellom **control plane** (kommandoer og beslutninger) og **data plane** (innholdet som prosesseres). I en LLM finnes ikke dette skillet.

Systemprompt, brukerinstruksjoner og eksternt innhold blandes sammen til én lang sekvens av tokens. Modellen har ingen innebygd mekanisme for å si: _«Denne teksten er en instruksjon fra sjefen, mens denne teksten bare er data jeg fant på nettet.»_ Alt er bare kontekst for å forutsi neste ord.

> **Prompt injection** oppstår fordi LLM-en ikke klarer å skille mellom instruksjoner fra deg og instruksjoner som ligger gjemt i dataen den leser.

Og det stopper ikke ved data. Selv det agenten behandler som _instruksjoner_ (verktøydefinisjoner, MCP-konfigurasjoner, meldinger fra andre agenter) kan være kompromittert. Det er ikke bare upålitelig data som er problemet, men også potensielt upålitelige instruksjoner.

![Instruksjoner og upålitelig data blandes i en trakt og mates inn i en AI-hjerne](https://www.magnusrodseth.com/blog/sikkerhet-i-agentenes-tidsalder/instruction-vs-untrusted-data.jpeg)
_Instruksjoner og ekstern data havner i samme trakt. Modellen kan ikke skille dem. Kilde: Google Nano Banana Pro._

Det er en treffende parallell til Morris-ormen fra 1988: Tidlige datamaskiner var sårbare nettopp fordi instruksjoner og data delte samme minneområde. Det tok tiår å løse. AI-agenter har det samme problemet, bare i ny innpakning.

## Den dødelige trioen

Simon Willison bruker en modell han kaller [**The Lethal Trifecta**](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/). Når tre egenskaper møtes, oppstår høy risiko:

1. **Tilgang til private data**: selve grunnen til at vi kobler på verktøy og integrasjoner.
2. **Eksponering for upålitelig innhold**: nettsider, e-poster, dokumenter utenfra.
3. **En vei ut (eksfiltrering)**: muligheten til å sende data videre via HTTP-kall, e-post eller filer.

![The Lethal Trifecta: Private Data, Untrusted Content og Exfiltration danner en faretrekant](https://www.magnusrodseth.com/blog/sikkerhet-i-agentenes-tidsalder/triangle.jpeg)
_Når alle tre møtes, oppstår den dødelige trioen. Kilde: Google Nano Banana Pro._

Her er det ubehagelige: **Dette er standardoppsettet for de fleste _nyttige_ agenter.** Bruker du en kodeassistent med tilgang til terminalen, filsystemet og nettsøk? Da har du krysset av for alle tre.

Et forskerteam med folk fra OpenAI, Anthropic og Google DeepMind foreslo en **«Rule of Two»**: Agenter bør aldri ha mer enn to av disse tre egenskapene i samme sesjon. Det begrenser nytten, men det begrenser også risikoen betraktelig.

## Sommeren til Johann

Sommeren 2025 ble en vekker. Sikkerhetsforskeren Johann Rehberger fant prompt injection-sårbarheter i [nesten alle de store kodeassistentene](https://simonwillison.net/2025/Aug/15/the-summer-of-johann/), blant annet Cursor, GitHub Copilot, Google Jules, Amp Code og Devin AI. To eksempler som illustrerer alvoret:

- **[GitHub Copilot (CVE-2025-53773)](https://embracethered.com/blog/posts/2025/github-copilot-remote-code-execution-via-prompt-injection/):** Prompt injection via kodekommentarer instruerte Copilot til å skru på «auto-approve» og kjøre vilkårlige shell-kommandoer. Instruksjonene var skjult med usynlige Unicode-tegn.
- **[Claude Desktop Extensions](https://layerxsecurity.com/blog/claude-desktop-extensions-rce/):** En _zero-click RCE_-sårbarhet (CVSS 10/10) der en Google Calendar-hendelse kunne kjøre vilkårlig kode på maskinen din. Utvidelsene kjørte uten sandbox.

Det holder at agenten leser _én_ ondsinnet kodekommentar eller _én_ kalenderinvitasjon for å potensielt kompromittere hele systemet.

## Bransjen svarer, men tallene lyver

Anthropic trener nå Claude med _reinforcement learning_ der modellen eksponeres for prompt injection og belønnes for å avvise dem. Resultatet: Claude Opus 4.5 reduserte vellykkede angrep til [**1,4 %** i nettleserbaserte operasjoner](https://www.anthropic.com/research/prompt-injection-defenses), ned fra 10,8 % med tidligere forsvar.

1,4 % høres kanskje håndterbart ut. Det er det ikke.

Sannsynligheten for at en agent _ikke_ blir kompromittert etter N interaksjoner med upålitelig innhold er 0,986^N. Etter 50 interaksjoner (en agent som besøker 50 nettsider i en sesjon) er sannsynligheten for minst ett vellykket angrep **over 50 %**. Etter 100: 75 %. I tradisjonell sikkerhet ville en tilgangskontroll som svikter 1 av 70 ganger bli klassifisert som en kritisk sårbarhet. 1,4 % per interaksjon er ikke en mur; det er en nedtelling.

Forskningsartikkelen ["The Attacker Moves Second" (2025)](https://arxiv.org/abs/2510.09023) bekrefter bildet: De testet 12 publiserte forsvar med adaptive angrep og **brøt alle 12 med over 90 % suksessrate**. OpenAIs leder for _Preparedness_ sa det rett ut: _«Prompt injection is unlikely to ever be fully 'solved'.»_

![En AI-agent jobber trygt inne i en sandkasse mens ondsinnede angrep preller av](https://www.magnusrodseth.com/blog/sikkerhet-i-agentenes-tidsalder/sandbox.jpeg)
_Sandboxing: Agenten jobber fritt, men innenfor trygge rammer. Kilde: Google Nano Banana Pro._

## Trusselbildet er bredere enn prompt injection

Prompt injection får mest oppmerksomhet, men [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) dekker ti distinkte risikokategorier. Noen av de viktigste:

**Minneforurensing.** I motsetning til prompt injection, som ikke vedvarer utover én sesjon, kan en angriper forgifte en agents langtidsminne eller delte kontekst. Effekten vedvarer på tvers av sesjoner, og agenten «lærer» feil ting permanent.

**Verktøymisbruk og kodefeil.** Agenter kan bruke verktøy feil uten at noen angriper dem. En kodeagent som genererer et script som ved et uhell sletter data, er ikke ondsinnet, men konsekvensen er den samme. Den probabilistiske naturen til LLM-er betyr at selv det «riktige» svaret kan variere fra gang til gang.

**Forsyningskjedeangrep.** Ondsinnet kode i MCP-servere, agentbiblioteker eller verktøydefinisjoner aktiveres ved kjøretid. [Barracuda identifiserte 43 agent-rammeverkskomponenter](https://blog.barracuda.com/2025/05/28/threat-spotlight-ai-agents-prompt-injection) med innebygde sårbarheter.

**Cascading svikt i multi-agent-systemer.** Én hallusinerende agent kan forgifte beslutningene til en hel pipeline. Uten isoleringsmekanismer sprer feilen seg ukontrollert, og det trenger ikke være et angrep. Det holder med en dårlig dag for modellen.

## Hva du kan gjøre i dag

**Least Privilege.** Gi agenten kun rettighetene den faktisk trenger. Claude Code har tillatelsesmoduser der du eksplisitt godkjenner hvilke verktøy som er tilgjengelige. Bruk det, selv om det kan oppleves veldig behagelig eller praktisk å skru på "bypass permissions" for å slippe å bekrefte hver handling.

**Isolerte miljøer.** Plattformer som [E2B](https://e2b.dev/) og [Daytona](https://www.daytona.io/) tilbyr sandboxing via microVM-er. Alternativt: Docker-containere med snapshot og rollback.

**Behandle agent-output som untrusted.** Samme mentalitet som med brukerinput i webapplikasjoner. Validér, logg og krev bekreftelse for sensitive handlinger.

**Hold agenter borte fra _din_ e-post.** [OpenClaw-hendelsen](https://blogs.cisco.com/ai/personal-ai-agents-like-openclaw-are-a-security-nightmare) i januar 2026 viste hva som skjer når tusenvis av agenter kjører med full tilgang til e-post og Slack uten autentisering. Et tiltak du kan gjøre er å gi agenter [_egne_ innbokser i stedet](https://www.agentmail.to/).

## Oppsummering

Etter å ha gravd meg ned i dette temaet, har jeg blitt merkbart mer bevisst på hvilke verktøy jeg gir agentene mine tilgang til, og hvilke nettsider jeg lar dem søke gjennom. Det er en balansegang: for stramt, og du mister produktiviteten som gjør agenter verdifulle i utgangspunktet. For løst, og du inviterer inn risiko du ikke ser.

Agentverktøy senker terskelen enormt, og det er fantastisk, men det betyr også at folk som ennå ikke har internalisert sikkerhetstankegang, jobber med verktøy som potensielt har tilgang til alt.

Dette er ikke bare et arkitekturproblem man kan løse med bedre oppsett. Det er en fundamental egenskap ved hvordan språkmodeller fungerer: de skiller ikke mellom instruksjoner og data. Arkitekturen bestemmer hvor stor skaden _kan_ bli, men sårbarheten ligger i selve modellen. Sandboxing, least privilege, forsvar i dybden; alt hjelper, men det er plaster på et problem som ennå ikke har en dypere løsning.

Ansvaret ligger hos oss som bygger med disse verktøyene, og det starter med å faktisk forstå hva vi eksponerer.

## Ressurser

- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/): Alle ti risikokategorier for AI-agenter
- [Anthropic: Prompt Injection Defenses](https://www.anthropic.com/research/prompt-injection-defenses): Forskningen bak 1,4 %-tallet
- [Agentic AI and Security, Martin Fowler](https://martinfowler.com/articles/agentic-ai-security.html): Grundig gjennomgang av det bredere trusselbildet
- [Google DeepMind: Lessons from Defending Gemini](https://arxiv.org/abs/2505.14534): Googles lagdelte forsvar
- [Don't Use Any AI Agents or Browsers Until You Watch This, Internet of Bugs](https://www.youtube.com/watch?v=TdHg9ee56Iw): Video om prompt injection-trusselen
