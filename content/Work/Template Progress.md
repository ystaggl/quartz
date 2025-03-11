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
- [ ] WRTV
	- [x] "“Willst Du einfach und unkompliziert Deine Daten aktualisieren? Dann klicke bitte hier: Daten ändern." Do we have the possibility to do this, or do I have experience with other customers? If so, what kind of form do I need to create and what do I need to bear in mind?" use about:blank for now.
	- [ ] Acid Testing
- [ ] WITA - Background images needed
- [ ] ROKI
	- [ ] Requires CSS: blockquote { font-size: initial; }
- [ ] AIAT
	- Waiting on image width
	- Fix the python bug
- [ ] CARE
- [ ] VGTF (tool3?)
- [ ] MPSA
- [ ] TRAL

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
	- Should be fixed? Waiting for testing.
- [ ] Gaps between elements with dark footers
	- Fix: Every element needs to have background color applied, not just the topmost.
- [ ] Small font sizes have too large line height (caused by p default font size)
	- We are skipping this for now