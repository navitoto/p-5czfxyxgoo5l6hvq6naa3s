var CACHE = "orel-v53";
var ASSETS = ["./", "index.html", "manifest.webmanifest", "img/icon-180.png", "img/icon-192.png", "img/icon-512.png", "img/icon.png", "img/d1.webp", "img/d2.webp"];
for (var i = 1; i <= 11; i++) ASSETS.push("img/a" + i + ".webp");
for (var e = 1; e <= 5; e++) { if (e !== 3) ASSETS.push("clips/e" + e + ".mp3"); }
for (var j = 1; j <= 16; j++) ASSETS.push("clips/v" + j + ".mp3");
for (var t = 2; t <= 10; t++) ASSETS.push("clips/st" + t + ".mp3");
for (var g = 1; g <= 18; g++) { if (g !== 12) ASSETS.push("clips/go" + g + ".mp3"); }
self.addEventListener("install", function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener("activate", function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener("fetch", function (e) {
  var r = e.request; if (r.method !== "GET") return;
  var isPage = r.mode === "navigate";
  if (/sw\.js|robots\.txt/.test(r.url)) return;
  if (isPage) { e.respondWith(fetch(r, { cache: "no-store" }).then(function (res) { var cp = res.clone(); caches.open(CACHE).then(function (c) { c.put("index.html", cp); }); return res; }).catch(function () { return caches.match("index.html"); })); return; }
  e.respondWith(caches.match(r, { ignoreSearch: true }).then(function (hit) { return hit || fetch(r).then(function (res) { var cp = res.clone(); caches.open(CACHE).then(function (c) { c.put(r, cp); }); return res; }); }));
});
