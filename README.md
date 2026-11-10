# The Art of Anchoring — a Diwali gift

Static site (HTML + CSS + vanilla JS). No build step, no external requests.

## Structure
```
index.html   page content & structure
style.css    all styling (palette tokens at the top)
script.js    CONFIG (edit here) + intro, reveals, motes, lightbox, diyas
assets/
  hero.jpg  photo-1..4.jpg  og.jpg
  fonts/    self-hosted Lora + Inter (Latin subset)
```

## Personalise (edit `CONFIG` at the top of script.js)
- `herName`  → replaces the dashed "[Her Name]" in the hero
- `bio`      → optional text under the appreciation section
- `socials`  → optional links shown above the end of the page
- Event info → edit the captions in index.html (`data-caption` + `.tile__cap` text of each gallery tile)
- Link preview → in index.html set `og:image` to the full URL of assets/og.jpg after deploying

## Deploy on GitHub Pages
Push these files to a repo → Settings → Pages → Deploy from branch `main`, folder `/ (root)`.
