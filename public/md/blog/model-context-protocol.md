# MCP (Model Context Protocol): Standarden for å koble AI-agenter til omverdenen

Published: January 2026
Originally published at Capra Consulting: https://capraconsulting.no/vare-historier/model-context-protocol-standarden-for-a-koble-aiagenter-til-omverdenen

> Lær hvordan MCP fungerer som en 'USB-C for AI', standardiserer tilkoblingen mellom LLM-er og dine data, og hvorfor det er viktigere enn proprietære verktøykall.

![En AI-agent-brikke koblet med USB-C-kabler til Slack, PostgreSQL, Notion, Teams og Office-verktøy](https://www.magnusrodseth.com/blog/model-context-protocol/banner.jpeg)
_MCP fungerer som en «USB-C for AI»: en universell standard som kobler AI-agenter til verktøyene og dataene du bruker hver dag. Kilde: Google Nano Banana Pro._

## Innledning

I det forrige innlegget så vi hvordan moderne AI-agenter opererer i en kontinuerlig sløyfe, fra observasjon via orientering og beslutning til handling. Vi diskuterte OODA-loopen, context engineering, og hvordan agenter skiller seg fra tradisjonelle chatbots gjennom evnen til å utføre verktøykall og navigere autonomt mot et mål.

Men her er spørsmålet vi ikke besvarte: **Hvordan kobler egentlig agenten seg til verktøyene?**

Vi befinner oss fortsatt i fundamentdelen av denne bloggserien. Før vi kan diskutere avanserte temaer som multi-agent orchestration, autonomous debugging, eller long-running agents, må vi forstå limet som kobler alle brikkene sammen. MCP er dette limet, adapteren mellom agenter og omverdenen, og å forstå den grundig vil gjøre resten av serien langt mer tilgjengelig.

**MCP (Model Context Protocol)** er svaret på dette spørsmålet. Anthropic lanserte denne åpne standarden i november 2024, og i løpet av det drøye året som har gått, har den blitt den etablerte industristandarden for hvordan AI-agenter kobler seg til omverdenen. MCP kan best beskrives som en "USB-C for AI". Akkurat som USB-C ga oss én standardisert port for alle våre fysiske enheter, gir MCP oss én standardisert protokoll for å koble AI-modeller til data og verktøy.

I dag støtter praktisk talt alle seriøse AI-verktøy MCP. På utviklersiden har vi Claude, Cursor, Visual Studio Code - listen fortsetter. Men MCP strekker seg langt utover kodeeditorer: Slack har en offisiell MCP-server for meldinger og kanalsøk, Microsoft Teams AI Library har innebygd MCP-støtte, og det finnes MCP-servere for Notion, HubSpot, Supabase, og community-drevne MCPer for tusenvis av andre tjenester.

Hva betyr dette i praksis? Tenk deg en kollega som jobber i Teams hele dagen. Med MCP-støtte kan AI-assistenten hennes faktisk _gjøre_ ting: finne den ene meldingen fra tre uker siden, oppsummere diskusjonen i en kanal, eller sjekke hvem som er tilgjengelig for et møte, uten at hun trenger å kopiere og lime inn kontekst manuelt. Det er forskjellen på en AI som bare kan svare på generelle spørsmål, og en som kan navigere i din faktiske arbeidshverdag. **MCP gjør AI-assistenter nyttige for alle, ikke bare utviklere**.

Derfor er det spesielt viktig å forstå hvordan protokollen fungerer, ikke fordi den er spesielt ny og spennende, men fordi den er grunnmuren vi bygger på. Når vi i senere innlegg diskuterer mer avanserte mønstre, regner jeg med at du forstår MCP-terminologien og arkitekturen.

I dette innlegget skal vi se på hva MCP faktisk er, hvorfor det er overlegent proprietære verktøykall, og hvordan du kan sette opp din første MCP-server.

## Hva er egentlig MCP?

MCP er en åpen standard som bruker JSON-RPC 2.0 over enten `stdio` (lokalt) eller `HTTP/SSE` (remote) for å fasilitere kommunikasjon mellom en **MCP Client** (f.eks. Claude Desktop, Cursor, eller din egen agent) og en **MCP Server** som holder på dataene eller verktøyene.

Protokollen definerer tre hovedprimitiver som gir modellen tilgang til verden utenfor:

1. **Resources:** Data som modellen kan lese. Dette fungerer som fil-lesing; modellen får innholdet i en fil, en database-rad eller en API-respons. Tenk på dette som "GET"-forespørsler i REST-arkitektur.
2. **Tools:** Funksjoner modellen kan utføre. Dette er handlinger som krever godkjenning, som å opprette en PR, kjøre en SQL-spørring eller sende en melding. Dette tilsvarer tradisjonelle verktøykall.
3. **Prompts:** Forhåndsdefinerte maler som hjelper brukeren å bruke serveren effektivt. Dette kan være en spesialisert prompt for å analysere en database-tabell eller feilsøke en loggfil.

![MCP Arkitektur](https://www.magnusrodseth.com/blog/model-context-protocol/mcp.png)
_MCP-arkitekturen kobler AI-klienter (som Claude eller IDE-er) til datakilder gjennom en standardisert protokoll, uavhengig av hvilken modell som brukes i bunnen. Kilde: Anthropic._

Det viktige her er ikke teknologien i seg selv (JSON-RPC er gammelt nytt), men **standardiseringen**. Fordi protokollen er lik på tvers av alle verktøy, kan en utvikler bygge _én_ MCP-server for sitt interne API, og den vil umiddelbart fungere i Claude Desktop, Cursor, Zed, og alle andre verktøy som støtter standarden, uten noen tilpasning.

## MCP i Praksis: Konfigurasjon

Hvem som helst kan ta i bruk MCP i dag - på veldig kort tid. Verktøy som **Claude Code** (CLI) og **Cursor** (IDE) har førsteklasses støtte for protokollen.

Alt styres vanligvis gjennom en konfigurasjonsfil, `mcp.json`. Her definerer du hvilke servere klienten skal koble seg til. Slik ser en typisk konfigurasjon ut for å gi AI-en tilgang til filsystemet ditt og GitHub:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/your/project"
      ]
    },
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

