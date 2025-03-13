---
title: Template Progress
draft: false
tags:
  - Newsletter
  - Work
---
- [x] BSVW
- [x] KINO
- [x] HEBE
- [x] ARNO
- [x] BIRD
- [x] TIQU
- [x] WDCS
- [x] PROJ
- [x] AIAT
- [x] WRTV
	- [ ] Daten ändern button needs to be updated (replace about:blank with form link) 
- [x] MPSA
- [x] ROKI
	- [x] Acid testing
	- [ ] Spende Button needs link set
	- [ ] CI Changes:
		- [ ] Primär (oder sekundar) button -> Rot CI
- [x] VGTF 
	- [ ] Modified CI to match old newsletter:
		- h1 32px # 585757
		- h2 24px # 585757
		- h3  20px # 585757
		- text 16px # 585757
		- link 16px # 585757
		- Hintergrund # EDEBE4
		- CI Lime Green: # 94C11C
	* bottom text should be centered on mobile only
- [x] CARE
	- [x] Acid testing
	- [ ] Bug found: When setting padding on image it can cause text to float on top of the image in yahoo/aol web client. For now I've worked around it by setting the padding on the column instead.
	- [ ] Changes from requested:
		- Logo Changed (80 years of care -> care)
		- old social icons replaced due to footer color change
		- footer links set to black instead of orange for visibility (footer color is the same as default link color)
		- Not all text could match the old font size as they weren't options in odoo. I've chosen the next closest in all situations, but in the footer Kontakt section this causes the KONTAKT text to be the same size as the details where previously it was slightly larger.
- [ ] WITA 
	- [ ] Background images needed
- [x] CONA
	- [ ] signature needs to be specially built
- [x] GL2K
- [ ] RNDE

Major Bugs:
- [x] python bug crash
- [ ] Gaps between elements with dark footers
	- Fix: Every element needs to have background color applied, not just the topmost.
- [x] /Spalten vertical alignment doesn't work
- [ ] Small font sizes have too large line height (caused by p default font size)
	- We are skipping this for now
- [ ] Padding on images causes them to distort:
	- Only applies to images with a modified resolution, easy workaround is to disable this functionality.