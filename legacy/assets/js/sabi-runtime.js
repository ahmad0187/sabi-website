/*!
 * Sabi micro-runtime
 * A tiny template engine that powers the Sabi website pages.
 * Supports: {{hole}} lookups, <sc-for>, <sc-if>, <dc-import> child components,
 * onClick / onChange / onKeyDown handlers, component state (setState) and
 * scroll-reveal animations. No build step or framework required.
 */
(function () {
  'use strict';

  var Sabi = {
    components: {},
    templates: {},
    _instances: {},
    _handlers: [],
    _counts: {},
    _root: null,
    _tpl: null,
    _page: null,
    _pending: false
  };

  function DCLogic(props) {
    this.props = props || {};
    this.state = {};
  }
  DCLogic.prototype.setState = function (patch, cb) {
    var p = typeof patch === 'function' ? patch(this.state, this.props) : patch;
    this.state = Object.assign({}, this.state, p);
    Sabi._schedule();
    if (cb) setTimeout(cb, 0);
  };
  DCLogic.prototype.forceUpdate = function () { Sabi._schedule(); };
  window.DCLogic = DCLogic;

  /* ---------- helpers ---------- */
  var HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
  var WHOLE = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/;
  var EVENTS = { onclick: 'click', onchange: 'change', onkeydown: 'keydown', oninput: 'change' };
  var BOOL = { checked: 1, disabled: 1, selected: 1, readonly: 1, required: 1, hidden: 1 };
  var HTML_NS = 'http://www.w3.org/1999/xhtml';

  function lookup(path, scope) {
    path = path.trim();
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (path === 'null') return null;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    if (/^'.*'$/.test(path) || /^".*"$/.test(path)) return path.slice(1, -1);
    var cur = scope;
    var parts = path.split('.');
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function interp(str, scope) {
    return str.replace(HOLE, function (m, p) {
      var v = lookup(p, scope);
      return v == null ? '' : String(v);
    });
  }

  /* ---------- rendering ---------- */
  function renderChildren(node, scope, out) {
    var kids = node.childNodes;
    for (var i = 0; i < kids.length; i++) renderNode(kids[i], scope, out);
  }

  function renderNode(node, scope, out) {
    if (node.nodeType === 3) {
      out.push(document.createTextNode(interp(node.data, scope)));
      return;
    }
    if (node.nodeType !== 1) return;
    var tag = node.localName;

    if (tag === 'sc-for') {
      var lm = (node.getAttribute('list') || '').match(WHOLE);
      var list = lm ? lookup(lm[1], scope) : null;
      var as = node.getAttribute('as') || 'item';
      (list || []).forEach(function (item, i) {
        var s = Object.create(scope);
        s[as] = item;
        s.$index = i;
        renderChildren(node, s, out);
      });
      return;
    }
    if (tag === 'sc-if') {
      var vm = (node.getAttribute('value') || '').match(WHOLE);
      if (vm ? lookup(vm[1], scope) : node.getAttribute('value')) renderChildren(node, scope, out);
      return;
    }
    if (tag === 'dc-import') { renderImport(node, scope, out); return; }
    if (tag === 'helmet') return;

    var el = node.namespaceURI === HTML_NS
      ? document.createElement(tag)
      : document.createElementNS(node.namespaceURI, node.localName);

    var attrs = node.attributes;
    for (var a = 0; a < attrs.length; a++) {
      var name = attrs[a].name;
      var raw = attrs[a].value;
      if (name.indexOf('hint-') === 0) continue;
      var m = raw.match(WHOLE);
      var lname = name.toLowerCase();
      if (EVENTS[lname]) {
        var fn = m ? lookup(m[1], scope) : null;
        if (typeof fn === 'function') {
          var id = Sabi._handlers.push(fn) - 1;
          el.setAttribute('data-ev-' + EVENTS[lname], String(id));
        }
        continue;
      }
      if (BOOL[lname]) {
        var bv = m ? lookup(m[1], scope) : true;
        if (bv && bv !== 'false') el.setAttribute(name, '');
        continue;
      }
      var val = m ? lookup(m[1], scope) : interp(raw, scope);
      if (val == null || val === false) continue;
      el.setAttribute(name, String(val));
    }

    var kids = [];
    renderChildren(node, scope, kids);
    for (var k = 0; k < kids.length; k++) el.appendChild(kids[k]);
    out.push(el);
  }

  function renderImport(node, scope, out) {
    var name = node.getAttribute('name');
    var Cls = Sabi.components[name];
    var tpl = Sabi.templates[name];
    if (!Cls || !tpl) return;
    var props = {};
    var attrs = node.attributes;
    for (var a = 0; a < attrs.length; a++) {
      var an = attrs[a].name;
      if (an === 'name' || an.indexOf('hint-') === 0) continue;
      var m = attrs[a].value.match(WHOLE);
      var key = an.replace(/-([a-z])/g, function (x, c) { return c.toUpperCase(); });
      props[key] = m ? lookup(m[1], scope) : interp(attrs[a].value, scope);
    }
    var n = Sabi._counts[name] = (Sabi._counts[name] || 0) + 1;
    var ikey = name + '#' + n;
    var inst = Sabi._instances[ikey];
    if (!inst) {
      inst = new Cls(props);
      inst.__new = true;
      Sabi._instances[ikey] = inst;
    } else {
      inst.props = props;
    }
    var vals = inst.renderVals ? inst.renderVals() : {};
    renderChildren(tpl.content, vals, out);
  }

  /* ---------- DOM patching (keeps animations & focus stable) ---------- */
  function morphChildren(parent, newKids) {
    var old = Array.prototype.slice.call(parent.childNodes);
    var len = Math.max(old.length, newKids.length);
    for (var i = 0; i < len; i++) {
      var a = old[i], b = newKids[i];
      if (!a) parent.appendChild(b);
      else if (!b) parent.removeChild(a);
      else patch(a, b);
    }
  }

  function patch(a, b) {
    if (a.nodeType !== b.nodeType ||
        (a.nodeType === 1 && (a.namespaceURI !== b.namespaceURI || a.localName !== b.localName))) {
      a.parentNode.replaceChild(b, a);
      return;
    }
    if (a.nodeType === 3) {
      if (a.data !== b.data) a.data = b.data;
      return;
    }
    if (a.nodeType !== 1) return;
    var revealed = a.classList && a.classList.contains('s-in');
    var aAttrs = Array.prototype.slice.call(a.attributes);
    for (var i = 0; i < aAttrs.length; i++) {
      if (!b.hasAttribute(aAttrs[i].name)) a.removeAttribute(aAttrs[i].name);
    }
    var bAttrs = b.attributes;
    for (var j = 0; j < bAttrs.length; j++) {
      if (a.getAttribute(bAttrs[j].name) !== bAttrs[j].value) a.setAttribute(bAttrs[j].name, bAttrs[j].value);
    }
    if (revealed) a.classList.add('s-in');
    if (a.localName === 'input' || a.localName === 'textarea') {
      if (b.hasAttribute('value') && a.value !== b.getAttribute('value')) a.value = b.getAttribute('value');
      if (a.type === 'radio' || a.type === 'checkbox') a.checked = b.hasAttribute('checked');
    }
    morphChildren(a, Array.prototype.slice.call(b.childNodes));
  }

  /* ---------- events ---------- */
  function setupEvents(root) {
    function call(type, e) {
      var t = e.target;
      var el = t && t.closest ? t.closest('[data-ev-' + type + ']') : null;
      if (!el || !root.contains(el)) return;
      var fn = Sabi._handlers[+el.getAttribute('data-ev-' + type)];
      if (fn) fn(e);
    }
    root.addEventListener('click', function (e) { call('click', e); });
    root.addEventListener('keydown', function (e) { call('keydown', e); });
    root.addEventListener('input', function (e) {
      var t = e.target;
      if (t.type !== 'radio' && t.type !== 'checkbox') call('change', e);
    });
    root.addEventListener('change', function (e) {
      var t = e.target;
      if (t.type === 'radio' || t.type === 'checkbox') call('change', e);
    });
  }

  /* ---------- scroll reveal ---------- */
  var io = null;
  var seen = typeof WeakSet !== 'undefined' ? new WeakSet() : null;
  function setupReveal() {
    if (!('IntersectionObserver' in window) || !seen) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('s-reveal-on');
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('s-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
  }
  function observeReveal() {
    if (!io) return;
    var els = Sabi._root.querySelectorAll('[data-reveal]');
    for (var i = 0; i < els.length; i++) {
      if (!seen.has(els[i])) { seen.add(els[i]); io.observe(els[i]); }
    }
  }

  /* ---------- lifecycle ---------- */
  function render() {
    Sabi._pending = false;
    Sabi._handlers = [];
    Sabi._counts = {};
    var vals = Sabi._page.renderVals ? Sabi._page.renderVals() : {};
    var out = [];
    renderChildren(Sabi._tpl.content, vals, out);
    morphChildren(Sabi._root, out);
    Object.keys(Sabi._instances).forEach(function (k) {
      var inst = Sabi._instances[k];
      if (inst.__new) {
        inst.__new = false;
        if (inst.componentDidMount) inst.componentDidMount();
      }
    });
    observeReveal();
  }

  Sabi._schedule = function () {
    if (Sabi._pending || !Sabi._page) return;
    Sabi._pending = true;
    Promise.resolve().then(render);
  };

  Sabi.registerTemplate = function (name, html) {
    var t = document.createElement('template');
    t.innerHTML = html;
    Sabi.templates[name] = t;
  };
  Sabi.register = function (name, Cls) { Sabi.components[name] = Cls; };

  Sabi.mount = function (rootEl, tplEl, Cls) {
    Sabi._root = rootEl;
    Sabi._tpl = tplEl;
    Sabi._page = new Cls({});
    setupEvents(rootEl);
    setupReveal();
    render();
    if (Sabi._page.componentDidMount) Sabi._page.componentDidMount();
  };

  window.Sabi = Sabi;
})();
