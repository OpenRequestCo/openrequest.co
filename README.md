# openrequest.co

Marketing website for OpenRequest.

Static HTML + compiled Tailwind CSS (Zinc) + Geist via [Bunny Fonts](https://fonts.bunny.net) (privacy-focused; not Google Fonts).

## Local

Open `index.html` in a browser, or serve the repo root:

```bash
python3 -m http.server 4173
```

## Rebuild CSS

Tailwind is compiled ahead of time — there is no Tailwind CDN and no npm runtime dependency.

1. Download the [Tailwind standalone CLI](https://github.com/tailwindlabs/tailwindcss/releases) for your OS into `tools/tailwindcss` (gitignored).
2. Compile:

```bash
./tools/tailwindcss -i ./css/input.css -o ./styles.css --minify
```

Source tokens and components live in `css/input.css`. Commit the resulting `styles.css`.
