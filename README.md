# peopleinplace.ca

Simple website: **Ideas** (one list) + **Get in touch** form.

## Folder

`~/peopleinplace-website`

## Preview on your computer

```bash
cd ~/peopleinplace-website
python3 -m http.server 8080
```

Open http://localhost:8080

## Pages

| Path | What it is |
|------|------------|
| `/` | Home |
| `/ideas/` | All ideas, newest first |
| `/ideas/posts/` | Full essay pages |
| `/contact/` | Private contact form |

No subject folders — one stream.

## Add an essay later

1. Copy `ideas/posts/welcome.html` to a new file.
2. Edit title and text.
3. Add a card at the top of `ideas/index.html` (and optionally home).

Or just ask Grok to add a post.

## Make it live / email / form

See earlier chat notes — host the folder, point the domain, set up email and Formspree when ready.
