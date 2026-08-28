# SEO i agentenes tidsalder: Slik gjør du webapplikasjonen din klar for agenter

Published: August 2026
Originally published at Capra Consulting: https://capraconsulting.no/vare-historier/seo-i-agentenes-tidsalder-slik-gjor-du-webappen-din-klar-for-agenter

> Slik gjør du webapplikasjonen din klar for AI-agenter: de fem byggesteinene for en innholdsside, casen der heihuset.no gikk fra «Not Ready» til «Agent-Native» på én arbeidsdag, og hva vi med vilje lot stå rødt.

![Editorial illustration, wide 16:9 banner composition. A person and a small friendly rounded robot sit side by side on a simple park bench, each absorbed in reading an identical large broadsheet newspaper, the two front pages clearly showing the same abstract layout of headline bars and image blocks. Their postures mirror each other. Mood: calm coexistence, two very different readers of the same content. Person and bench in soft slate, robot in muted teal with a single rust accent, newspapers in warm cream with slate detail, warm cream background. Flat editorial illustration with subtle paper grain texture, restrained detail and no fine line work, generous negative space. No text, no letters, no words inside the image. Magazine opinion-section feel like The Economist or New York Times opinion illustrations.](/blog/seo-i-agentenes-tidsalder/banner.webp)
_Nettsiden din har fått en ny lesergruppe, og den leser helst markdown. Kilde: OpenAI gpt-image-2._

## Innledning

Se for deg at noen spør ChatGPT eller Claude om et problem produktet ditt løser. Assistenten prøver å lese nettsiden din, får et tomt HTML-skall i retur, og anbefaler noe annet i stedet. Ingen feilmelding, ingen logg som varsler deg; du er bare ikke med i samtalen. Kanskje du har brukt flere år på å rangere i Google, og så dukker det opp en ny lesergruppe som ikke får åpnet døra.

