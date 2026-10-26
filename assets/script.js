(function () {
  // light syntax colouring of terminal blocks: prompts, commands, output
  document.querySelectorAll('.code code').forEach(function (el) {
    var cont = false;
    el.innerHTML = el.textContent.split('\n').map(function (line) {
      var esc = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      var m = esc.match(/^(\s*(?:\S+@\S+:\S*)?[$#] ?)(.*)$/);
      var html;
      if (m) { html = '<span class="prompt">' + m[1] + '</span><span class="cmd">' + m[2] + '</span>'; cont = /\\\s*$/.test(line); }
      else if (cont) { html = '<span class="cmd">' + esc + '</span>'; cont = /\\\s*$/.test(line); }
      else html = '<span class="out">' + esc + '</span>';
      return html;
    }).join('\n');
  });

  // copy buttons: copy only the commands when the block has prompts, otherwise everything
  document.querySelectorAll('.code .copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var code = btn.closest('.code').querySelector('code');
      var cmds = Array.prototype.map.call(code.querySelectorAll('.cmd'), function (s) { return s.textContent; })
        .filter(function (t) { return t.trim(); });
      var text = cmds.length ? cmds.join('\n') : code.textContent;
      var done = function () { btn.textContent = 'คัดลอกแล้ว ✓'; setTimeout(function () { btn.textContent = 'คัดลอก'; }, 1500); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
    });
  });

  // theme toggle
  var root = document.documentElement;
  document.querySelector('.theme-btn').addEventListener('click', function () {
    var dark = root.dataset.theme ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });

  // mobile menu
  var menu = document.querySelector('.menu-btn');
  menu.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    menu.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.sidebar a').forEach(function (a) {
    a.addEventListener('click', function () { document.body.classList.remove('nav-open'); menu.setAttribute('aria-expanded', false); });
  });

  // reading progress + active section in TOC
  var bar = document.querySelector('.progress span');
  var links = {};
  document.querySelectorAll('.toc a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  var heads = Array.prototype.filter.call(document.querySelectorAll('article h2, article h3'), function (h) { return links[h.id]; });
  var current = null;
  function onScroll() {
    var h = document.documentElement;
    bar.style.width = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) * 100) + '%';
    var active = null;
    for (var i = 0; i < heads.length; i++) { if (heads[i].getBoundingClientRect().top < 120) active = heads[i]; else break; }
    if (active !== current) {
      if (current) links[current.id].classList.remove('active');
      if (active) {
        var a = links[active.id]; a.classList.add('active');
        var sb = document.querySelector('.sidebar'), r = a.getBoundingClientRect(), sr = sb.getBoundingClientRect();
        if (r.top < sr.top + 40 || r.bottom > sr.bottom - 40) sb.scrollTop += r.top - sr.top - sr.height / 3;
      }
      current = active;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // image lightbox
  var lb = document.querySelector('.lightbox'), lbImg = lb.querySelector('img'), lbCap = lb.querySelector('p');
  document.querySelectorAll('a.zoom').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      lbImg.src = a.getAttribute('href');
      var fc = a.closest('figure').querySelector('figcaption');
      lbCap.textContent = fc ? fc.textContent : '';
      lb.hidden = false;
    });
  });
  lb.addEventListener('click', function () { lb.hidden = true; lbImg.src = ''; });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.hidden = true; });
})();
