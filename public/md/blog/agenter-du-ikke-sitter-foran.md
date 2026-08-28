# Slik gjør du repoet klart for agenter du ikke sitter foran

Published: August 2026
Originally published at Capra Consulting: https://capraconsulting.no/vare-historier/slik-gjor-du-repoet-klart-for-agenter-du-ikke-sitter-foran

> Alt som bare finnes i hjemmekatalogen din er usynlig for en fersk virtuell maskin. Her er porteringen av et agentoppsett til skyen, og det som brøt underveis.

![Editorial illustration, wide 16:9 banner composition. A calm, flat composition split by a clean vertical seam down the middle: on the left a warm, cluttered desk surface rendered flat and matte, on the right an empty, cool, pristine surface. Nothing crosses the seam. In the open space on the right, elegant serif text in warm cream reads exactly, with correct Norwegian spelling including the letters ø and å: "Hva krysser grensen?" set in a classic editorial serif typeface, with generous letter spacing. No other text anywhere in the image. Mood: quiet, technical, editorial. Palette: deep slate blue, warm sand, muted teal, warm cream. Flat editorial illustration with subtle paper grain texture, restrained detail and no fine line work, generous negative space. Magazine opinion-section feel like The Economist or New York Times opinion illustrations.](/blog/agenter-du-ikke-sitter-foran/banner.webp)
_Alt som bare finnes i hjemmekatalogen din er usynlig for en fersk virtuell maskin. Kilde: OpenAI gpt-image-2._

## Innledning

Jeg har en second brain, altså et personlig kunnskapssystem der notater, prosjekter og referanser bor på ett sted, som et ytre minne jeg kan søke i og bygge videre på. Mitt er et Obsidian-vault som driftes nesten utelukkende gjennom Claude Code på en Mac.

I det siste har jeg forsøkt å bruke det samme vaultet fra Claude Code i Claudes mobilapp, men opplevde at utvikleropplevelsen og kapabilitetene jeg har på desktopen ikke fulgte med over på mobilen. Derfor ville jeg finne ut hva som faktisk skal til for å kjøre de samme arbeidsflytene fra telefonen, der agenten kjører i en virtuell Linux-maskin hos Anthropic i stedet for på maskinen min.

![Diagram som viser en dag med vaultet i tre faser: ved desktopen (dokumentere et møte, notere fra en samtale, fange noe nytt fra jobb, legge inn en todo to uker fram i tid), på farten (åpne Claude Code i mobilappen, starte en cloud-sesjon på vaultet, fortsette arbeidet der det slapp), og tilbake ved desktopen (bli minnet på åpne cloud-PR-er, merge dem inn i main, Obsidian viser oppdaterte notater)](/blog/agenter-du-ikke-sitter-foran/en-dag-med-vaultet.webp)
_Samme vault, tre steder i løpet av en dag. Telefonen tar over midt i arbeidet, og desktopen henter det hjem etterpå. Kilde: Egen illustrasjon._

Først en forutsetning denne bloggserien ennå ikke har dekket. En cloud-sesjon i denne konteksten er en Claude Code-økt som kjører hos Anthropic i stedet for på din egen maskin. Starter du den fra claude.ai eller mobilappen, får du en fersk virtuell Linux-maskin. Den kjører som root, med omtrent 4 vCPU, 16 GB RAM og 30 GB disk. Repoet klones fra GitHub. Det kopieres aldri fra disken din, så lokale commits som ikke er pushet, finnes rett og slett ikke for sandkassen som kjøres hos Anthropic. Git går gjennom en proxy hos Anthropic som holder ekte credentials utenfor den virtuelle maskinen, og sesjonen starter på sin egen branch, med push begrenset til nettopp den branchen. Det er ingen egen kompute-kostnad; en cloud-sesjon spiser av de samme rate limits som alt annet du gjør med Claude.

Nesten all oppførsel i en slik sesjon følger av ett spørsmål. Krysser dette grensen inn i en fersk virtuell maskin? Det spørsmålet organiserer resten av innlegget, og porteringen var i praksis en øvelse i å stille det om og om igjen, mot én avhengighet av gangen.

