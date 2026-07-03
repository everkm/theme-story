---
title: Links
links:
  - category: Example Category (with thumbnails)
    has_thumbnail: true
    list:
      - name: Jack's Blog
        link: https://example.com
        description: I post new articles every day.
        avatar: /assets/images/avatar-0.jpg
        thumbnail: /assets/images/desc-image.jpg
  - category: Example Category (list)
    has_thumbnail: false
    list:
      - name: Partner Link 1
        link: https://example.com
        description: Example Site Information
        avatar: /assets/images/avatar-1.jpg
      - name: Partner Link 2
        link: https://example.com
        description: Example Site Description
        avatar: /assets/images/avatar-2.png
      - name: Partner Link 3
        link: https://example.com
        description: Example Site Description
        avatar: /assets/images/avatar-3.png
---

Friend link data is stored in the `_links.md` front matter and read by the virtual page `/links/`.
