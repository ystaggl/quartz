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
- [x] WRTV
	* Daten ändern button needs to be updated (replace about:blank with form link) 
- [ ] WITA - Background images needed
- [ ] ROKI
	- [ ] Requires CSS: blockquote { font-size: initial; }
- [ ] AIAT
	- Waiting on image width
	- use 64px image and add note
	- [x] Fix the python bug
- [ ] VGTF 
	- Modified CI to match old newsletter:
		- h1 32px #585757
		- h2 24px #585757
		- h3  20px #585757
		- text 16px #585757
		- link 16px #585757
		- Hintergrund \#EDEBE4
		- CI Lime Green: \#94C11C
- [ ] CARE
- [ ] MPSA
	- Header is currently an image, should be replaced once the /spalten vertical align is fixed.

Save these for last:
- [ ] CONA
- [ ] GL2K
- [ ] RNDE

Major Bugs:
* [x]  This crash happens when a /Spalten is used with stretch vertical alignment:
```
114, in _compute_fs_body_html
    full_html = FsMailingMailing.add_missing_height_style(full_html)
  File "/opt/dadi-addons/fs_email_editor/models/mailing_mailing.py", line 476, in add_missing_height_style
    max_child_height = max([0 if 'height' not in custom_col['style'] else
  File "/opt/dadi-addons/fs_email_editor/models/mailing_mailing.py", line 477, in <listcomp>
    parse_styles(custom_col['style'])['height']
KeyError: 'height'
```
*  Should be fixed? Waiting for testing.
- [ ] Gaps between elements with dark footers
	- Fix: Every element needs to have background color applied, not just the topmost.
- [ ] Small font sizes have too large line height (caused by p default font size)
	- We are skipping this for now