Når denne konfigurasjonen er lastet, vil klienten din (f.eks. Cursor eller Claude) automatisk oppdage verktøyene som serverne tilbyr. Du trenger ikke kopiere og lime inn API-skjemaer. Du ber bare agenten: _"Sjekk siste PR i dette repoet og se om den crasher med endringene i `main.ts`"_, og agenten vil selv finne riktig verktøy (GitHub MCP og Filesystem MCP) for å løse oppgaven.

## Bygg din egen MCP-server

Selv om det finnes hundrevis av ferdige servere, ligger den virkelige kraften i å eksponere dine egne data. Tenk deg en intern bedriftsagent som trenger tilgang til kundedata i en PostgreSQL-database, kan oppdatere et Google Sheet med ukentlige rapporter, og henter sanntidsinformasjon fra et internt API. Med MCP kan du eksponere alle disse datakildene gjennom én standardisert protokoll, og agenten kan resonnere på tvers av dem for å løse komplekse oppgaver.

La oss se på et minimalt eksempel. Takket være gode SDK-er er dette trivielt i både TypeScript og Python. Og selv om du ikke er utvikler, følg med på kommentarene. Du vil forstå hva som skjer.

### Et eksempel i TypeScript

Her bruker vi den offisielle SDK-en for å opprette en server som kjører over `stdio` (standard input/output), som er standarden for lokale integrasjoner. Tenk deg at bedriften din har et internt SharePoint-API som du vil eksponere for AI-assistenten.

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { sharepointApi } from "./services/sharepoint.js"; // 👈🏽 Ditt eksisterende interne API

