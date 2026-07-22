# Spotify re-auth runbook (temporary, delete after use)

Purpose: mint a new `SPOTIFY_REFRESH_TOKEN` for the homepage's "Recently Played" widget and store it on Vercel. The current token is revoked (`invalid_grant: Refresh token revoked`). The client ID/secret are still valid and are NOT rotated by this procedure.

Run this from the personal Mac (Spotify is blocked on the work machine's Chrome proxy). Prerequisites: this repo cloned, `vercel` CLI logged in (`vercel login`), and a browser logged into Spotify. No secrets appear in this file; everything sensitive is pulled from Vercel at runtime.

## 1. Link and pull credentials

```bash
cd ~/dev/personal/homepage
vercel link --yes --scope magnusrodseths-projects --project homepage
vercel env pull .env.local --environment=development --yes   # brings SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET (gitignored file)
```

## 2. Authorize in the browser

Open this URL in the browser (client ID is public information):

```
https://accounts.spotify.com/authorize?client_id=a9d58aefefd640e0ba1a61ffdc4ef9d0&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=user-read-recently-played%20user-read-currently-playing
```

Approve the consent screen. The browser redirects to `http://localhost:3000/?code=LONG_CODE`. A "connection refused" page is fine; copy the `code` value from the URL bar. The code is single-use and expires in about 10 minutes, so continue immediately.

If Spotify instead shows `INVALID_CLIENT: Invalid redirect URI`, the app has a different registered URI. Check it at <https://developer.spotify.com/dashboard/a9d58aefefd640e0ba1a61ffdc4ef9d0/settings> and use that exact URI in both this step and step 3.

## 3. Exchange the code for a refresh token

```bash
set -a; source .env.local; set +a
CODE="paste-the-code-here"
curl -s -u "$SPOTIFY_CLIENT_ID:$SPOTIFY_CLIENT_SECRET" \
  -d "grant_type=authorization_code&code=$CODE&redirect_uri=http://localhost:3000" \
  https://accounts.spotify.com/api/token > /tmp/spotify_token.json
python3 -c "import json; d=json.load(open('/tmp/spotify_token.json')); print('keys:', sorted(d))"
# Expect: keys: ['access_token', 'expires_in', 'refresh_token', 'scope', 'token_type']
# If you see 'error' instead, the code expired or the redirect_uri mismatched; redo step 2.
```

## 4. Store the new token on Vercel (without printing it)

```bash
extract() { python3 -c "import json; print(json.load(open('/tmp/spotify_token.json'))['refresh_token'], end='')"; }
extract | vercel env add SPOTIFY_REFRESH_TOKEN production --sensitive --force
extract | vercel env add SPOTIFY_REFRESH_TOKEN preview --sensitive --force
extract | vercel env add SPOTIFY_REFRESH_TOKEN development --force   # Vercel disallows --sensitive in development
rm /tmp/spotify_token.json
```

## 5. Verify and redeploy

```bash
vercel env pull .env.local --environment=development --yes
set -a; source .env.local; set +a
curl -s -o /dev/null -w "token refresh: HTTP %{http_code}\n" -u "$SPOTIFY_CLIENT_ID:$SPOTIFY_CLIENT_SECRET" \
  -d "grant_type=refresh_token&refresh_token=$SPOTIFY_REFRESH_TOKEN" https://accounts.spotify.com/api/token
# Expect: token refresh: HTTP 200

git commit --allow-empty -m "chore: redeploy for new Spotify refresh token" && git push
```

After the deploy, <https://www.magnusrodseth.com> should list recent tracks within a minute or two.

## 6. Delete this runbook

```bash
git rm SPOTIFY_REAUTH.md && git commit -m "chore: remove temporary Spotify re-auth runbook" && git push
```