Når vi bygger heihuset.no, produktet jeg jobber med for Gjensidige, er vi svært bevisste på dette. Cloudflares skanner [isitagentready.com](https://isitagentready.com/) ga oss 0 poeng: «Level 0, Not Ready». Én arbeidsdag senere viste samme skanner «Level 5, Agent-Native». Imellom lå en spesifikasjon som vurderte hver enkelt sjekk, en runde pull requests med review og verifisering i produksjon. Agenter gjorde alt sammen, med meg som godkjenner underveis.

Det mest slående i etterkant er hvor lite som skulle til. Alt vi bygde er velkjent webteknologi, og den egentlige jobben var å vite hva agenter ser etter når de banker på døra. Den sjekklisten får du her, sammen med begrunnelsen for det vi med vilje lot stå rødt.

## Hvem leser nettsiden din i 2026?

Klassisk SEO handler om å bli funnet av Google. Det som har endret seg, er hvem som leser nettsider nå: [i 2026 passerte bot-trafikken menneskene](https://radar.cloudflare.com/ai-insights), med 57,5 prosent av HTML-trafikken ifølge Cloudflare. Samtidig faller klikkene fra tradisjonelt søk, fordi AI Overviews (Googles AI-genererte svar øverst i søkeresultatet) [besvarer spørsmålet før brukeren rekker å klikke](https://www.searchenginejournal.com/impact-of-ai-overviews-how-publishers-need-to-adapt/556843/).

Trafikken fra AI-assistenter som ChatGPT, Claude og Perplexity er fortsatt liten, [rundt én prosent av totalen](https://www.tryanalyze.ai/blog/ai-traffic-research), men den konverterer flere ganger bedre enn organisk søk i [målinger fra flere analyseleverandører](https://trakkr.ai/ai-search-traffic). Når en assistent anbefaler deg ved navn, kommer besøkeren ferdig overbevist. Samtidig koster crawlingen (automatisk henting og lesing av nettsider) mer enn den gir tilbake i klikk: Cloudflare har målt at [OpenAI crawlet over tusen sider per besøkende de sendte tilbake](https://blog.cloudflare.com/crawlers-click-ai-bots-training/).

Bransjen har rukket å lage minst tre akronymer for å optimalisere mot dette: GEO (Generative Engine Optimization), AEO (Answer Engine Optimization) og ASO (Agentic Search Optimization). [De beskriver i praksis det samme](https://digiday.com/media/wtf-are-geo-and-aeo-and-how-they-differ-from-seo/): å bli funnet, sitert og brukt av AI-systemer. «Agent-readiness» er den tekniske enden av begrepsfloraen: at en agent som besøker siten din, faktisk klarer å lese og bruke den.

## Skanneren

[isitagentready.com](https://isitagentready.com/) er Cloudflares svar på «hvordan står det til med vår applikasjon?», [lansert i april 2026](https://blog.cloudflare.com/agent-readiness/). Skanneren kjører 19 sjekker i fem kategorier og gir en score fra 0 til 100 med nivåer fra «Not Ready» til «Agent-Native». Før du scanner, velger du hvilken type nettsted du har, og det avgjør hvilke sjekker du måles på:

- **Content Site** er for blogger, dokumentasjon og markedsføringssider, altså nettsteder som først og fremst skal bli funnet og lest. Her måles du på discoverability og innholdstilgang: robots.txt, sitemap, Link headers, DNS-AID, markdown content negotiation, AI-crawler-regler og Content Signals.
- **API / Application** er for tjenester og webapper der agenter skal gjøre noe, og legger til sjekkene for maskinbruk: OAuth discovery, API-katalog, MCP Server Card, agent skills og WebMCP.

Driver du en innholdsside, kan du trygt ignorere hele API-familien av sjekker. heihuset.no er utad en ren innholdsside, så Content Site-presetet var det vi målte oss mot.

![Skjermbilde av forsiden til isitagentready.com: overskriften «Is Your Site Agent-Ready?», et URL-felt med en Scan-knapp, og utvidbare spørsmål som «What do we check?»](/blog/seo-i-agentenes-tidsalder/skanner-forside.png)
_Skanneren er gratis og tar sekunder: lim inn en URL og få en full sjekkliste tilbake. Skjermbilde fra isitagentready.com._

Tallene fra lanseringen viser hvor lav lista ligger. Blant de 200 000 største domenene har [78 prosent robots.txt, 4 prosent Content Signals og 3,9 prosent markdown-støtte](https://blog.cloudflare.com/agent-readiness/). Det skal med andre ord lite til for å ligge langt foran, og det gjelder også her hjemme:

![Skjermbilde av skanneresultatet for nrk.no på isitagentready.com: score 43 av 100, nivå 1 «Basic Web Presence», med merkelappen «Partial scan, 7 of 19 checks enabled»](/blog/seo-i-agentenes-tidsalder/nrk-scan.png)
_Selv nrk.no lander på 43 av 100 med innholdssjekkene (nivå 1, «Basic Web Presence») per 7. juli 2026. Skjermbilde fra isitagentready.com._

## Hva vi bygde

Baseline-scanen ga 0 poeng fordi alt manglet. Hver eneste sti skanneren prøvde, endte i en såkalt soft-404: serveren svarte «200 OK» og returnerte den vanlige nettsiden, uansett hva du ba om. Ba du om `/robots.txt`, fikk du altså appens HTML i retur i stedet for en tekstfil. Agentene fikk skannerens funn som utgangspunkt og bygde fem ting:

- **robots.txt med AI-crawler-regler.** Policyen vår er at innholdet skal være synlig i søk og AI-svar, men ikke brukes som treningsdata. Treningscrawlere som GPTBot, ClaudeBot og CCBot blokkeres, mens OAI-SearchBot, ChatGPT-User og PerplexityBot får lese offentlige sider.
- **[Content Signals](https://contentsignals.org/)**, en maskinlesbar linje i robots.txt som erklærer hva innholdet kan brukes til: `Content-Signal: search=yes, ai-train=no, ai-input=yes`. Den siste betyr ja til at assistenter bruker innholdet som kilde når de svarer (såkalt RAG eller grounding).
- **sitemap.xml**, generert fra den samme innholdslisten som resten av appen bruker.
- **Markdown content negotiation**: samme URL leverer ulikt format avhengig av hva klienten ber om i Accept-headeren. Ber du om `text/markdown`, får du ren markdown i stedet for HTML-skallet. Her er gevinsten stor for agenter som betaler per token: [Cloudflare målte en typisk bloggpost](https://blog.cloudflare.com/markdown-for-agents/) til 16 180 tokens som HTML og 3 150 som markdown.
- **Link headers** ([RFC 8288](https://datatracker.ietf.org/doc/html/rfc8288)). Dette er en HTTP response header, altså et eget felt i svaret fra serveren, som peker agenter rett til sitemap-en uten at de først må tolke HTML.

Alt dette er offentlig og kan sjekkes fra terminalen din:

```bash
curl https://www.heihuset.no/robots.txt
curl https://www.heihuset.no/sitemap.xml
curl -H "Accept: text/markdown" https://www.heihuset.no/
```

## Re-scan: 21 poeng

Da alt var merget og deployet, kjørte vi skanneren på nytt og fikk 21 poeng. Implementasjonene var riktige; det var infrastrukturen mellom appen og verden som serverte noe annet enn koden returnerte.

![Editorial illustration. A cozy small shop seen from the street at dusk, warm light glowing from its windows, shelves inside fully stocked and inviting, the interior clearly open for business. On the glass front door hangs a single small hanging sign showing only a crescent moon symbol, universally read as closed. Outside, a short polite line of small rounded robots is turning around and walking away from the shop. Mood: quiet irony, a well-stocked shop accidentally turning everyone away. Shop in muted teal and soft slate, warm light in cream, one rust accent on the hanging sign, warm cream background. Flat editorial illustration with subtle paper grain texture, restrained detail and no fine line work, a single central concept, symbolic rather than literal, with generous negative space. No text, no letters inside the image. Magazine opinion-section feel like The Economist or New York Times opinion illustrations.](/blog/seo-i-agentenes-tidsalder/closed-sign.webp)
_Butikken var åpen og full av varer, men skiltet på døra sa stengt. Kilde: OpenAI gpt-image-2._

Detaljene er spesifikke for vårt oppsett og lite overførbare, men mønsteret er generelt: gatewayer, cacher og rolling deploys kan alle gjøre at produksjon svarer noe annet enn koden din tilsier. Hos oss endte robots.txt en kort stund med å be samtlige crawlere holde seg unna. Avhengig av hosting-leverandør og løsning må du regne med et par slike triks før alt stemmer.

To lærdommer er verdt å ta med seg uansett oppsett. Verifiser innholdet i svaret i produksjon, og la aldri en grønn statuskode alene telle som bevis: vår «verifisert i prod»-sjekk så på statuskode og content-type, og begge var riktige mens selve innholdet var feil. Og husk at cachede svar kan overleve deployen din, så kjør skanneren på nytt etter at cache-TTL-en (levetiden på den lagrede kopien) har gått ut, ellers jakter du spøkelser.

Selve verifiseringen er for øvrig en jobb det lønner seg å gi agenten. Det er tross alt agenter som skal konsumere disse endepunktene, og en agent curler seg gjennom robots.txt, sitemap og markdown-svarene og sjekker hvert svar mot Cloudflares anbefalinger langt mer systematisk (og raskere) enn en utvikler som klikker seg rundt i nettleseren.

## Skanneren deler ut sin egen oppskrift

Hver feilet sjekk i skanneren kommer med en forklaring, en «Copy prompt»-knapp du kan lime rett inn i din egen coding-agent, og en lenke til en SKILL.md, altså en ferdig agent-skill med oppskriften på fiksen. Skanneren publiserer [en indeks med slike skills](https://isitagentready.com/.well-known/agent-skills/index.json) på sitt eget `/.well-known/agent-skills/`-endepunkt, én for hver standard den sjekker, og hver skill avslutter med et maskinsjekkbart valideringssteg mot skannerens API.

![Editorial illustration, circular composition. Three stations arranged evenly around a ring, connected by one smooth continuous circular arrow path flowing clockwise: first a large magnifying glass hovering over a small abstract website window, second a paper scroll unrolled to show an abstract checklist of bars, third a small friendly robot arm holding a wrench over the same small website window. The circle reads as a self-sustaining loop: inspect, instruct, repair, inspect again. Mood: elegant self-reference, a system that feeds itself. Magnifying glass in soft slate, scroll in warm cream with slate bars, robot arm in muted teal with a single rust accent on the wrench, warm cream background. Flat editorial illustration with subtle paper grain texture, restrained detail and no fine line work, a single central concept, generous negative space. No text, no letters inside the image. Magazine opinion-section feel like The Economist or New York Times opinion illustrations.](/blog/seo-i-agentenes-tidsalder/skill-loop.webp)
_Skanneren klager, serverer oppskriften på fiksen, og verifiserer resultatet. Kilde: OpenAI gpt-image-2._

Dermed oppstår en pussig loop: agenten som fikser nettstedet ditt, henter oppskriften fra tjenesten som klaget, og verifiserer fiksen mot samme tjeneste. Verktøyet som måler agent-readiness, er selv agent-ready. Nå har tjenester begynt å publisere prosessene sine i samme format.

## Det vi ikke bygde

To av sjekkene i Content Site-presetet lot vi stå røde. DNS-AID (agent-oppdagelse via DNS) forutsetter agent-endepunkter å annonsere, og Link headers-sjekken godkjenner bare lenker til API-kataloger og tjenestedokumentasjon. Resten av de røde hører til API / Application-siden: MCP Server Card (et maskinlesbart visittkort for en [MCP-server](https://modelcontextprotocol.io/docs/getting-started/intro)), API-katalog ([RFC 9727](https://datatracker.ietf.org/doc/rfc9727/)) og OAuth discovery. Alt sammen forutsetter infrastruktur dette produktet ikke har: et offentlig API, en OAuth-utsteder eller en MCP-server. Vi landet på å hoppe over dem, dokumentere begrunnelsen for hver enkelt, og la sjekkene stå røde.

Tallet du får, avhenger altså av hvilke sjekker du slår på, og samme side kan lande på alt fra toppnivå til midt på treet. Den viktige øvelsen er å velge sjekkene som gjelder for produktet ditt, og å kunne forklare de røde som blir stående.

## Hva med llms.txt?

llms.txt (en foreslått konvensjon der en tekstfil i roten skal gi AI-modeller en kompakt oversikt over nettstedet) dukker alltid opp i disse diskusjonene. Ahrefs analyserte serverlogger fra 137 000 domener og fant at [97 prosent av llms.txt-filene ikke fikk en eneste forespørsel fra AI-crawlere](https://ahrefs.com/blog/llmstxt-study/) i mai 2026, og Googles John Mueller har [sammenlignet filen med keywords-metataggen](https://www.seroundtable.com/google-does-not-endorse-llms-txt-40789.html) fra gamle dager, altså en egenerklæring om hva siten handler om, som søkemotorene endte med å ignorere fordi påstandene like gjerne kunne være usanne, og innholdet uansett kan leses direkte. Cloudflares skanner sjekker den ikke engang.

Kodeagenter ber i stedet om markdown via Accept-headeren; [Checkly målte at Claude Code, Cursor og OpenCode gjør nettopp det](https://www.checklyhq.com/blog/state-of-ai-agent-content-negotation/). Skal du prioritere én ting for agentlesbarhet, er det content negotiation på HTTP-nivå.

## En måned senere

Mens jeg skrev dette innlegget, kjørte jeg skannerens API mot heihuset.no på nytt. Alle de fem sjekkene passerer fortsatt. Det fine er at sitemap-en nå inneholder en artikkel publisert etter at vi gjorde webapplikasjonen agent-ready, uten at noen har rørt agent-readiness-koden siden juni. robots.txt, sitemap og markdown-endepunktene genereres fra innholdet, så nytt innhold blir agent-klart uten ekstra arbeid. Riggingen ligger i systemet og blir med videre.

## Ressurser

- [isitagentready.com](https://isitagentready.com/): Cloudflares agent-readiness-skanner, med skills for hver sjekk
- [Introducing the Agent Readiness score](https://blog.cloudflare.com/agent-readiness/): Lanseringsbloggen med adopsjonstall
- [contentsignals.org](https://contentsignals.org/): Content Signals-spesifikasjonen
- [Markdown for agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/): Cloudflares dokumentasjon av markdown content negotiation
- [Ahrefs: llms.txt-studien](https://ahrefs.com/blog/llmstxt-study/): Serverlogger fra 137 000 domener
- [Checkly: State of AI agent content negotiation](https://www.checklyhq.com/blog/state-of-ai-agent-content-negotation/): Hvilke agenter som faktisk ber om markdown
- [Cloudflare Radar: AI Insights](https://radar.cloudflare.com/ai-insights): Løpende tall på AI-crawler-trafikk
