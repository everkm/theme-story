MYDIR := $(dir $(lastword $(MAKEFILE_LIST)))
# PYTHON ?= $(MYDIR).venv/bin/python
PYTHON ?= python3


story-latest:
	$(PYTHON) $(MYDIR)set_latest_release.py --repo everkm/theme-story \
		--website https://story.theme.everkm.com/ \
		--changelog-en $(MYDIR)../en/CHANGELOG.md \
		--changelog-zh $(MYDIR)../zh/CHANGELOG.md