const server = new McpServer({  // 👈🏽 Opprett en MCP-server
  name: "sharepoint-server",
  version: "1.0.0",
});

server.tool(  // 👈🏽 Definer et verktøy AI-en kan bruke
  "search_documents",
  { query: z.string().describe("Search query") },  // 👈🏽 Beskriv hva verktøyet trenger
  async ({ query }) => {
    const docs = await sharepointApi.search(query);  // 👈🏽 Kall ditt eksisterende API
    return {
      content: [
        {
          type: "text",
          text: docs.map(d => `${d.title} (${d.url})`).join("\n"),  // 👈🏽 Returner resultatet
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();  // 👈🏽 Sett opp kommunikasjonskanalen
await server.connect(transport);  // 👈🏽 Start serveren, ferdig!
```

### Et eksempel i Python

I Python-verdenen har vi biblioteket `FastMCP` som gjør opplevelsen veldig lik FastAPI.

```python
from mcp.server.fastmcp import FastMCP
from services.sharepoint import sharepoint_api  # 👈🏽 Ditt eksisterende interne API

mcp = FastMCP("sharepoint-server")  # 👈🏽 Opprett en MCP-server

@mcp.tool()  # 👈🏽 Definer et verktøy AI-en kan bruke
async def search_documents(query: str) -> str:
    """Search for documents in SharePoint."""  # 👈🏽 Beskriv hva verktøyet gjør
    docs = await sharepoint_api.search(query)  # 👈🏽 Kall ditt eksisterende API
    return "\n".join(f"{d.title} ({d.url})" for d in docs)  # 👈🏽 Returner resultatet

if __name__ == "__main__":
    mcp.run()  # 👈🏽 Start serveren, ferdig!
```

Det å kunne eksponere komplekse interne systemer (enten det er en legacy database, et internt API, eller loggfiler) gjennom så enkle grensesnitt, endrer spillereglene for hva vi kan bruke AI til i hverdagen.

> **Tips:** Har du allerede et REST API? Da trenger du kanskje ikke å bygge en separat MCP-server fra bunnen av. Mange populære webrammeverk har god støtte for å eksponere MCP-endepunkter direkte. [Spring AI](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html) har innebygd MCP-støtte for Java/Kotlin, og [@hono/mcp](https://www.npmjs.com/package/@hono/mcp) lar deg enkelt legge til MCP i en Hono-applikasjon. Dette betyr at du kan gjenbruke eksisterende forretningslogikk og autentisering uten duplisering.

## Oppsummering

MCP er fundamentet som resten av den agentiske stacken hviler på. Ved å standardisere hvordan modeller kobler seg til omverdenen, flytter vi fokuset fra _integrasjon_ til _innovasjon_.

Hovedinnsiktene å ta med seg:

1. **Standardisering vinner:** Slutt å bygge proprietære verktøy-definisjoner. Sjekk om det finnes en MCP-server først.
2. **Lokal først:** MCP gjør det trygt og enkelt å koble sky-modeller til lokale data uten at dataene må lastes opp permanent.
3. **Økosystem:** Med tusenvis av servere allerede tilgjengelig, kan du plugge agenten din rett inn i PostgreSQL, Slack, eller GitHub i dag.

Vi har nå to fundamentale brikker på plass: forståelsen av agentiske arbeidsflyter fra forrige innlegg, og MCP som infrastrukturen som kobler agenter til verden. Med dette fundamentet kan vi i fremtidige innlegg utforske mer avanserte mønstre.

## Ressurser

- [Model Context Protocol Offisiell Dokumentasjon](https://modelcontextprotocol.io/)
- [Anthropic: MCP Announcement](https://www.anthropic.com/news/model-context-protocol)
- [GitHub: MCP Servers Repository](https://github.com/modelcontextprotocol/servers) - En samling av community-drevne servere.
- [Cursor Documentation: MCP](https://docs.cursor.com/context/model-context-protocol)