Eksempelet mitt er altså et Obsidian-vault: hundrevis av notater fordelt på mappene Learning, Meetings, Notes, Personal, Projects, Reference, Templates og Attachments, i et privat GitHub-repo på flere hundre megabytes. Funnene fra arbeidet med å gjøre vaultet klart for skyen handler om hva som skal til for å rigge repoet for denne grensen mot en fersk virtuell maskin i Claude Code. Jeg diskuterer også hvor mye som overføres til vanlige kodebaser, og der noe kun gjelder mitt oppsett, sier jeg fra underveis. Dette er reisebrevet fra porteringen, fortalt i den rekkefølgen den faktisk skjedde. Vi starter med den mentale modellen alt annet henger på.

## Hva krysser grensen?

Den mentale modellen er to kolonner. Over grensen går alt som er committet til repoet, repo-scoped agentkonfig som skills, hooks, regler og MCP-deklarasjoner i `.claude/`, miljøkonfig du setter i hosting-UI-et (https://claude.ai/code), og hostede OAuth-konnektorer der Anthropic holder innloggingen. Den siste kategorien dekker mer enn man skulle tro, f.eks. Gmail, Slack, Google Calendar, Google Drive og Exa. De virket alle i skyen uten at én eneste credential lå i sandkassen. I stedet autentiserer du med Claude sine Connectors for å gi agenten tilgang til disse verktøyene. Igjen på utsiden blir alt i hjemmekatalogen din: brukerscopede skills og settings, shell og PATH, dotfiles, installerte CLI-er, lokale daemons, desktop-apper og innloggede nettlesere.

![Diagram med to kolonner: til venstre det som krysser grensen inn i en cloud-sesjon (committet repo-innhold, repo-scoped agentkonfig, miljøkonfig satt i UI-et, hostede OAuth-konnektorer), til høyre det som ikke krysser (~/.claude og dotfiles, PATH og installerte CLI-er, lokale daemons, innlogget nettleser, macOS-primitiver)](/blog/agenter-du-ikke-sitter-foran/hva-krysser-grensen.webp)
_Venstre kolonne følger med inn i en fersk virtuell maskin, høyre kolonne blir igjen på Mac-en. Kilde: Egen illustrasjon._

## Mål faktisk bruk før du porterer noe

Oppsettet mitt er fullt av detaljer som bare gjelder meg, så jeg skal spare deg for inventarlista, men selve metoden er verdt å ta med seg. Før du porterer noe som helst, la Claude gå gjennom sine egne transkripter og samtaler og finne mønsteret i hva som faktisk brukes. Claude Code lagrer transkripter av hver sesjon som JSONL, med hvert verktøykall som en egen linje, så agenten kan selv rangere skills, MCP-servere og CLI-verktøy etter reell bruk, uansett hva hukommelsen din påstår.

Med den rangeringen i hånden blir diskusjonen om hva som er verdt å flytte til cloud-miljøet konkret. For hvert element på lista spør du om det er levedyktig i skyen, eller om det heller skal forbli på desktopen med vilje. Hos meg viste målingen at den mest brukte integrasjonen aldri kunne fungere i skyen, at flere konfigurerte MCP-servere aldri var brukt, og at to secrets en tidlig plan hadde utpekt som nødvendige, kunne strykes.

På den måten kan man si at inventaret av hva du har, kan lyve, men transkriptene av samtalene dine lyver ikke. Det ene forteller hva som finnes; det andre forteller hva som betyr noe. Målingen er dessuten det eneste steget i hele porteringen som sletter arbeid framfor å legge til, og derfor er det steget som skal gjøres først.

## Portabel, tilpassbar eller død

Neste steg var å klassifisere hver avhengighet i tre bøtter. Portabel betyr ren instruksjon, eller en CLI som kan installeres fra et pakkeregister, slik `yt-dlp`, verktøyet som laster ned video og lyd fra YouTube, kan fra pip. Tilpassbar dekker det som virker etter én endring, som regel en hardkodet sti eller en antatt binærfil. Ting som klassifiseres som død, er strukturelt umulig i en virtuell maskin, uansett innsats.

Den døde bøtta følger gjenkjennelige mønstre. Operativsystem-primitiver som utklippstavle, lydavspilling og app-URI-er (for eksempel `notion://` eller `obsidian://`) finnes ikke i en headless virtuell maskin. Interaktiv autentisering, som BankID, kan ikke gjennomføres der. Bruker du CLI-er eller MCP-servere som styrer en innlogget nettleser, for eksempel Playwright-basert automatisering mot din egen Chrome, sitter de fast på maskinen der nettleseren og innloggingen faktisk bor. Det samme gjelder alt som snakker med en lokal daemon på localhost, for eksempel en database eller en språkmodell du kjører selv på maskinen din.

Regn med at noe du bruker mye havner i denne bøtta, og godta det tidlig i stedet for å bruke dagene på å lete etter omveier. Den fristende omveien er gjerne å smugle credentials eller session-cookies inn i sandkassen, men det er sjelden verdt risikoen. Se heller etter en enklere kanal som allerede krysser grensen, for eksempel e-postvarsler (som du senere kan lese med Gmail-konnektoren rett i Claude), og la resten bli igjen på desktopen med god samvittighet.

## Den hardkodede stien

Så kom det første bruddet, i den tilpassbare bøtta. `read-up-on` er den mest brukte skillen i hele oppsettet mitt i min second brain, og den er selve gjenkallingen. Be agenten lese seg opp på en person, et prosjekt eller et tema, så søker den gjennom notatene og starter samtalen med det du allerede vet, i stedet for fra null. Den skillen åpnet slik:

```bash
# Before: resolves to nothing in a sandbox, and reports nothing
VAULT="$HOME/dev/personal/vault"
```

Den stien finnes ikke i en sandkasse. Skillen ville likevel aldri feilet. Den ville søkt i ingenting og returnert ingenting, og et tomt svar leses som "du har ingenting på fil" i stedet for som en feil. Rettelsen ser omtrent slik ut:

```bash
# After: falls back to the project directory when the Mac path is absent
if [ -d "$HOME/dev/personal/vault" ]; then
    VAULT="$HOME/dev/personal/vault"
else
    VAULT="${CLAUDE_PROJECT_DIR:-$PWD}"
fi
```

Revider derfor for tomme svar like grundig som for feilmeldinger dersom du setter opp dette for deg selv. En krasj melder fra om seg selv, mens et tomt svar ikke gjør det.

## Setup-scriptet som må feile åpent

Neste brudd lå i miljøprovisjoneringen. En cloud-sesjon kan kjøre et setup-script du legger inn i hosting-UI-et (igjen på https://claude.ai/code), og Anthropics dokumentasjon sier det rett ut: "If the script exits non-zero, the session fails to start."

Den første versjonen min var skrevet slik jeg vanligvis skriver shell-script, med `set -euo pipefail` og `exit 1` når verifiseringen feilet. I denne konteksten betyr det at en feilet installasjon av en nødvendig pakke hindrer enhver sesjon i å starte. Et strengt script er altså det mindre passende valget her. Står du på bussen og åpner mobilappen, vil du heller at sesjonen starter opp med én ødelagt skill fordi `yt-dlp` mangler, enn at den ikke starter i det hele tatt.

Scriptet ble skrevet om slik at hver installasjon tåler å feile, feil akkumuleres som `WARN`-linjer, og siste linje alltid er `exit 0`. Mønsteret ser slik ut:

```bash
set -uo pipefail   # deliberately NOT -e: a non-zero exit stops the session from starting

warnings=0
warn() { printf '  WARN: %s\n' "$1"; warnings=$((warnings + 1)); }

apt-get install -y -qq --no-install-recommends ffmpeg pandoc \
    || warn "apt-get install of ffmpeg/pandoc failed"

# Always succeed, even with warnings.
exit 0
```

For dette vaultet installerer scriptet PyYAML, som frontmatter-hooken trenger for å validere formatet på Obsidian-notatene mine, pluss `ffmpeg`, `yt-dlp` og `pandoc` for transkriberings- og eksportskills. Til slutt ett tips som kanskje kan spare deg for litt tid om du setter dette opp selv. Sett nettverkspolicyen til Custom med en egen liste over domenene du og skillsene og arbeidsflytene dine trenger, og husk å huke av for å inkludere standardlisten over pakkeforvaltere. Hos meg ser lista for eksempel slik ut:

```text
youtube.com
*.youtube.com
*.googlevideo.com
*.ytimg.com
youtu.be
```

Uten haken for pakkeforvaltere er kun dine egne domener mulige å nå. Da slutter apt, pip og npm i setup-scriptet å virke.

## Hooks for en ny topologi

Mitt personlige vault har en `Stop`-hook i Claude som auto-committer og pusher etter hver tur, slik at Obsidian på Mac-en og repoet på GitHub aldri glir fra hverandre. Slike hooks bærer på antakelser om git-topologien rundt seg, og hos meg var antakelsen en langlevd branch med upstream (siden jeg tross alt kun sitter i main-branchen og pusher og puller arbeid kun jeg gjør).

Cloud-sesjoner starter på en fersk branch uten upstream. Der feilet push-steget i hooken, ingen fallback tok over, og hver eneste cloud-sesjon ville endt blokkert på en push-feil. Dette fikset jeg ved at hooken nå først sjekker om branchen har en upstream, og setter den opp på første forsøk på push dersom den mangler.

![Topologidiagram over Mac, GitHub og den virtuelle maskinen i skyen: heltrukne piler viser den utgående veien fra lokal Stop-hook via commit til main, kloning inn i den virtuelle maskinen, plattformens commit på claude/-branch og draft-PR; stiplede piler viser veien tilbake fra SessionStart-hook via git fetch, fast-forward, gh pr list, merge og git pull](/blog/agenter-du-ikke-sitter-foran/topologi.webp)
_Heltrukne piler er den utgående flyten; de stiplede pilene bringer arbeid hjem igjen. De stiplede fantes ikke på dag én. Kilde: Egen illustrasjon._

Reproduser derfor topologien i et lite engangsrepo du lager kun for testen, med et lokalt remote å pushe mot, før du stoler på hooks i skyen. Kjør hooken både på en branch som har upstream og på en fersk branch uten, og reproduser den gamle feilen med vilje; ellers vet du ikke om du fikset noe. Sjekk samtidig hooks for plattformspesifikke binærfiler, og gate dem på variabelen som markerer en ekstern sesjon (i Claude Code: `CLAUDE_CODE_REMOTE`) framfor å vedlikeholde to konfigfiler som kan drifte fra hverandre.

## Den diagnostiske sesjonen

Med rettelsene pushet var neste steg én sesjon som beviser at cloud-miljøet fungerer ende-til-ende uten problemer. Oppskriften er enkel. Be om en tabell, og forby filendringer. Deretter ber du agenten kartlegge hvilke binærfiler og språkpakker som finnes, og hva som ligger i agent-konfigkatalogen. Så ber du om sesjonsmarkør- og credential-lignende miljøvariabler, samt branch og remote. Til slutt vil du vite hvilke integrasjoner som koblet til og hvilke som feilet, og du ber om ett tillatt og ett ikke-tillatt nettverkskall for å teste nettverkspolicyen.

Det mer generelle grepet er verdt å nevne. For hver antatte rettelse lot jeg Claude Code på desktopen styre en innlogget nettleser mot Claude Code på web, og kjøre prøvesamtaler i cloud-sesjonen for å teste at alt virket som forventet: at skills lastet, at CLI-verktøyene fra setup-scriptet fantes, at MCP-servere koblet til, og at domener som YouTube var mulige å nå.

Å la agenten kjøre og verifisere seg selv ende til ende sparte meg for både tid og kognitiv last.

## Returveien

Alt til nå har handlet om å få arbeid inn i skyen: kloning, setup-script, skills, MCP, nettverkspolicy. Mekanismen som bringer arbeid skapt i skyen tilbake til maskinen du sitter ved, kaller jeg returveien, og den fantes ikke.

Det første åpenbare problemet dreide seg om åpne PR-er som ingen merger. Cloud-sesjoner pusher til `claude/...` og åpner en draft-PR, og på desktopen får `main` aldri vite om dem (med mindre jeg som sitter foran tastaturet ber Claude sjekke manuelt). Arbeidet gjort på mobilen i farta kan ligge umerget i det uendelige mens den lokale `Stop`-hooken på desktop committer videre rett på `main`, og dermed er avviket hooken skulle hindre til å begynne med, tilbake fra motsatt side.

Det andre problemet er stillere. Merger du en cloud-PR fra telefonen, blir desktop-miljøet stående utdatert dersom du glemmer å pulle nye endringer fra `main` på remote. Rettelsen er de stiplede pilene i topologidiagrammet over, altså en `SessionStart`-hook som fetcher, fast-forwarder når det er trygt, og rapporterer åpne PR-er automatisk uten at utvikleren må si ifra manuelt. Den fyrer én gang per sesjonstilstand, og det den skriver til stdout, injiseres i agentens kontekst før første brukermelding.

Så et litt viktig forbehold, da. Dette oppsettet fungerer for meg personlig på bakgrunn av følgende: vaultet har én skribent, ingen CI å ødelegge og ingen review-krav, og det har en lokal applikasjon, Obsidian, som leser rett fra disk. Skal du generalisere dette til en kodebase, må nok hver utvikler fortsatt ta en mer manuell synkjobb (som vanlig), altså ikke belage seg på like mye automatisering som jeg forsøker å få til i dette personlige oppsettet.

## Avslutning

For å oppsummere og avslutte. Et spørsmål jeg regner med at en skeptisk leser sitter igjen med, er hvorfor i all verden man skal gidde å gjøre dette for seg selv. Du vil kanskje ikke jobbe fra telefonen i det hele tatt, og sitter uansett nok foran laptopen allerede. Lærdommen er at en slik portering, uavhengig av hvor mye du faktisk planlegger å bruke kodebasen din fra mobilen, fungerer som en tvungen opprydding. Du avdekker udeklarerte avhengigheter du har samlet opp i kodebasen, og retter du dem, får det positive ringvirkninger for det lokale oppsettet ditt også. Et koderepo en fersk virtuell maskin kan bruke, er et koderepo en ny maskin, en ny kollega eller CI kan ta i bruk med lite eller ingen ekstra jobb.

Et praktisk tips før vi runder av. Virker dette interessant og nyttig for ditt eget oppsett, kan du rett og slett kopiere hele innlegget inn i en sesjon med din egen agent. La den utforske repoet ditt med grensespørsmålet i hånden, og legg planen for porteringen sammen med den.

En siste ting jeg vil trekke fram. Om ikke annet håper jeg denne posten har gitt deg litt lyst til å sette opp din egen second brain. Det har ikke vært hovedfokuset her, men det er jo nettopp opphavet til at jeg så behovet for et bedre utviklermiljø på mobilen i Claude Code-appen. Jeg vil derfor benytte anledningen til å anbefale at du tester ut å bygge din egen, for min hjelper meg enormt både på jobb og privat. Med avtaler, meldinger og notater samlet ett sted får jeg mindre kognitiv last, mindre friksjon når jeg plukker opp dialoger igjen, og en større kunnskapsbase om alt som handler om meg.

Og som en liten sidenote. Er du usikker på å dele mye data med AI-leverandører som Anthropic eller OpenAI, så husk at det alltid er opp til deg hvor mye du faktisk deler. Det er ikke et "all or nothing". Det er et spekter, og du bestemmer selv hva du lar din second brain bestå av.

## Ressurser

- [Claude Code på web](https://code.claude.com/docs/en/claude-code-on-the-web): Anthropics dokumentasjon for cloud-sesjoner
- [Hooks-referansen](https://code.claude.com/docs/en/hooks): Lifecycle-hendelser, matchere og kontrakten for stdin/stdout
