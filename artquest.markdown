---
title: Art Quests
theme: jekyll-theme-slate
---

<div>
  {% for post in site.posts %}
    <div>
      <h2><a href="{{ post.url }}">{{ post.title }} - {{ post.date | date: "%d - %m - %Y" }}</a></h2>
    </div>
  {% endfor %}
</div>