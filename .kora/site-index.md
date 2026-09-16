# Site index · format 2
Structure and the names of what each page offers. Values that change often — prices, hours, phone,
address — and body copy are deliberately not recorded here; read the page itself for those.

## index.html → /
title: Shirdi Sai Mandir – Hindu Temple in Sterling, Virginia
purpose: Home page for Shirdi Sai Mandir in Sterling, Virginia
sections:
- `#hero` — hero banner: Shirdi Sai Mandir, Sterling, Virginia
also: The business name and location appear in the title, description, visible page content, and structured-data blocks.

## 404.html → /404
title: Shirdi Sai Mandir – Page Not Found
purpose: Display a 404 error message when a requested page is not found
sections:
- "This page has wandered off" — error message and return link

## support files
Files that are not pages. A line marked [content] holds words or data a visitor reads, so a
change to the site's content can land there; the rest only make the site work or look right.
- `llms.txt` — 52 bytes — too small to hold content
- `robots.txt` — 45 bytes — too small to hold content
- `sitemap.xml` — 160 bytes — too small to hold content

## shared (every page)
The header, navigation, mobile menu and footer are propagated from index.html to every other page by
`shell_propagation`. A change to any of them is made on index.html alone and copied automatically.
